import * as React from "react";
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
import { TableHead } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import type { TablePaginationActionsProps, DataTableProps } from "../../types";

const TablePaginationActions = ({
  page,
  onPageChange,
  info,
}: TablePaginationActionsProps) => {
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
      <IconButton
        onClick={handleBackButtonClick}
        aria-label="previous page"
        disabled={!info.previousPage}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        aria-label="next page"
        disabled={!info.nextPage}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};

export const DataTable = <T extends object>({
  settings,
  rows,
  info,
  page,
  rowsPerPage,
  search,
  multipleSelectOptions,
  onPageChange,
  onRowsPerPageChange,
  onSearch,
  onMultipleSelectChange,
  onSortBy,
  onRowClick,
}: DataTableProps<T>) => {
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
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

  return (
    <TableContainer
      component={Paper}
      sx={{ width: { xs: 280, sm: 500, md: "100%" } }}
    >
      <FormControl variant="outlined" sx={{ m: 1 }}>
        <InputLabel htmlFor="search-input">Search</InputLabel>
        <OutlinedInput
          id="search-input"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="search" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search"
          onBlur={(e) => onSearch?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              onSearch?.((e.target as HTMLInputElement).value);
          }}
          defaultValue={search}
        />
      </FormControl>
      {multipleSelectOptions && (
        <Stack spacing={3} width="200px" justifySelf="center">
          <Autocomplete
            multiple
            id="tags-standard"
            options={multipleSelectOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="TV Shows"
                placeholder="TV Show"
              />
            )}
            onChange={(_e, value) => onMultipleSelectChange?.(value)}
          />
        </Stack>
      )}
      <Table sx={{ marginTop: "8px" }}>
        <TableHead>
          <TableRow>
            {settings.map(({ column, order, key }) => (
              <TableCell key={column}>
                {order !== undefined ? (
                  <TableSortLabel
                    onClick={() => onSortBy?.(order, key)}
                    direction={order}
                  >
                    {column}
                  </TableSortLabel>
                ) : (
                  <>{column}</>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              onClick={() => onRowClick?.(row)}
              sx={{ cursor: "pointer" }}
            >
              {settings.map(({ render }, idx) => (
                <TableCell
                  style={{ maxWidth: 200 }}
                  key={idx}
                  component="th"
                  scope="row"
                >
                  {render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
              colSpan={5}
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
              }}
              labelDisplayedRows={({ from, count }) => {
                return `${from} - ${from + count - 1}`;
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={(props) => (
                <TablePaginationActions {...props} info={info} />
              )}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
