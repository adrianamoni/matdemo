import {
  ButtonGroup,
  Card,
  Grid,
  List,
  ListItem,
  Typography,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import LineProgress from "../../../widgets/progress/LineProgress";
import Text from "../../../languages/Text";
import useWindowSize from "../../customHooks/UseWindowsSize";
import { dateFormater, operation_states } from "./helper";
import {
  handlePauseButton,
  handlePlayButton,
  handleStopButton,
} from "../../fritdashboardTabs/General/helper";
import { propsByState } from "../../../helpers/props";

const InfoOE = ({ data }) => {
  const { width } = useWindowSize();
  const [formattedData, setFormattedData] = useState(undefined);
  const [loadingPlay, setLoadingPlay] = useState(false);
  const [loadingPause, setLoadingPause] = useState(false);
  const [loadingStop, setLoadingStop] = useState(false);
  const [confirmStop, setConfirmStop] = useState(false);
  /*     const [modalStockBreak, setModalStockBreak] = useState(false); */

  useEffect(() => {
    if (data) {
      const formatData = () => {
        setFormattedData([
          { Wo: data.wo_id },
          { Estado: data.state_desc },
          {
            "Inicio teor.": dateFormater({
              date: data.sched_start_time_local,
              type: "fecha-hora",
            }),
          },
          {
            "Inicio Real": dateFormater({
              date: data.act_start_time_local,
              type: "fecha-hora",
            }),
          },
          { "Cant. a fabricar": `${data.qty_reqd} ${data.uomAbreviacion}` },
          { "Cant.Buena": `${data.qty_prod} ${data.uomAbreviacion}` },
          { "Cant.Rechazada": `${data.qty_rejected} ${data.uomAbreviacion}` },
        ]);
      };
      formatData();
    }
  }, [data]);

  const handlePlay = async () => {
    setLoadingPlay(true);
    await handlePlayButton({ data });
    setLoadingPlay(false);
  };

  const handlePause = async () => {
    setLoadingPause(true);
    await handlePauseButton({ data });
    setLoadingPause(false);
  };

  const handleStop = async () => {
    setConfirmStop(false);
    setLoadingStop(true);
    await handleStopButton({ data });
    setLoadingStop(false);
  };

  const handleConfirmStop = async () => {
    setLoadingStop(true);
    setConfirmStop(true);
  };

  return data ? (
    <>
      <Grid container sx={{ height: "100%" }}>
        <Grid item>
          <Typography variant="h6" component="h6">
            {data?.item_id.slice(-6)} {data?.item_desc}
          </Typography>

          <List>
            <Grid container item>
              {formattedData &&
                formattedData.map((item, index) => (
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
                          <div
                            style={
                              item.hasOwnProperty("Estado")
                                ? {
                                    paddingInline: "8px",
                                    backgroundColor: propsByState({
                                      prodState: data.state_cd,
                                      cleanState: null,
                                    }).background,
                                  }
                                : {}
                            }
                          >
                            <Typography align="right">
                              {Object.values(item)}
                            </Typography>
                          </div>
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
                  disabled={
                    loadingPlay
                      ? true
                      : data.state_cd &&
                        operation_states({
                          stateCd: data?.state_cd,
                          type: "prod",
                        }).play
                  }
                >
                  <PlayArrowIcon />
                </LoadingButton>
                <LoadingButton
                  loading={loadingPause}
                  onClick={handlePause}
                  disabled={
                    loadingPause
                      ? true
                      : data &&
                        data.state_cd &&
                        operation_states({
                          stateCd: data.state_cd,
                          type: "prod",
                        }).pause
                  }
                >
                  <PauseIcon />
                </LoadingButton>
                <LoadingButton
                  loading={loadingStop}
                  onClick={handleConfirmStop}
                  disabled={
                    loadingStop
                      ? true
                      : data &&
                        data.state_cd &&
                        operation_states({
                          stateCd: data.state_cd,
                          type: "prod",
                        }).stop
                  }
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
                  value={Math.round((data.qty_prod / data.qty_reqd) * 100)}
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
