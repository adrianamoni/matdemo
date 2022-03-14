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

const InfoOE = () => {
  const { globalData } = useContext(globalDataContext);
  const { orderDetails, orderData } = globalData;
  const { woId, operId, seqNo } = globalData.orderData;
  console.log("orderDetails", orderDetails);
  const { productionData } = orderDetails;
  console.log("productionData", productionData);

  const { width } = useWindowSize();
  const [loadingPlay, setLoadingPlay] = useState(false);
  const [loadingPause, setLoadingPause] = useState(false);
  const [loadingStop, setLoadingStop] = useState(false);
  const [confirmStop, setConfirmStop] = useState(false);
  /*     const [modalStockBreak, setModalStockBreak] = useState(false); */

  let processedData = [];
  if (productionData) {
    processedData = [
      { Wo: productionData.wo_id },
      { Estado: productionData.state_desc },
      {
        "Inicio teor.": dateFormater({
          date: productionData.sched_start_time_local,
          type: "fecha-hora",
        }),
      },
      {
        "Inicio Real": dateFormater({
          date: productionData.act_start_time_local,
          type: "fecha-hora",
        }),
      },
      {
        "Cant. a fabricar": `${productionData.qty_reqd} ${productionData.uomAbreviacion}`,
      },
      {
        "Cant.Buena": `${productionData.qty_prod} ${productionData.uomAbreviacion}`,
      },
      {
        "Cant.Rechazada": `${productionData.qty_rejected} ${productionData.uomAbreviacion}`,
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
    setLoadingPlay(false);
  };

  const handlePause = async () => {
    setLoadingPause(true);
    await handleOperationAction({
      type: "pause",
      woId: productionData.wo_id,
      operId: productionData.oper_id,
      seqNo: productionData.seq_no,
    });
    setLoadingPause(false);
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
    setLoadingStop(false);
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
                          <Typography>
                            <strong>
                              {Object.keys(item).length > 0 &&
                                Object.keys(item)}
                            </strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            align="right"
                            sx={
                              item.hasOwnProperty("Estado")
                                ? {
                                    paddingInline: "8px",
                                    backgroundColor: background,
                                  }
                                : {}
                            }
                          >
                            {Object.values(item)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </Grid>
                ))}
            </Grid>
          </List>

          <Grid container>
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              lg={4}
              justifyContent={"center"}
            >
              <ButtonGroup
                variant="contained"
                size="large"
                aria-label="large button group"
              >
                <LoadingButton
                  loading={loadingPlay}
                  onClick={handlePlay}
                  disabled={loadingPlay ? true : play}
                >
                  <PlayArrowIcon />
                </LoadingButton>
                <LoadingButton
                  loading={loadingPause}
                  onClick={handlePause}
                  disabled={loadingPause ? true : pause}
                >
                  <PauseIcon />
                </LoadingButton>
                <LoadingButton
                  loading={loadingStop}
                  onClick={handleConfirmStop}
                  disabled={loadingStop ? true : stop}
                >
                  <StopIcon />
                </LoadingButton>
              </ButtonGroup>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              lg={8}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ p: 2 }}
            >
              <Grid item xs={12} sm={12} md={12} xl={3}>
                <strong>
                  {width < 550 ? "Prod." : Text({ tid: "production" })}
                </strong>
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={9}>
                <LineProgress
                  value={Math.round(
                    (productionData.qty_prod / productionData.qty_reqd) * 100
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/*  */}
    </>
  ) : (
    <></>
  );
};

export default InfoOE;
