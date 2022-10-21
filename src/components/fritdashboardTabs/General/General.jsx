import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Card,
  LinearProgress,
  Box,
} from "@mui/material";

import {
  globalDataContext,
  pageSizeContext,
} from "../../../context/ContextProvider";
import InfoOE from "../../fritdashboardComps/orderDetail/InfoOE";
import OeeOrden from "../../fritdashboardComps/orderDetail/OeeOrden";
import OeeHistorico from "../../fritdashboardComps/orderDetail/OeeHistorico";
import AutoControles from "../../fritdashboardComps/orderDetail/AutoControles";
import Limpieza from "../../fritdashboardComps/orderDetail/Limpieza";
import Paros from "../../fritdashboardComps/interruptionManagement/Paros";
import InfoOELimpieza from "../../fritdashboardComps/orderDetail/InfoOeeLimpieza";
import { MemoryDatabaseCall } from "../../../services/Service";
import { tab_of_planification } from "../../../services/OFservices";
import uuid from "react-uuid";
import { dateFormater } from "./../../fritdashboardComps/orderDetail/helper";

import CustomStepper from "../../../widgets/CustomStepper/CustomStepper";

const General = ({ loading }) => {
  const { pageSize } = useContext(pageSizeContext);
  const { width } = pageSize;
  const { globalData } = useContext(globalDataContext);
  const [orderOrCleaning, setorderOrCleaning] = useState("oee");
  const { pendingSamples, pendingInterruptions, orderDetails, lineData } =
    globalData;
  const { alert: sampleAlert, data: sampleData } = pendingSamples;
  const { alert: interruptionAlert, data: interruptionData } =
    pendingInterruptions;
  //effect para determinar cual boton estará activo (detalle de orden o limpieza, basado
  // en el state_cd)
  useEffect(() => {
    //modificar a solo inicio
    if (orderDetails) {
      let activeOee = orderDetails.productionData.state_cd === 3;
      let activeCleanning = orderDetails.cleaningData.state_cd === 3;
      let response = activeOee ? "oee" : activeCleanning ? "limpieza" : "oee";
      setorderOrCleaning(response);
    }
  }, []);
  /*  useEffect(() => {
    if (orderDetails) {
      if (orderDetails.productionData.state_cd === 4) {
        setorderOrCleaning("limpieza");
      } else if (orderDetails.cleaningData.state_cd === 4) {
       
      }
    }
  }, [orderDetails]); */

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <Grid container sx={{ p: 2, mt: 2 }} alignItems="stretch">
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
            <Box sx={{ display: "flex", flex: 1 }}>
              {/* <ButtonGroup
                sx={{ marginBottom: "20px" }}
                aria-label="text button group"
              >
                <Button
                  onClick={() => setorderOrCleaning("oee")}
                  variant={orderOrCleaning === "oee" ? "contained" : "outlined"}
                  color="primary"
                >
                  {`${orderDetails?.productionData?.item_id.slice(-6)} ${
                    orderDetails?.productionData?.item_desc
                  }`}
                </Button>
                <Button
                  variant={
                    orderOrCleaning === "limpieza" ? "contained" : "outlined"
                  }
                  onClick={() => setorderOrCleaning("limpieza")}
                >
                  Limpieza
                </Button>
              </ButtonGroup> */}
              <CustomStepper />
            </Box>
            {/* <InfoOE /> */}
            {/* <Limpieza /> */}
            <InfoOELimpieza
              active={orderOrCleaning}
              setActive={setorderOrCleaning}
            />
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
          <Grid item xs={12}>
            <Paros alert={interruptionAlert} data={interruptionData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default General;
