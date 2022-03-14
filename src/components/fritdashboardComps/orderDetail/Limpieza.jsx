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
import { operation_states } from "./helper";
import { globalDataContext } from "../../../context/ContextProvider";
const Limpieza = () => {
  const { globalData } = useContext(globalDataContext);
  const [loadingPlay, setLoadingPlay] = useState(false);
  const [loadingPause, setLoadingPause] = useState(false);
  const [loadingStop, setLoadingStop] = useState(false);
  const [confirmStop, setConfirmStop] = useState(false);
  const handlePlay = async () => {
    setLoadingPlay(true);
    /* await handlePlayButton({ data }); */
    setLoadingPlay(false);
  };

  const handlePause = async () => {
    setLoadingPause(true);
    /* await handlePauseButton({ data }); */
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

  const data = globalData?.orderDetails?.cleaningData;
  return data ? (
    <>
      <Grid item textAlign="center">
        <Typography align="center" variant="h6" component="h6">
          LIMPIEZA Y CAMBIO
        </Typography>

        <Grid container item rowSpacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
            <Grid container rowSpacing={2} textAlign="left">
              <Grid item xs={6}>
                <strong>Descripción</strong>
              </Grid>
              <Grid item xs={6} textAlign="right">
                descripcion
              </Grid>
              <Grid item xs={6}>
                <strong>Tiempo</strong>
              </Grid>
              <Grid item xs={6} textAlign="right">
                tiempo
              </Grid>
              <Grid item xs={12} textAlign="center">
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
                    /* onClick={handleConfirmStop} */
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
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
            <ListItem>
              <Grid container textAlign="center">
                <Grid item xs={6} sm={6} md={6} lg={6} xl={12}>
                  <strong>Tiempo Restante</strong>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={12}>
                  B
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
            <ListItem>
              <Grid container rowSpacing={2} textAlign="left">
                <Grid item xs={6}>
                  <strong>Última Limpieza:</strong>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  descripcion
                </Grid>
                <Grid item xs={6}>
                  <strong>Estado: </strong>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  tiempo
                </Grid>
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
