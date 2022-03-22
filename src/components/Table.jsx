import React from "react";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import TableWidget from "../widgets/TableWidget/TableWidget";
import { dataTable } from "../widgets/TableWidget/fakedata";
import Text from "./../languages/Text";
import { DataGrid } from "@mui/x-data-grid";

function renderRating(params) {
  console.log("params", params);
  return (
    <>
      {/*   <Grid container wrap="nowrap" spacing={2}> */}

      <Grid item xs zeroMinWidth>
        <Typography
          sx={{ height: 70 }}
          /*  style={{
            wrap: "nowrap",

            maxWidth: "200px",
          }} */
        >
          {params.value}
        </Typography>
      </Grid>
      {/* </Grid> */}
    </>
  );
}

const Table = () => {
  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    {
      id: 2,
      col1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur quia perferendis quasi, consequuntur eligendi, tempora laboriosam cupiditate magnam in id eum totam laudantium voluptate? Culpa impedit ex harum eius dignissimos?",
      col2: "is Awesome",
    },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns = [
    {
      field: "col1",
      headerName: "Column 1",
      flex: 1,
      renderCell: renderRating,
    },
    { field: "col2", headerName: "Column 2", flex: 1 },
  ];

  return (
    <>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
};

export default Table;
