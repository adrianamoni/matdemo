import { ButtonGroup, Grid, List, ListItem, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useContext, useEffect, useState } from "react";
import { globalDataContext } from "../../../context/ContextProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import LineProgress from "../../../widgets/progress/LineProgress";
import Text from "../../../languages/Text";
import useWindowSize from "../../customHooks/UseWindowsSize";
import { dateFormater, operation_states } from "./helper";
import { handleOperationAction } from "../../fritdashboardTabs/General/helper";
import { propsByState } from "../../../helpers/props";
import ConfirmationDialog from "../../alerts/ConfirmationDialog";
import { createNotification } from "../../alerts/NotificationAlert";
import { toast } from "react-toastify";

const InfoOE = () => {
  const { globalData } = useContext(globalDataContext);
  const { orderDetails, orderData } = globalData;
  const { woId, operId, seqNo } = globalData.orderData;
  const { productionData } = orderDetails;

  const { width } = useWindowSize();
  const [loadingPlay, setLoadingPlay] = useState(false);
  const [loadingPause, setLoadingPause] = useState(false);
  const [loadingStop, setLoadingStop] = useState(false);
  const [confirmStop, setConfirmStop] = useState(false);
  /*     const [modalStockBreak, setModalStockBreak] = useState(false); */

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

  const handlePlay = async () => {
    setLoadingPlay(true);
    await handleOperationAction({
      type: "start",
      woId: productionData.wo_id,
      operId: productionData.oper_id,
      seqNo: productionData.seq_no,
    });

    setTimeout(() => {
      setLoadingPlay(false);
    }, 1000);
  };

  const handlePause = async () => {
    setLoadingPause(true);
    await handleOperationAction({
      type: "pause",
      woId: productionData.wo_id,
      operId: productionData.oper_id,
      seqNo: productionData.seq_no,
    });
    setTimeout(() => {
      setLoadingPause(false);
    }, 1000);
  };

  const handleStop = async () => {
    setConfirmStop(false);
    setLoadingStop(true);
    await handleOperationAction({
      type: "stop",
      woId: productionData.wo_id,
      operId: productionData.oper_id,
      seqNo: productionData.seq_no,
    });
    setTimeout(() => {
      setLoadingStop(false);
    }, 1000);
  };

  const handleConfirmStop = async () => {
    setLoadingStop(true);
    setConfirmStop(true);
  };

  const { play, pause, stop } = operation_states({
    stateCd: productionData?.state_cd,
    type: "prod",
  });
  const { background } = propsByState({
    prodState: productionData.state_cd,
    cleanState: null,
  });

  return productionData ? (
    <>
      <Grid container sx={{ height: "100%" }}>
        <Grid item>
          <Typography variant="h6" component="h6">
            {productionData?.item_id.slice(-6)} {productionData?.item_desc}
          </Typography>

          <List>
            <Grid container item>
              {processedData &&
                processedData.map((item, index) => (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography sx={{ fontSize: "1.1rem" }}>
                            <strong>
                              {/* Object.keys(item) */}
                              {Object.keys(item).length > 0 ? (
                                Text({ tid: Object.keys(item) })
                              ) : (
                                <></>
                              )}
                            </strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography align="right" sx={{ fontSize: "1.1rem" }}>
                            <span
                              style={
                                item.hasOwnProperty("state")
                                  ? {
                                      paddingInline: "12px",
                                      backgroundColor: background,
                                    }
                                  : {}
                              }
                            >
                              {Object.values(item)}
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </Grid>
                ))}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>
                          {width < 550 ? "Prod." : Text({ tid: "production" })}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <LineProgress
                        value={Math.round(
                          (productionData.qty_prod / productionData.qty_reqd) *
                            100
                        )}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </Grid>
            </Grid>
          </List>
          <Grid container spacing={2}>
            <Grid item container xs={12} justifyContent={"center"}>
              {/* <ButtonGroup variant="contained" size="large"> */}
              <Grid
                container
                spacing={2}
                columnSpacing={3}
                textAlign="center"
                sx={{ maxWidth: 300 }}
              >
                <Grid item xs={4} sm={4} md={4}>
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
                <Grid item xs={4} sm={4} md={4}>
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
                <Grid item xs={4} sm={4} md={4}>
                  <LoadingButton
                    loading={loadingStop}
                    onClick={handleConfirmStop}
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
      </Grid>
      {/*  */}
      <ConfirmationDialog
        title="stopOperation"
        open={confirmStop}
        close={() => {
          setConfirmStop(false);
          setLoadingStop(false);
        }}
        msg="areYouSure"
        handleConfirm={handleStop}
      />
    </>
  ) : (
    <></>
  );
};

export default InfoOE;
