import React, { useState } from "react";
import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TableWidget from "../../widgets/TableWidget/TableWidget";
import Text from "./../../languages/Text";
import { fakeParos, seccionFake } from "../../widgets/TableWidget/fakedata";
import ButtonGroupWidget from "../../widgets/buttonGroup/ButtonGroupWidget";
import ModalWidget from "./../../widgets/modalWidget/ModalWidget";
import SelectWidget from "../../widgets/forms/SelectWidget";

const Paros = () => {
  const [modalCreateInterruption, setmodalCreateInterruption] = useState(false);
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
    setmodalCreateInterruption(true);
  };
  const modalContent = (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <SelectWidget
            formId={"Test"}
            id={"izquierda"}
            label={"Select Izquierda"}
            options={seccionFake}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <SelectWidget
            formId={"Test"}
            id={"derecha"}
            label={"Select Derecha"}
            options={seccionFake}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <div>1</div>
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
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
      <ModalWidget
        open={modalCreateInterruption}
        close={() => setmodalCreateInterruption(false)}
        content={modalContent}
      />
    </>
  );
};

export default Paros;
