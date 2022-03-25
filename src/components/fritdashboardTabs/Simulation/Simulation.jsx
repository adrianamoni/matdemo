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
import React, { useState, useEffect, useContext } from "react";
import { ApiCall, MemoryDatabaseCall } from "../../../services/Service";
import { write_tags } from "../../../services/serviceHelper";
import { createNotification } from "../../alerts/NotificationAlert";

import { globalDataContext } from "../../../context/ContextProvider";
import { get_simulation_interruptions } from "../../../services/OFservices";
import Text from "../../../languages/Text";

const Simulation = () => {
  const { globalData } = useContext(globalDataContext);
  const { lineData } = globalData;
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [loadingSimulation, setLoadingSimulation] = useState(false);
  const [apiData, setApiData] = useState();
  const [refreshMain, setRefreshMain] = useState(false);
  const [simulation, setSimulation] = useState(false);

  useEffect(() => {
    let clearKey;
    fetchData(true);
    if (simulation) {
      clearKey = setInterval(fetchData, 5000); //Si es inferior: se sobreescribe
    } else {
      clearInterval(clearKey);
    }
    if (refreshMain) {
      setRefreshMain(false);
    }
    return () => {
      clearInterval(clearKey);
    };
  }, [refreshMain, simulation]);
  const fetchData = async (showLoader) => {
    showLoader && setLoadingInitialData(true);
    const response = await MemoryDatabaseCall({
      params: get_simulation_interruptions(),
      url: "queryWWDataFrameDataAsync",
    });
    if (response) {
      if (response.length > 0) {
        const indexedResponse = response
          .filter((row) => row.Tagname.split(".")[0] === lineData.entName)
          .map((item) => ({
            ...item,
            name: item.Tagname.split(".")[1],
            check: item.Value,
          }));

        /*  const findEl = indexedResponse.find(
          (el) => el.name === "FlagSimulacion"
        ); */
        /*  if (findEl && findEl.Quality === 192) {
          setSimulationState(findEl.Value);
        } */

        setApiData(indexedResponse);
        const findEl = indexedResponse.find(
          (el) => el.name === "FlagSimulacion"
        );
        if (findEl && findEl.Value) {
          setSimulation(true);
        } else {
          setSimulation(false);
        }
      }
    }
    showLoader && setLoadingInitialData(false);
  };

  const handleSubmit = async (check, tag) => {
    const newData = [...apiData];
    const findEl = newData.findIndex((el) => el.Tagname === tag);

    if (findEl !== -1) {
      newData[findEl].Value = check;

      const tags_arr = [
        {
          TagName: tag,
          Value: check,
        },
      ];
      setApiData(newData);

      const response = await ApiCall({
        params: write_tags({ tags_arr }),
      });

      if (response.responseError) {
        createNotification({
          status: "error",
          code: response.responseError,
          msg: response.responseMsg,
          hide: response.responseHide,
        });
      } else {
        if (response.responseCode === "0") {
          setTimeout(
            () =>
              createNotification({
                status: "success",
                msg: "dataSavedSuccess",
                hide: 1,
              }),
            10000
          );
        }
      }
    }
    setTimeout(() => fetchData(), 20000); //HARDCODED. Dejar así
  };

  const handleSimulationClick = async ({ action }) => {
    setLoadingSimulation(true);

    const tags_arr = [
      {
        TagName: `${lineData.entName}.FlagSimulacion`,
        Value: action,
      },
    ];
    const response = await ApiCall({
      params: write_tags({ tags_arr }),
    });

    if (response.responseError) {
      createNotification({
        status: "error",
        msg: response.responseMsg,
        hide: response.responseHide,
      });
    } else {
      if (response.responseCode === "0") {
        setTimeout(() => {
          action
            ? createNotification({
                status: "success",
                msg: "simulationStartedSuccess",
                hide: 1,
              })
            : createNotification({
                status: "success",
                msg: "simulationStoppedSuccess",
                hide: 1,
              });
        }, 20000);
      }
    }

    setTimeout(() => {
      fetchData();
      setLoadingSimulation(false);
    }, 20000); //HARDCODED. Dejar así
  };

  const simulationState =
    (apiData && apiData.find((el) => el.name === "FlagSimulacion")?.Value) ||
    false;
  return loadingInitialData ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} textAlign="center">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LoadingButton
                variant="contained"
                color={simulationState ? "info" : "secondary"}
                onClick={() =>
                  handleSimulationClick({ action: !simulationState })
                }
                loading={loadingSimulation}
              >
                {simulationState
                  ? Text({ tid: "simulating" })
                  : Text({ tid: "startSimulation" })}
              </LoadingButton>
            </Grid>
            {simulationState && (
              <Grid item xs={12}>
                <Box sx={{ w: "100%" }}>
                  <LinearProgress variant="indeterminate" color="info" />
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {apiData && apiData.length > 0 && (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ backgroundColor: "background.grey4" }}>
                  <TableHead sx={{ backgroundColor: "background.grey3" }}>
                    <TableRow>
                      <TableCell>{Text({ tid: "interruption" })}</TableCell>

                      <TableCell align="center">Tag</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apiData.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{item.name}</TableCell>

                        <TableCell align="center">
                          <Switch
                            checked={item.Value}
                            onChange={(e) =>
                              handleSubmit(e.target.checked, item.Tagname)
                            }
                            disabled={
                              simulationState ? true : item.Quality !== 192
                            }
                            color="secondary"
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
      </Grid>
    </>
  );
};

export default Simulation;
