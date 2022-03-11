import React, { useContext } from "react";
import {
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  Card,
  ButtonGroup,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import Text from "../../../languages/Text";
import HalfDoughnut from "../../../widgets/halfDoughnut/HalfDoughnut";
import Timeline from "../../../widgets/timeline/Timeline";
import useWindowSize from "../../customHooks/UseWindowsSize";
import LineProgress from "../../../widgets/progress/LineProgress";
import { blue } from "@mui/material/colors";
import { globalDataContext } from "../../../context/ContextProvider";
import InfoOE from "../../fritdashboardComps/orderDetail/InfoOE";
import OeeOrden from "../../fritdashboardComps/orderDetail/OeeOrden";
import OeeHistorico from "../../fritdashboardComps/orderDetail/OeeHistorico";
import AutoControles from "../../fritdashboardComps/orderDetail/AutoControles";
import Paros from "../../fritdashboardComps/orderDetail/Paros";
import Limpieza from "../../fritdashboardComps/orderDetail/Limpieza";

const General = () => {
  const { width } = useWindowSize();
  const { globalData } = useContext(globalDataContext);
  const { orderDetails } = globalData;

  return (
    <Grid container sx={{ p: 3 }} spacing={2}>
      <Grid item xs={12} sm={12}>
        <Card sx={{ p: 1 }}>
          <OeeHistorico />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={7}>
        <Card sx={{ p: 1 }}>
          <InfoOE
            data={
              orderDetails &&
              orderDetails.productionData &&
              orderDetails.productionData
            }
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={5} style={{ height: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
              <OeeOrden />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
              <AutoControles />
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={7}>
        <Card sx={{ p: 2 }}>
          <Limpieza />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={5}>
        <Card sx={{ p: 2 }}>
          <Paros />
        </Card>
      </Grid>

      {/*
      <Grid item xs={12} md={12} lg={3}>
        <Card raised>
          <Grid container item xs={12}>
            <OeeOrden />
          </Grid>
          <Grid container align="center" item xs={12}>
            <Grid item xs={12}>
              <Typography variant="h6" component="h6">
                AUTO CONTROLES
              </Typography>
            </Grid>

            <Grid item xs={6}>
              Fecha último
              <br />
              auto control
            </Grid>
            <Grid item xs={6}>
              -
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} md={12} lg={3}>
        <Card raised>a</Card>
      </Grid>
      <Grid item xs={12} md={12} lg={9}>
        <Card raised>b</Card>
      </Grid> */}
      {/*
       */}
    </Grid>
  );
};

export default General;
