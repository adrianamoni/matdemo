import React from "react";
import { Grid, Paper } from "@mui/material";
import { dataTableMat } from "../../widgets/TableWidget/fakedata";
import TableWidget from "../../widgets/TableWidget/TableWidget";
import Text from "./../../languages/Text";

const Materials = () => {
  const columns = [
    {
      field: "item_desc",
      headerName: `${Text({ tid: "material" })}`,
      flex: 1,
    },
    {
      field: "bom_pos",
      headerName: `${Text({ tid: "alternative" })}`,
      width: 70,
    },
    {
      field: "BackFlush",
      headerName: `${Text({ tid: "entityBatch" })}`,
      width: 70,
    },
    {
      field: "UnidadMedida",
      headerName: `${Text({ tid: "unitMeasurement" })}`,
      flex: 1,
    },
    {
      field: "CantidadAprov",
      headerName: `${Text({ tid: "provisioning" })}`,
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "CantidadTotal",
      headerName: `${Text({ tid: "total" })}`,
      type: "number",
      flex: 1,
    },
  ];
  return (
    <Grid container>
      <Paper sx={{ width: "100%", marginTop: "1rem" }}>
        <TableWidget data={dataTableMat} columns={columns} />
      </Paper>
    </Grid>
  );
};

export default Materials;
