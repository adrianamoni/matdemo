import React, { useContext, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  ButtonGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import {
  operation_states,
  processOrderTimeData,
  timeFormating,
} from "./helper";
import { globalDataContext } from "../../../context/ContextProvider";
import { handleOperationAction } from "../../fritdashboardTabs/General/helper";
import UseFetchMemory from "../../customHooks/UseFetchMemory";
import LastCleaning from "./LastCleaning";
import useWindowSize from "../../customHooks/UseWindowsSize";

const Limpieza = () => {
  const { width } = useWindowSize();
  const { globalData } = useContext(globalDataContext);
  const { orderDetails, /* orderData */ lineData } = globalData;
  const { productionData, cleaningData } = orderDetails;
  /*   const { woId, operId, seqNo } = orderData; */
  const { entId } = lineData;
  const [loadingPlay, setLoadingPlay] = useState(false);
  const [loadingPause, setLoadingPause] = useState(false);
  const [loadingStop, setLoadingStop] = useState(false);
  const [confirmStop, setConfirmStop] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  const { data: orderTime } = UseFetchMemory({
    request: "timePerOrder",
    customParams: {
      woId: cleaningData.wo_id,
      operId: cleaningData.oper_id,
      seqNo: cleaningData.seq_no,
    },
  });
  let processedOrderTime;
  if (orderTime) {
    processedOrderTime = processOrderTimeData({
      orderTime: orderTime[0].tiempo,
      duracionJob: cleaningData.DuracionJob,
    });
  }

  /*  const fetchOrderTime = async () => {
    const response = await MemoryDatabaseCall({
      params: cleaning_order_time({
        woId: data.wo_id,
        operId: data.oper_id,
        seqNo: parseInt(order.spare3), //seqNo
      }),
      url: "queryDataAsync",
    });

    if (response && mountedComp) {
      if (response.length > 0) {
        setOrderTime(response[0].tiempo);
      } else {
        setOrderTime(0);
      }
    }
    clearTimeoutKey = setTimeout(
      fetchOrderTime,
      20000
      // globalVariables.intervalTime.midLowFrequency
    );
  }; */

  const handlePlay = async () => {
    setLoadingPlay(true);
    await handleOperationAction({
      type: "start",
      woId: cleaningData.wo_id,
      operId: cleaningData.oper_id,
      seqNo: cleaningData.seq_no,
    });
    setLoadingPlay(false);
  };

  const handlePause = async () => {
    setLoadingPause(true);
    await handleOperationAction({
      type: "pause",
      woId: cleaningData.wo_id,
      operId: cleaningData.oper_id,
      seqNo: cleaningData.seq_no,
    });
    setLoadingPause(false);
  };

  const handleStop = async () => {
    setConfirmStop(false);
    setLoadingStop(true);
    await handleOperationAction({
      type: "stop",
      woId: cleaningData.wo_id,
      operId: cleaningData.oper_id,
      seqNo: cleaningData.seq_no,
    });
    setLoadingStop(false);
  };

  const handleConfirmStop = async () => {
    setLoadingStop(true);
    setConfirmStop(true);
  };
  const { play, pause, stop } = operation_states({
    stateCd: cleaningData.state_cd,
    type: "cleaningOrder",
    prodStateCd: productionData?.state_cd || undefined,
  });

  return cleaningData ? (
    <>
      <Grid item textAlign="center">
        <Typography align="center" variant="h6" component="h6">
          {cleaningData.DuracionJob && cleaningData.DuracionJob === "0"
            ? "Cambio"
            : "Limpieza y Cambio"}
        </Typography>

        <Grid container item rowSpacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
            <Grid container rowSpacing={2} textAlign="left">
              <Grid item xs={6}>
                <strong>Descripción</strong>
              </Grid>
              <Grid item xs={6} textAlign="right">
                {cleaningData.DuracionJob === "0"
                  ? "SIN LIMPIEZA"
                  : cleaningData.job_desc === "P"
                  ? "Limpieza con producto"
                  : cleaningData.job_desc === "S"
                  ? "Limpieza en seco"
                  : cleaningData.job_desc === "A"
                  ? "Limpieza con agua"
                  : cleaningData.job_desc === ""
                  ? "Limpieza en seco"
                  : "SIN LIMPIEZA"}
              </Grid>
              <Grid item xs={6}>
                <strong>Tiempo</strong>
              </Grid>
              <Grid item xs={6} textAlign="right">
                {cleaningData.DuracionJob
                  ? timeFormating(cleaningData.DuracionJob * 60)
                  : "0 min"}
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Grid
                  container
                  spacing={2}
                  columnSpacing={3}
                  textAlign="center"
                  sx={{ maxWidth: 300 }}
                >
                  <Grid item xs={4}>
                    <LoadingButton
                      loading={loadingPlay}
                      onClick={handlePlay}
                      disabled={loadingPlay ? true : play}
                      variant="contained"
                      color="primary"
                      sx={{ marginInline: 1, p: 3 }}
                    >
                      <PlayArrowIcon />
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={4}>
                    <LoadingButton
                      loading={loadingPause}
                      onClick={handlePause}
                      disabled={loadingPause ? true : pause}
                      variant="contained"
                      color="primary"
                      sx={{ marginInline: 1, p: 3 }}
                    >
                      <PauseIcon />
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={4}>
                    <LoadingButton
                      loading={loadingStop}
                      onClick={() =>
                        processedOrderTime && processedOrderTime.value > 0
                          ? setConfirmStop(true)
                          : handleStop()
                      }
                      disabled={loadingStop ? true : stop}
                      variant="contained"
                      color="primary"
                      sx={{ marginInline: 1, p: 3 }}
                    >
                      <StopIcon />
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
            <ListItem>
              <Grid container textAlign="center">
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={12}
                  textAlign={width > 1536 ? "center" : "left"}
                >
                  <strong>Tiempo Restante</strong>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={12}
                  textAlign={width > 1536 ? "center" : "right"}
                >
                  {processedOrderTime?.text || "-"}
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
            <ListItem>
              <Grid container rowSpacing={2} textAlign="left">
                <LastCleaning />
              </Grid>
            </ListItem>
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : (
    <></>
  );
};

export default Limpieza;
