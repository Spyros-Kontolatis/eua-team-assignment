import { useListHeroesQuery } from "../store/slices/apiSlice";
import CircularProgress from "@mui/joy/CircularProgress";
import { DataTable } from "../components/core/DataTable";
import React, { useState } from "react";

export const MainDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
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
  } = useListHeroesQuery({ page: page + 1, rowsPerPage });
  let content: React.ReactNode;

  if (isLoading || isFetching) {
    content = <CircularProgress variant="outlined" />;
  } else if (isSuccess)
    content = (
      <DataTable
        rows={heroes}
        info={info}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    );
  else if (isError) content = <div>{error.toString()}</div>;
  return <>{content}</>;
};
