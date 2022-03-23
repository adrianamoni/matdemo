import React, { useContext, useEffect, useState } from "react";

import { Box, Container, Tabs, Tab, Badge, Typography } from "@mui/material";
import TabPanel from "../../TabPanel";

import General from "../../fritdashboardTabs/General/General";
import Materials from "../../fritdashboardTabs/Materials";
import Interruptions from "./../../fritdashboardTabs/Interruptions/Interruptions";
import Signals from "../../fritdashboardTabs/Signals/Signals";
import Text from "../../../languages/Text";
import {
  globalDataContext,
  navigationDataContext,
} from "../../../context/ContextProvider";
import {
  getOrderDetails,
  getPendingInterruptions,
  getPendingSamples,
} from "./helper";
import Parameters from "../../fritdashboardTabs/Parameters";

import Quality from "../../fritdashboardTabs/Quality/Quality";
import Documentation from "../../fritdashboardTabs/Documentation/Documentation";
import Planification from "../../fritdashboardTabs/Planification/Planification";
import Simulation from "../../fritdashboardTabs/Simulation/Simulation";
import Consumptions from "./../../fritdashboardTabs/Consumption/Consumptions";
import Productions from "./../../fritdashboardTabs/Production/Productions";
import useWindowSize from "./../../customHooks/UseWindowsSize";
import uuid from "react-uuid";
import OperatingData from "../../fritdashboardTabs/OperatingData/OperatingData";

const FritDashboard = () => {
  const { width } = useWindowSize();
  /*  let { slug } = useParams(); */
  /*  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME; */
  const { globalData, setGlobalData } = useContext(globalDataContext);
  const { lineData, orderData, pendingSamples, pendingInterruptions } =
    globalData;

  const { navigationData, setNavigationData } = useContext(
    navigationDataContext
  );
  const { woId, operId, seqNo, itemId } = orderData;
  const { entId } = lineData;
  const [loadingInitialData, setLoadingInitialData] = useState(true);

  const [modalJustify, setModalJustify] = useState(false);
  const [refreshMain, setRefreshMain] = useState(false);

  const ofDetailNav = [
    { id: uuid(), name: "General" },
    { id: uuid(), name: Text({ tid: "signals" }) },
    { id: uuid(), name: Text({ tid: "parameters" }) },
    { id: uuid(), name: Text({ tid: "materials" }) },
    { id: uuid(), name: Text({ tid: "consumptions" }) },
    { id: uuid(), name: Text({ tid: "productions" }) },
    { id: uuid(), name: Text({ tid: "selfControls" }) },
    { id: uuid(), name: Text({ tid: "interruptions" }) },
    { id: uuid(), name: Text({ tid: "documentation" }) },
    { id: uuid(), name: Text({ tid: "planification" }) },
    { id: uuid(), name: Text({ tid: "simulation" }) },
    { id: uuid(), name: Text({ tid: "operatingData" }) },
  ];

  /* const [value, setValue] = useState(0); */

  const handleChange = (event, newValue) => {
    /*     setValue(newValue); */
    setNavigationData({
      ...navigationData,
      activeTab: newValue,
    });
  };

  useEffect(() => {
    let clearIntervalData;

    if (lineData) {
      if (orderData) {
        fetchData(true);
        clearIntervalData = setInterval(fetchData, 3000);
      }
    }
    if (modalJustify) {
      clearTimeout(clearTimeoutActualInterruption);
    }
    if (refreshMain) {
      setRefreshMain(false);
    }
    return () => {
      clearInterval(clearIntervalData);
      /* setGlobalData({
        ...globalData,
        pendingSamples: { alert: false, data: [] },
        pendingInterruptions: { alert: false, data: [] },
        orderDetails: {
          productionData: [],
          cleaningData: [],
        },
      }); */
    };
  }, [modalJustify]);

  // useEffect(() => {
  //   setformWidget({});
  //   setSelectedRowsIds({});
  //   setSelectedRows([]);
  // }, [value]);

  const fetchData = async (showLoader) => {
    const { productionData, cleaningData } = await getOrderDetails({
      order: orderData,
    });
    const { samplesResult } = await getPendingSamples({
      customParams: { entId, woId, operId, seqNo, itemId },
    });
    const { interruptionResult } = await getPendingInterruptions({
      customParams: { entId },
    });

    if (productionData && cleaningData && samplesResult && interruptionResult) {
      setGlobalData({
        ...globalData,
        orderDetails: {
          productionData: productionData,
          cleaningData: cleaningData,
        },
        pendingSamples: {
          alert: samplesResult.qualityAlert,
          data: samplesResult.qualityData,
        },
        pendingInterruptions: {
          alert: interruptionResult.interruptionAlert,
          data: interruptionResult.interruptionData,
        },
      });
    }
    showLoader && setLoadingInitialData(false);
  };

  return (
    <>
      <Container sx={{ m: "auto" }} id="fritDashboard-main-container">
        <Box
          className="custom-tabs"
          sx={{
            width: "100%",
            /*  maxWidth: { xs: 400, sm: 600, md: 900, lg: 1200, xl: 1536 }, */
          }}
          justifyContent="center"
        >
          <Tabs
            value={navigationData.activeTab}
            onChange={handleChange}
            scrollButtons={true}
            allowScrollButtonsMobile
            //variant="scrollable"
            variant={width > 1900 ? "fullWidth" : "scrollable"}
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="scrollable auto tabs example"
            sx={{
              m: "auto",
              color: "text.main",
              /* backgroundColor: "background.grey3", */
            }}
            className="frit-tabs"
            /* id="fritDashboard-tabs-container" */
          >
            {ofDetailNav.map((tab, index) => {
              let sampleAlert, interruptionAlert;
              if (pendingSamples.alert && index === 6) {
                sampleAlert = true;
              }
              if (pendingInterruptions.alert && index === 7) {
                interruptionAlert = true;
              }

              return (
                <Tab
                  key={tab.id}
                  label={
                    sampleAlert ? (
                      <Badge
                        badgeContent={pendingSamples.data.length}
                        color="error"
                      >
                        <Typography variant="body1">{tab.name}</Typography>
                      </Badge>
                    ) : interruptionAlert ? (
                      <Badge
                        badgeContent={pendingInterruptions.data.length}
                        color="error"
                      >
                        <Typography variant="body1">{tab.name}</Typography>
                      </Badge>
                    ) : (
                      <Typography variant="body1">{tab.name}</Typography>
                    )
                  }
                  index={index}
                  sx={{
                    color: (sampleAlert || interruptionAlert) && "error.main",
                  }}
                />
              );
            })}
          </Tabs>
        </Box>

        <Container
          id="fritDashboard-content-container"
          /* fluid */
          sx={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Panels
            value={navigationData.activeTab}
            loading={loadingInitialData}
          />
        </Container>
      </Container>
    </>
  );
};

const Panels = ({ value, loading }) => {
  return (
    <>
      <TabPanel value={value} index={0}>
        <General loading={loading} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signals />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Parameters />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Materials />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Consumptions />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Productions />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Quality />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Interruptions />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <Documentation />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <Planification />
      </TabPanel>
      <TabPanel value={value} index={10}>
        <Simulation />
      </TabPanel>
      <TabPanel value={value} index={11}>
        <OperatingData />
      </TabPanel>
    </>
  );
};

export default FritDashboard;
