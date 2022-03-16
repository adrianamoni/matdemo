import React, { useContext } from "react";
import {
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  Card,
  ButtonGroup,
  LinearProgress,
  Box,
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
import Limpieza from "../../fritdashboardComps/orderDetail/Limpieza";
import Paros from "../../fritdashboardComps/interruptionManagement/Paros";

const General = ({ loading }) => {
  const { width } = useWindowSize();
  const { globalData } = useContext(globalDataContext);

  const { pendingSamples, pendingInterruptions } = globalData;
  const { alert: sampleAlert, data: sampleData } = pendingSamples;
  const { alert: interruptionAlert, data: interruptionData } =
    pendingInterruptions;

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <Grid container sx={{ p: 2 }} columnSpacing={4} alignItems="stretch">
      <Grid
        container
        alignItems="stretch"
        columnSpacing={4}
        rowSpacing={1}
        sx={{ p: 2 }}
      >
        <Grid item xs={12} sm={12}>
          <Card sx={{ p: 2 }}>
            <OeeHistorico />
          </Card>
        </Grid>
      </Grid>
      <Grid
        sx={{ p: 2, display: "flex" /*  */ }}
        container
        alignItems="stretch"
        columnSpacing={4}
        rowSpacing={4}
      >
        <Grid item xs={12} sm={12} md={12} lg={7} sx={{}}>
          <Card sx={{ p: 2, height: "100%" }}>
            <InfoOE />
          </Card>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={12}
          lg={5}
          columnSpacing={4}
          rowSpacing={4}
        >
          <Grid item xs={12}>
            <Card sx={{ p: 2, height: "100%" }}>
              <OeeOrden />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <AutoControles alert={sampleAlert} data={sampleData} />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="stretch"
        columnSpacing={4}
        rowSpacing={4}
        sx={{ p: 2 }}
      >
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <Card sx={{ p: 2 }}>
            <Limpieza />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <Paros alert={interruptionAlert} data={interruptionData} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default General;
