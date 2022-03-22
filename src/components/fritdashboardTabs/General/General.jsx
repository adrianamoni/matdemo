import React, { useContext } from "react";
import { Grid, Card, LinearProgress, Box } from "@mui/material";
import useWindowSize from "../../customHooks/UseWindowsSize";
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
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <Grid
      container
      sx={{ p: 2, mt: 2 }}
      columnSpacing={4}
      rowSpacing={3}
      alignItems="stretch"
    >
      <Grid
        container
        alignItems="stretch"
        sx={{ mb: 3 }}
        columnSpacing={3}
        rowSpacing={3}
      >
        <Grid item xs={12} sm={12}>
          <Card sx={{ p: 2, backgroundColor: "background.grey4" }}>
            <OeeHistorico />
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="stretch"
        columnSpacing={3}
        rowSpacing={3}
        sx={{ mb: 3, display: "flex" }}
      >
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <Card
            sx={{ p: 2, height: "100%", backgroundColor: "background.grey4" }}
          >
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
          columnSpacing={3}
          rowSpacing={3}
        >
          <Grid item xs={12}>
            <Card
              sx={{ p: 2, height: "100%", backgroundColor: "background.grey4" }}
            >
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
        columnSpacing={3}
        /*       rowSpacing={1} */
        /* sx={{ p: 2 }} */
      >
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <Card sx={{ p: 2, backgroundColor: "background.grey4" }}>
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
