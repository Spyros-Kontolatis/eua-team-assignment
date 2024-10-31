import { useListHeroesQuery } from "../store/slices/apiSlice";
import CircularProgress from "@mui/joy/CircularProgress";
import { DataTable } from "../components/core/DataTable";
import { HeroModal } from "./HeroModal";
import React, { useEffect, useState } from "react";
import { DataPieChart } from "./core/DataPieChart";
import { DownloadButton } from "./core/DownloadButton";
import { Box } from "@mui/material";

import type { Hero, Setting, Order, DataElement, ExcelData } from "../types";

export const MainDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [search, setSearch] = useState("");
  const [tvShows, setTVShows] = useState<string[]>([]);
  const [dataRows, setDataRows] = useState<Hero[]>([]);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [settings, setSettings] = useState<Setting<Hero>[]>([
    { column: "Name", key: "name", render: (row) => row.name, order: "asc" },
    {
      column: "TV Shows #",
      key: "tvShows",
      render: (row) => row.tvShows.length,
    },
    {
      column: "Video Game #",
      key: "videoGames",
      render: (row) => row.videoGames.length,
    },
    { column: "Allies", key: "allies", render: (row) => row.allies.join(", ") },
    {
      column: "Enemies",
      key: "enemies",
      render: (row) => row.enemies.join(", "),
    },
  ]);
  const [pieChartData, setPieChartData] = useState<DataElement[]>([]);
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const {
    data: { data: heroes, info } = {
      data: [],
      info: {
        count: 0,
        nextPage: null,
        previousPage: null,
        totalPages: 0,
      },
    },
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useListHeroesQuery({ page: page + 1, rowsPerPage, name: search });

  useEffect(() => {
    setTVShows(
      heroes
        .flatMap(({ tvShows }) => tvShows)
        .reduce((acc: string[], current) => {
          if (!acc.includes(current)) acc.push(current);
          return acc;
        }, [])
    );
    setDataRows(heroes);
  }, [JSON.stringify(heroes)]);

  useEffect(() => {
    const totalFilms = dataRows.flatMap(({ films }) => films).length;
    setPieChartData(
      dataRows.map(({ films, name }) => ({
        name,
        y: films.length,
        custom: {
          films,
        },
      }))
    );
    setExcelData(
      dataRows.map(({ films, name }) => ({
        Name: name,
        "Number of films": films.length,
        Films: films.join(", "),
        Percentage:
          (films.length ? ((films.length / totalFilms) * 100).toFixed(2) : 0) +
          "%",
      }))
    );
  }, [JSON.stringify(dataRows)]);

  let content: React.ReactNode;

  const sortStrings = <T extends object>(a: T, b: T, key: keyof T) => {
    if (a[key] > b[key]) return 1;
    else if (a[key] < b[key]) return -1;
    else return 0;
  };

  const sortBy = (order: Order, key: keyof Hero) => {
    setDataRows(
      [...dataRows].sort((a, b) =>
        order === "asc" ? sortStrings(a, b, key) : -sortStrings(a, b, key)
      )
    );
    setSettings(
      settings.map((setting) =>
        setting.key === key
          ? {
              ...setting,
              order: order === "asc" ? "desc" : "asc",
            }
          : setting
      )
    );
  };

  if (isLoading || isFetching) {
    content = <CircularProgress variant="outlined" />;
  } else if (isSuccess)
    content = (
      <Box>
        <DownloadButton data={excelData} fileName="Films Statistics" />
        <DataPieChart data={pieChartData} title="Film chart" />
        <DataTable
          settings={settings}
          rows={dataRows}
          info={info}
          page={page}
          rowsPerPage={rowsPerPage}
          multipleSelectOptions={tvShows}
          search={search}
          onSearch={(searchVal) => {
            setPage(0);
            setSearch(searchVal);
          }}
          onSortBy={sortBy}
          onMultipleSelectChange={(selectedTVShows) => {
            setDataRows(
              selectedTVShows.length
                ? heroes.filter(({ tvShows }) =>
                    selectedTVShows.some((selectedTVShow) =>
                      tvShows.includes(selectedTVShow)
                    )
                  )
                : heroes
            );
            setSettings(
              settings.map((setting) =>
                !!setting.order
                  ? {
                      ...setting,
                      order: "asc",
                    }
                  : setting
              )
            );
          }}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onRowClick={(row: Hero) => setSelectedHero(row)}
        />
        <HeroModal
          open={!!selectedHero}
          handleClose={() => setSelectedHero(null)}
          hero={selectedHero}
        />
      </Box>
    );
  else if (isError) content = <div>{error.toString()}</div>;
  return <>{content}</>;
};
