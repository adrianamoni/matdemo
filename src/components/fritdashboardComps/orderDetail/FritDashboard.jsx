import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Container,
  Tabs,
  Tab,
  styled,
  Badge,
  Grid,
  Button,
  AppBar,
} from "@mui/material";
import TabPanel from "../../TabPanel";

import General from "../../fritdashboardTabs/General/General";
import Materials from "../../fritdashboardTabs/Materials";
import Interruptions from "./../../fritdashboardTabs/Interruptions/Interruptions";
import Signals from "../../fritdashboardTabs/Signals/Signals";
import Text from "../../../languages/Text";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
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
import LineStatusButton from "./LineStatusButton";
import { MemoryDatabaseCall } from "../../../services/Service";
import { read_tags_teams } from "../../../services/serviceHelper";
import ActualInterruption from "./ActualInterruption";
import { get_actual_interruption } from "../../../services/Interruptions";
import BadgeSvg from "../../svg/BadgeSvg";
import useWindowSize from "./../../customHooks/UseWindowsSize";

const FritDashboard = () => {
  const { width } = useWindowSize();
  /*  let { slug } = useParams(); */
  /*  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME; */
  const { globalData, setGlobalData } = useContext(globalDataContext);
  const {
    lineData,
    orderData,
    oeeSpecs,
    pendingSamples,
    pendingInterruptions,
  } = globalData;
  const { setformWidget } = useContext(formContext);
  const { setSelectedRowsIds } = useContext(selectedRowsIdsContext);
  const { setSelectedRows } = useContext(selectedRowsContext);
  const { navigationData, setNavigationData } = useContext(
    navigationDataContext
  );
  const { woId, operId, seqNo, itemId } = orderData;
  const { entId, entName } = lineData;
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [planificatedButton, setPlanificatedButton] = useState(undefined);
  const [actualInterruption, setActualInterruption] = useState(undefined);
  const [modalGenerate, setModalGenerate] = useState(false);
  const [modalJustify, setModalJustify] = useState(false);
  const [refreshMain, setRefreshMain] = useState(false);

  const ofDetailNav = [
    "General",
    Text({ tid: "signals" }),
    Text({ tid: "parameters" }),
    Text({ tid: "materials" }),
    /*    Text({ tid: "load" }), */
    Text({ tid: "consumptions" }),
    Text({ tid: "productions" }),
    Text({ tid: "selfControls" }),
    Text({ tid: "interruptions" }),
    Text({ tid: "documentation" }),
    Text({ tid: "planification" }),
    Text({ tid: "simulation" }),
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
        clearIntervalData = setInterval(fetchData, 4000);
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
          sx={{
            width: "100%",
            maxWidth: { xs: 400, sm: 600, md: 900, lg: 1200, xl: 1536 },
            /* maxWidth: { xs: 450, sm: 900, md: 1200, lg: 1536  }, */
          }}
          justifyContent="center"
        >
          {/* <AppBar
            position="static"
            sx={{ backgroundColor: "background.grey3" }}
          > */}
          <Tabs
            value={navigationData.activeTab}
            onChange={handleChange}
            scrollButtons={true}
            allowScrollButtonsMobile
            //variant="scrollable"
            variant={width > 1640 ? "fullWidth" : "scrollable"}
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
                  /*    label={tab} */
                  label={
                    sampleAlert ? (
                      <Badge
                        badgeContent={pendingSamples.data.length}
                        color="error"
                      >
                        {tab}
                      </Badge>
                    ) : interruptionAlert ? (
                      <Badge
                        badgeContent={pendingInterruptions.data.length}
                        color="error"
                      >
                        {tab}
                      </Badge>
                    ) : (
                      tab
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
          {/* </AppBar> */}
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
    </>
  );
};

export default FritDashboard;
