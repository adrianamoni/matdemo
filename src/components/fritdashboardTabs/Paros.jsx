import React from "react";
import { Grid, Paper, ButtonGroup, Button } from "@mui/material";
import TableWidget from "../../widgets/TableWidget/TableWidget";
import Text from "./../../languages/Text";
import { fakeParos } from "../../widgets/TableWidget/fakedata";
import ButtonGroupWidget from "../../widgets/buttonGroup/ButtonGroupWidget";

const Paros = () => {
  const columns = [
    {
      field: "name",
      headerName: `${Text({ tid: "interruption" })}`,
      flex: 1,
    },
    {
      field: "duracion",
      headerName: `${Text({ tid: "duration" })}`,
      flex: 1,
    },
    {
      field: "fechaInicio",
      headerName: `${Text({ tid: "startDate" })}`,
      flex: 1,
    },
    {
      field: "fechaFin",
      headerName: `${Text({ tid: "endDate" })}`,
      flex: 1,
    },
    {
      field: "comentario",
      headerName: `${Text({ tid: "comment" })}`,
      flex: 1,
    },
  ];

  const handleTestClick = () => {
    console.log("clicked");
  };

  return (
    <Grid container>
      <Paper sx={{ width: "100%", marginTop: "1rem" }}>
        <TableWidget data={fakeParos} columns={columns} />
      </Paper>
      <ButtonGroupWidget
        buttons={[
          {
            text: "createInterruption",
            color: "primary",
            onClick: handleTestClick,
          },
          { text: "justifyInterruption", color: "success", disabled: true },
        ]}
      />
    </Grid>
  );
};

export default Paros;
