import { ButtonGroup, Grid, List, ListItem, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useContext, useEffect, useState } from "react";
import {
  globalDataContext,
  pageSizeContext,
} from "../../../context/ContextProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import LineProgress from "../../../widgets/progress/LineProgress";
import Text from "../../../languages/Text";

import { dateFormater, operation_states, processOrderTimeData } from "./helper";
import {
  handleOperationAction,
  handleStopCleaning,
} from "../../fritdashboardTabs/General/helper";
import { propsByState } from "../../../helpers/props";
import ConfirmationDialog from "../../alerts/ConfirmationDialog";
import TTorder from "./textTemplates/TTorder";
import TTlimpieza from "./textTemplates/TTlimpieza";
import UseFetchMemory from "../../customHooks/UseFetchMemory";

const InfoOELimpieza = ({ active }) => {
  const { globalData } = useContext(globalDataContext);
  const { orderDetails, orderData, lineData } = globalData;
  const { entName } = lineData;
  const { woId, operId, seqNo } = globalData.orderData;
  const { productionData, cleaningData } = orderDetails;
  const { pageSize } = useContext(pageSizeContext);
  const { width } = pageSize;

  const [loadingPlay_oee, setLoadingPlay_oee] = useState(false);
  const [loadingPlay_limpieza, setLoadingPlay_limpieza] = useState(false);
  const [loadingPause_oee, setLoadingPause_oee] = useState(false);
  const [loadingPause_limpieza, setLoadingPause_limpieza] = useState(false);
  const [loadingStop_oee, setloadingStop_oee] = useState(false);
  const [loadingStop_limpieza, setLoadingStop_limpieza] = useState(false);
  const [confirmStop_oee, setConfirmStop_oee] = useState(false);
  const [confirmStop_limpieza, setConfirmStop_limpieza] = useState(false);
  const [disabledButtonsState, setdisabledButtonsState] = useState({
    play_oee: undefined,
    pause_oee: undefined,
    stop_oee: undefined,
    play_limpieza: undefined,
    pause_limpieza: undefined,
    stop_limpieza: undefined,
  });
  /*     const [modalStockBreak, setModalStockBreak] = useState(false); */

  //-------------cosas de limpieza-----------
  const [processedOrderTime, setprocessedOrderTime] = useState();
  const [orderTime, setOrderTime] = useState();

  const { data: test } = UseFetchMemory({
    request: "timePerOrder",
    customParams: {
      woId: cleaningData.wo_id,
      operId: cleaningData.oper_id,
      seqNo: cleaningData.seq_no,
    },
  });
  useEffect(() => {
    if (test) {
      setOrderTime(test);
    }
  }, [test]);

  /*  setOrderTime(data); */

  useEffect(() => {
    if (orderTime) {
      const newData = processOrderTimeData({
        orderTime: orderTime[0].tiempo,
        duracionJob: cleaningData.DuracionJob,
      });
      setprocessedOrderTime(newData);
    }
  }, [orderTime]);

  useEffect(() => {
    const {
      play: play_oee,
      pause: pause_oee,
      stop: stop_oee,
    } = operation_states({
      stateCd: productionData?.state_cd,
      type: "prod",
    });
    const {
      play: play_limpieza,
      pause: pause_limpieza,
      stop: stop_limpieza,
    } = operation_states({
      stateCd: cleaningData.state_cd,
      type: "cleaningOrder",
      prodStateCd: productionData?.state_cd || undefined,
    });
    setdisabledButtonsState({
      play_oee,
      pause_oee,
      stop_oee,
      play_limpieza,
      pause_limpieza,
      stop_limpieza,
    });
  }, [productionData, cleaningData]);

  /* useEffect(() => {
    console.log("disabledButtonsState", disabledButtonsState);
  }, [active]); */

  //------

  let processedData = [];
  if (productionData) {
    processedData = [
      { wo: productionData.wo_id },
      { state: productionData.state_desc },
      {
        theorerticalStart: dateFormater({
          date: productionData.sched_start_time_local,
          type: "fecha-hora",
        }),
      },
      {
        actualStart: dateFormater({
          date: productionData.act_start_time_local,
          type: "fecha-hora",
        }),
      },
      {
        qtyToManufacture: `${productionData.qty_reqd} ${productionData.uomAbreviacion}`,
      },
      {
        goodQty: `${productionData.qty_prod} ${productionData.uomAbreviacion}`,
      },
      {
        deniedQty: `${productionData.qty_rejected} ${productionData.uomAbreviacion}`,
      },
    ];
  }

  const handlePlay_oee = async () => {
    setLoadingPlay_oee(true);
    await handleOperationAction({
      type: "start",
      woId: productionData.wo_id,
      operId: productionData.oper_id,
      seqNo: productionData.seq_no,
    });

    setTimeout(() => {
      setLoadingPlay_oee(false);
    }, 2000);
  };
  const handlePlay_limpieza = async () => {
    setLoadingPlay_limpieza(true);
    await handleOperationAction({
      type: "start",
      woId: cleaningData.wo_id,
      operId: cleaningData.oper_id,
      seqNo: cleaningData.seq_no,
      isCleaning: true,
    });
    setLoadingPlay_limpieza(false);
  };

  const handlePause_oee = async () => {
    setLoadingPause_oee(true);
    await handleOperationAction({
      type: "pause",
      woId: productionData.wo_id,
      operId: productionData.oper_id,
      seqNo: productionData.seq_no,
    });
    setTimeout(() => {
      setLoadingPause_oee(false);
    }, 2000);
  };
  const handlePause_limpieza = async () => {
    setLoadingPause_limpieza(true);
    await handleOperationAction({
      type: "pause",
      woId: cleaningData.wo_id,
      operId: cleaningData.oper_id,
      seqNo: cleaningData.seq_no,
      isCleaning: true,
    });
    setLoadingPause_limpieza(false);
  };

  const handleStop_oee = async () => {
    setConfirmStop_oee(false);
    setloadingStop_oee(true);
    await handleOperationAction({
      type: "stop",
      woId: productionData.wo_id,
      operId: productionData.oper_id,
      seqNo: productionData.seq_no,
    });
    setTimeout(() => {
      setloadingStop_oee(false);
    }, 2000);
  };
  const handleStop_limpieza = async () => {
    setConfirmStop_limpieza(false);
    setLoadingStop_limpieza(true);

    await handleStopCleaning({
      woId: cleaningData.wo_id,
      operId: cleaningData.oper_id,
      seqNo: cleaningData.seq_no,
      entName,
    });
    setTimeout(() => setLoadingStop(false), 2000);
  };

  const handleConfirmStop_oee = async () => {
    setloadingStop_oee(true);
    setConfirmStop_oee(true);
  };
  //oee
  const {
    play: play_oee,
    pause: pause_oee,
    stop: stop_oee,
  } = operation_states({
    stateCd: productionData?.state_cd,
    type: "prod",
  });
  //limpieza
  const {
    play: play_limpieza,
    pause_limpieza,
    stop_limpieza,
  } = operation_states({
    stateCd: cleaningData.state_cd,
    type: "cleaningOrder",
    prodStateCd: productionData?.state_cd || undefined,
  });
  const { background } = propsByState({
    prodState: productionData.state_cd,
    cleanState: null,
  });

  const handleDisable = (tab, root) => {
    // console.log("called", tab, root);
    if (tab === "oee") {
      if (root === "play") {
        return loadingPlay_oee ? true : disabledButtonsState.play_oee;
      } else if (root === "pause") {
        return loadingPause_oee ? true : disabledButtonsState.pause_oee;
      } else if (root === "stop") {
        return loadingStop_oee ? true : disabledButtonsState.stop_oee;
      }
    } else if (tab === "limpieza") {
      if (root === "play") {
        return loadingPlay_limpieza ? true : disabledButtonsState.play_limpieza;
      } else if (root === "pause") {
        return loadingPause_limpieza
          ? true
          : disabledButtonsState.pause_limpieza;
      } else if (root === "stop") {
        return loadingStop_limpieza ? true : disabledButtonsState.stop_limpieza;
      }
    }
  };

  return productionData ? (
    <>
      <Grid
        container
        rowSpacing={1}
        sx={{ paddingBottom: "40px", height: "100%" }}
      >
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
            {active === "oee" &&
              `${productionData?.item_id.slice(-6)} ${
                productionData?.item_desc
              }`}
            {active === "limpieza"
              ? cleaningData.DuracionJob && cleaningData.DuracionJob === "0"
                ? Text({ tid: "change" })
                : Text({ tid: "cleaningAndChange" })
              : ""}
          </Typography>
        </Grid>
        {active === "oee" && (
          <TTorder
            processedData={processedData}
            productionData={productionData}
            background={background}
            width={width}
          />
        )}
        {active === "limpieza" && (
          <TTlimpieza
            cleaningData={cleaningData}
            processedOrderTime={processedOrderTime}
            width={width}
          />
        )}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "flex-end",
          }}
        >
          <Grid container sx={{ maxWidth: 350, p: 1 }}>
            <Grid item xs={4}>
              <LoadingButton
                loading={loadingPlay_oee}
                onClick={
                  active === "oee"
                    ? handlePlay_oee
                    : active === "limpieza"
                    ? handlePlay_limpieza
                    : () => console.log("err")
                }
                disabled={handleDisable(active, "play")}
                variant="contained"
                color="primary"
                sx={{ marginInline: 1, p: 3 }}
              >
                <PlayArrowIcon />
              </LoadingButton>
            </Grid>
            <Grid item xs={4}>
              <LoadingButton
                loading={loadingPause_oee}
                onClick={
                  active === "oee"
                    ? handlePause_oee
                    : active === "limpieza"
                    ? handlePause_limpieza
                    : () => console.log("err")
                }
                disabled={handleDisable(active, "pause")}
                variant="contained"
                color="primary"
                sx={{ marginInline: 1, p: 3 }}
              >
                <PauseIcon />
              </LoadingButton>
            </Grid>
            <Grid item xs={4}>
              <LoadingButton
                loading={loadingStop_oee}
                onClick={
                  active === "oee"
                    ? handleConfirmStop_oee
                    : active === "limpieza"
                    ? () =>
                        processedOrderTime && processedOrderTime.value > 0
                          ? setConfirmStop_limpieza(true)
                          : handleStop_limpieza()
                    : () => console.log("err")
                }
                disabled={handleDisable(active, "stop")}
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

      <ConfirmationDialog
        title="stopOperation"
        open={confirmStop_oee}
        close={() => {
          setConfirmStop_oee(false);
          setloadingStop_oee(false);
        }}
        msg="areYouSure"
        handleConfirm={handleStop_oee}
      />
    </>
  ) : (
    <></>
  );
};

export default InfoOELimpieza;
