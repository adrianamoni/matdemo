import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  LinearProgress,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect, useContext } from "react";
import { ApiCall } from "../../../services/Service";
import { write_tags } from "../../../services/serviceHelper";
import TableWidget from "../../../widgets/TableWidget/TableWidget";
import { createNotification } from "../../alerts/NotificationAlert";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { grey } from "@mui/material/colors";
import { checkIfModified } from "./helper";

const Simulation = () => {
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [apiData, setApiData] = useState();
  const [originalData, setOriginalData] = useState();
  const [refreshMain, setRefreshMain] = useState(false);
  const [enableSave, setEnableSave] = useState(false);

  useEffect(() => {
    fetchData();
    if (refreshMain) {
      setRefreshMain(false);
    }
  }, [refreshMain]);

  useEffect(() => {
    if (apiData) {
      const temp = checkIfModified(apiData, originalData);
      console.log("temp", temp);
      setEnableSave(temp);
    }
  }, [apiData]);

  const fetchData = async () => {
    const data = [
      {
        ReasonGrpDesc: "Producción",
        ReasonDesc: "Producción",
        id: 1,
        tag: false,
      },
      {
        ReasonGrpDesc: "Producción",
        ReasonDesc: "Producción",
        id: 2,
        tag: true,
      },

      {
        ReasonGrpDesc: "Averia",
        ReasonDesc: "Atasco de salida",
        id: 3,
        tag: true,
      },
      {
        ReasonGrpDesc: "Paros Pendientes de Justificar",
        ReasonDesc: "Paro pendiente de justificar",
        id: 4,
        tag: false,
      },
      {
        ReasonGrpDesc: "Averia",
        ReasonDesc: "Averia pesadora",
        id: 5,
        tag: false,
      },
    ];

    const original = JSON.parse(JSON.stringify(data));
    setApiData(data);
    setOriginalData(original);
  };

  const handleCheck = (checked, id) => {
    const newData = [...apiData];
    const findEl = newData.findIndex((el) => el.id === id);

    newData[findEl].tag = checked ? true : false;

    setApiData(newData);
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    const tagName = "example";
    const tags_arr = [
      {
        TagName: tagName,
        Value: 0,
      },
    ];

    /* const response = await ApiCall({
      params: write_tags({ tags_arr }),
    });

    if (response.responseError) {
      setLoadingSubmit(false);
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
    } else {
      if (response.responseCode === "0") {
        setLoadingSubmit(false);
        createNotification({
          status: "success",
          msg: "¡Datos guardados correctamente!",
          hide: 1,
        });
      }
    } */
  };

  return loadingInitialData ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" />
    </Box>
  ) : (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          {apiData && apiData.length > 0 && (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ backgroundColor: "background.grey4" }}>
                  <TableHead sx={{ backgroundColor: "background.grey3" }}>
                    <TableRow>
                      <TableCell>Paro</TableCell>
                      <TableCell>Motivo</TableCell>
                      <TableCell align="center">Tag</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apiData.map((item) => (
                      <TableRow>
                        <TableCell>{item.ReasonGrpDesc}</TableCell>
                        <TableCell>{item.ReasonDesc}</TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Switch
                                checked={item.tag}
                                onChange={(e) =>
                                  handleCheck(e.target.checked, item.id)
                                }
                                color="secondary"
                              />
                            }
                            label="Label"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Grid>
        <Grid item xs={12} textAlign="center">
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            loading={loadingSubmit}
            disabled={!enableSave}
          >
            Enviar
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};

export default Simulation;
