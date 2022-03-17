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
import { ApiCall, MemoryDatabaseCall } from "../../../services/Service";
import { write_tags } from "../../../services/serviceHelper";
import TableWidget from "../../../widgets/TableWidget/TableWidget";
import { createNotification } from "../../alerts/NotificationAlert";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { grey } from "@mui/material/colors";
import { checkIfModified } from "./helper";
import { globalDataContext } from "../../../context/ContextProvider";
import { get_simulation_interruptions } from "../../../services/OFservices";

const Simulation = () => {
  const { globalData } = useContext(globalDataContext);
  const { lineData } = globalData;
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [apiData, setApiData] = useState();
  const [refreshMain, setRefreshMain] = useState(false);
  const [enableSave, setEnableSave] = useState(false);

  useEffect(() => {
    fetchData();
    if (refreshMain) {
      setRefreshMain(false);
    }
  }, [refreshMain]);
  const fetchData = async () => {
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

            /* id: uuid(),
         material: item.item_id + " (" + item.item_desc + ")",
         customSchedStart: dateFormater({
           date: item.sched_start_time_local,
           type: "hora-fecha",
         }), */
          }));

        setApiData(indexedResponse);
      }
    }
  };

  const handleSubmit = async (check, tag) => {
    setLoadingSubmit(true);

    const newData = [...apiData];
    const findEl = newData.findIndex((el) => el.Tagname === tag);
    console.log("findEl", findEl);
    if (findEl !== -1) {
      newData[findEl].Value = check ? true : false;

      const tags_arr = [
        {
          TagName: tag,
          Value: check,
        },
      ];
      setApiData(newData);
      console.log("tags_arr", tags_arr);

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
    }
    fetchData();
  };

  return loadingInitialData ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
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

                      <TableCell align="center">Tag</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apiData.map((item) => (
                      <TableRow>
                        <TableCell>{item.name}</TableCell>

                        <TableCell align="center">
                          <Switch
                            checked={item.check}
                            onChange={(e) =>
                              handleSubmit(e.target.checked, item.Tagname)
                            }
                            disabled={item.Quality !== 192}
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
