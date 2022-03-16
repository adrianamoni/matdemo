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
import Documentation from "../../fritdashboardTabs/Documentation";
import Planification from "../../fritdashboardTabs/Planification";
import Consumptions from "./../../fritdashboardTabs/Consumption/Consumptions";
import Productions from "./../../fritdashboardTabs/Production/Productions";
import LineStatusButton from "./LineStatusButton";
import { MemoryDatabaseCall } from "../../../services/Service";
import { read_tags_teams } from "../../../services/serviceHelper";
import ActualInterruption from "./ActualInterruption";
import { get_actual_interruption } from "../../../services/Interruptions";

const FritDashboard = () => {
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
    let clearTimeoutActualInterruption;
    let clearTimeoutPlanificate;
    const fetchActualInterruption = async () => {
      const response = await MemoryDatabaseCall({
        params: get_actual_interruption(entId),
        url: "queryDataAsync",
      });

      if (response) {
        if (response.length > 0) {
          setActualInterruption(response[0]);
        }
      }
      clearTimeoutActualInterruption = setTimeout(
        fetchActualInterruption,
        4000
      );
    };
    const readPlanificateButtonState = async () => {
      const filter = {
        filterExpression: {
          filters: [
            {
              filterExpression: null,
              filterItem: {
                column: "Tagname",
                dataType: "String",
                value: `${entName}.Planificada`,
                filterItemType: "Equal",
                checkDBNull: false,
              },
            },
          ],
          filterExpressionType: "AND",
          negationFilterExpression: false,
        },
        filterItem: null,
      };

      const response = await MemoryDatabaseCall({
        params: read_tags_teams({ filter }),
        url: "queryWWDataFrameDataAsync",
      });

      if (response) {
        if (response.length > 0) {
          if (response[0] && response[0].Quality === 192) {
            if (response[0].Value) {
              setPlanificatedButton(true);
            } else {
              setPlanificatedButton(false);
            }
          }
        }
      }
      clearTimeoutPlanificate = setTimeout(readPlanificateButtonState, 30000);
    };
    if (lineData) {
      if (orderData) {
        fetchData(true);
        clearIntervalData = setInterval(fetchData, 6000);
        readPlanificateButtonState();
        fetchActualInterruption();
        /* 
          fetchSpecs();
          fetchActualInterruption();
          fetchAlertData();
          readPlanificateButtonState();
          clearIntervalAlert = setInterval(fetchAlertData, 6000); */
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
      clearTimeout(clearTimeoutPlanificate);
      clearTimeout(clearTimeoutActualInterruption);
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

  const push =
    actualInterruption &&
    actualInterruption.reas_desc.toLowerCase().includes("paro") &&
    actualInterruption.reas_desc.toLowerCase().includes("pendiente") &&
    actualInterruption.reas_desc.toLowerCase().includes("justificar")
      ? setModalJustify
      : setModalGenerate;
  return (
    <>
      <Container sx={{ m: "auto" }} id="fritDashboard-main-container">
        {/* <Segment.Group
          stacked
          raised
          horizontal={pageSize.width > 900}
          style={{ border: "none" }}
        >
          {planificatedButton !== undefined && (
            <LineStatusButton
              planificatedButton={planificatedButton}
              lineName={line.entName}
            />
          )}
          {actualInterruption && (
            <ActualInterruption interruption={actualInterruption} push={push} />
          )}
        </Segment.Group> */}
        <Grid container>
          {planificatedButton !== undefined && (
            <Grid item xs={6}>
              <LineStatusButton
                planificatedButton={planificatedButton}
                lineName={entName}
              />
            </Grid>
          )}
          {actualInterruption && (
            <Grid item xs={6}>
              <ActualInterruption
                interruption={actualInterruption}
                push={push}
              />
            </Grid>
          )}
        </Grid>
        <Box
          sx={{
            maxWidth: { xs: 350, sm: 600, md: 900, lg: 1200, xl: 1536 },
          }}
          justifyContent="center"
        >
          <Tabs
            value={navigationData.activeTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={true}
            allowScrollButtonsMobile
            aria-label="scrollable auto tabs example"
            sx={{ m: "auto" }}
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
                  label={tab}
                  index={index}
                  sx={{
                    color: (sampleAlert || interruptionAlert) && "error.main",
                  }}
                />
              );
            })}
          </Tabs>
        </Box>

        <Container id="fritDashboard-content-container" fluid>
          <Panels
            value={navigationData.activeTab}
            loading={loadingInitialData}
          />
        </Container>
      </Container>
      {/* <GenerateInterruptionModal
        modalGenerate={modalGenerate}
        setModalGenerate={setModalGenerate}
      />
      <JustifyInterruptionOFModal
        interruptionSelected={actualInterruption}
        modalJustify={modalJustify}
        setModalJustify={setModalJustify}
      /> */}
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
    </>
  );
};

export default FritDashboard;
