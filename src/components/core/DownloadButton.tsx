import { saveAs } from "file-saver";
import { utils, write } from "xlsx";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";

import type { ExcelData } from "../../types";

export const DownloadButton = ({
  data,
  fileName,
}: {
  data: ExcelData[];
  fileName: string;
}) => {
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        justifyContent: "end",
        backgroundColor: "#3f51b5",
        paddding: "8px",
      }}
    >
      <IconButton
        onClick={exportToExcel}
        size="small"
        sx={{ "&:focus": { outline: "none" }, color: "white" }}
      >
        <DownloadIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
};
