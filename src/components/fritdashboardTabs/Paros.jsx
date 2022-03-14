import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
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
import InputWidget from "../../widgets/forms/InputWidget";

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
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <InputWidget
          formId={"Test"}
          id={"Inputtest"}
          label={"Escribe tu nombre"}
          otherOptions={"required"}
        />
      </Grid>
    </>
  );

  return (
    <>
      <Grid container>
        <Paper sx={{ width: "100%", marginTop: "1rem" }}>
          <TableWidget data={fakeParos} columns={columns} />
        </Paper>
        <Grid item xs={12} sx={{ display: "flex" }} justifyContent="center">
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
      </Grid>
      <ModalWidget
        open={modalCreateInterruption}
        close={() => setmodalCreateInterruption(false)}
        content={modalContent}
        title={"Generar Paro"}
      />
    </>
  );
};

export default Paros;
