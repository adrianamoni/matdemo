import React from "react";
/* import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid"; */
import { Typography } from "@mui/material";

/* const rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
]; */
const Table = () => {
  return (
    <>
      <Typography>Table</Typography>
      {/*  <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
      /> */}
    </>
  );
};

export default Table;
