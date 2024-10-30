import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Hero, HeroResponse } from "../../store/slices/heroSlice";
import { TableHead } from "@mui/material";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const TablePaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) => {
  const theme = useTheme();

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleBackButtonClick} aria-label="previous page">
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} aria-label="next page">
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </Box>
  );
};

export const DataTable = ({
  rows,
  info,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: {
  rows: Hero[];
  info: HeroResponse["info"];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newPage: number) => void;
}) => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };
  const customCellStyle = {
    color: "#ebebeb",
  };
  return (
    <TableContainer
      component={Paper}
      style={{ backgroundColor: "#800020", width: "100%", minWidth: "900px" }}
    >
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell
              component="th"
              style={{ ...customCellStyle, fontWeight: "600" }}
            >
              Name
            </TableCell>
            <TableCell
              component="th"
              style={{ ...customCellStyle, fontWeight: "600" }}
            >
              TV Shows #
            </TableCell>
            <TableCell
              component="th"
              style={{ ...customCellStyle, fontWeight: "600" }}
            >
              Video Game #
            </TableCell>
            <TableCell
              component="th"
              style={{ ...customCellStyle, fontWeight: "600" }}
            >
              Allies
            </TableCell>
            <TableCell
              component="th"
              style={{ ...customCellStyle, fontWeight: "600" }}
            >
              Enemies
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" style={customCellStyle}>
                {row.name}
              </TableCell>
              <TableCell style={customCellStyle} align="center">
                {row.films.length}
              </TableCell>
              <TableCell style={customCellStyle} align="center">
                {row.videoGames.length}
              </TableCell>
              <TableCell style={customCellStyle} align="center">
                {row.allies}
              </TableCell>
              <TableCell style={customCellStyle} align="center">
                {row.enemies}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                10,
                20,
                50,
                100,
                200,
                500,
                { label: "All", value: -1 },
              ]}
              colSpan={3}
              count={info.count}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
                actions: {
                  nextButton: {
                    disabled: !info?.nextPage,
                  },
                  previousButton: {
                    disabled: !info?.previousPage,
                  },
                },
              }}
              labelDisplayedRows={({ from, count }) => {
                return `${from} - ${from + count - 1}`;
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              sx={{
                "& .MuiTablePagination-spacer": {
                  color: "white",
                },
                "& .MuiTablePagination-selectLabel": {
                  color: "white",
                },
                "& .MuiTablePagination-select": {
                  color: "white",
                },
                "& .MuiTablePagination-displayedRows": {
                  color: "white",
                },
                "& .MuiTablePagination-actions": {
                  color: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
