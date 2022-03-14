import React, { useContext, useEffect, useState } from "react";

import { Box, Container, Tabs, Tab } from "@mui/material";
import TabPanel from "../../TabPanel";

import General from "../../fritdashboardTabs/General/General";
import Materials from "../../fritdashboardTabs/Materials";
import Paros from "../../fritdashboardTabs/Paros";
import Signals from "../../fritdashboardTabs/Signals/Signals";
import Text from "../../../languages/Text";
import { globalDataContext } from "../../../context/ContextProvider";
import { getOrderDetails, getPendingSamples } from "./helper";
import Parameters from "../../fritdashboardTabs/Parameters";
import Consumptions from "./../../fritdashboardTabs/Consumptions";
import Productions from "./../../fritdashboardTabs/Productions";
import Quality from "../../fritdashboardTabs/Quality/Quality";
import Documentation from "../../fritdashboardTabs/Documentation";
import Planification from "../../fritdashboardTabs/Planification";
import UseFetchMemory from "../../customHooks/UseFetchMemory";

const FritDashboard = () => {
  /*  let { slug } = useParams(); */
  /*  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME; */
  const { globalData, setGlobalData } = useContext(globalDataContext);
  const { lineData, orderData, oeeSpecs } = globalData;
  const { woId, operId, seqNo, itemId } = orderData;
  const { entId } = lineData;
  const [loadingInitialData, setLoadingInitialData] = useState(true);
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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let clearIntervalOfDetail;
    if (lineData) {
      if (orderData) {
        fetchOrderDetail();
        clearIntervalOfDetail = setInterval(fetchOrderDetail, 6000);
        // fetchPendingSamples();
        // clearIntervalSamples = setInterval(fetchPendingSamples, 6000);
        // fetchPendingInterruptions();
        // clearIntervalInterruptions = setInterval(
        //   fetchPendingInterruptions,
        //   6000
        // );

        /* 
          fetchSpecs();
          fetchActualInterruption();
          fetchAlertData();
          readPlanificateButtonState();
          clearIntervalAlert = setInterval(fetchAlertData, 6000); */
      }
    }
    return () => {
      clearInterval(clearIntervalOfDetail);
      // clearInterval(clearIntervalSamples);
      // clearInterval(clearIntervalInterruptions);
    };
  }, []);

  const fetchOrderDetail = async () => {
    const { productionData, cleaningData } = await getOrderDetails({
      order: orderData,
    });

    setGlobalData({
      ...globalData,
      orderDetails: {
        productionData: productionData,
        cleaningData: cleaningData,
      },
    });
    setLoadingInitialData(false);
  };
  const fetchPendingSamples = async () => {
    const { response } = await UseFetchMemory({
      request: "pendingSamples",
      customParams: { entId, woId, operId, seqNo, itemId },
    });
    console.log("response", response);
    /* setGlobalData({
      ...globalData,
      pendingSamples: response,
    }); */
  };
  /* const fetchPendingInterruptions = async () => {
    const { response } = await getPendingInterruptions({
      order: orderData,
    });

    setGlobalData({
      ...globalData,
      pendingInterruptions: response,
    });
  }; */

  /* const { order } = useContext(OrderContext);
  const { line } = useContext(LineContext);
  const { ofDetailData, setOfDetailData } = useContext(OfDetailData);
  const { globalVariables, setGlobalVariables } = useContext(
    GlobalVariablesContext
  );
  const { pageSize } = useContext(PageSizeContext);
  const { setOeeSpecs } = useContext(OeeSpecsContext);
  const [activePane, setActivePane] = useState(undefined);
  const { pendingData, setPendingData } = useContext(PendingContext);
  const [planificatedButton, setPlanificatedButton] = useState(undefined);
  const [refreshMain, setRefreshMain] = useState(false);
  const [modalGenerate, setModalGenerate] = useState(false);
  const [modalJustify, setModalJustify] = useState(false);
  const [actualInterruption, setActualInterruption] = useState(undefined);

  useEffect(() => {
    let clearIntervalOfDetail;
    let clearTimeoutActualInterruption;
    let clearIntervalAlert;
    let clearTimeoutPlanificate;

    const fetchOrderDetail = async () => {
      let obj1, obj2;
      const response = await MemoryDatabaseCall({
        params: get_order_details({
          woId: order.woId,
          operId: order.operId,
          seqNo: order.seqNo,
        }),
        url: "queryDataAsync",
      });

      if (response) {
        if (response.length > 0) {
          obj1 = response.find(
            (data) => data.oper_id !== "limpieza" && data.oper_id !== "NETEJA"
          );

          //PARSEO DE PROP TEXTO ROTURA STOCK
          let textRotura = obj1?.TextoRoturaStock;
          textRotura = textRotura ? JSON.parse(textRotura) : "";
          obj1.TextoRoturaStock = textRotura;
        }
      }

      const response2 = await MemoryDatabaseCall({
       
        params: get_order_details({
          woId: order.woId,
          operId: "NETEJA",
          seqNo: parseInt(order.spare3),
        }),
        url: "queryDataAsync",
      });

      if (response2) {
        if (response2.length > 0) {
          obj2 = response2.find((data) => data.oper_id === "NETEJA");
        }
      }
      setOfDetailData({ produccion: obj1, limpieza: obj2 });
    
    };
    const fetchActualInterruption = async () => {
      const response = await MemoryDatabaseCall({
        params: get_actual_interruption(line.entId),
        url: "queryDataAsync",
      });

      if (response) {
        if (response.length > 0) {
          setActualInterruption(response[0]);
        }
      }
      clearTimeoutActualInterruption = setTimeout(
        fetchActualInterruption,
        globalVariables.intervalTime.midHighFrequency
      );
    };

    const fetchAlertData = async () => {
      let interruptionAlert;
      let qualityAlert;
      let interruptionData;
      let qualityData;

      const interruption_filter = [
    
        {
          filterExpression: null,
          filterItem: {
            column: "EntId",
            dataType: "INT",
            value: line.entId,
            filterItemType: "Equal",
            checkDBNull: false,
          },
        },

        {
          filterExpression: null,
          filterItem: {
            column: "ShiftEndDateTime",
            dataType: "Datetime",
            value: null,
            filterItemType: "null",
            checkDBNull: false,
          },
        },
      ];

      const response = await MemoryDatabaseCall({
        params: pending_interruptions({
          filter: interruption_filter,
        }),
        url: "queryDataFrameDataAsync",
      });

      if (response) {
        if (response.length > 0) {
          interruptionAlert = true;
          interruptionData = response.map((item, i) => ({
            index: i,
            Duration: timeFormating(item.Duration),
            customStartDateTime: dateFormater({
              date: item.StartDateTime,
              type: "hora-fecha",
            }),
            EndDateTime: dateFormater({
              date: item.EndDateTime,
              type: "hora-fecha",
            }),
            Prompt: item.Prompt,
            ID: item.ID,
            ReasonDesc: item.ReasonDesc,
            Comment: item.Comment,
            UtilStateDesc: item.UtilStateDesc,
            ReasonGrpId: item.ReasonGrpId,
            ReasonCd: item.ReasonCd,
            RawReasCd: item.RawReasCd,
            EntId: item.EntId,
            StartDateTime: item.StartDateTime,
          }));
        } else {
          interruptionAlert = false;
          interruptionData = [];
        }
      } else {
        interruptionAlert = false;
        interruptionData = [];
      }

      const filter = [
        {
          filterExpression: null,
          filterItem: {
            column: "ent_id",
            dataType: "INT",
            value: line.entId,
            filterItemType: "Equal",
            checkDBNull: false,
          },
        },
        {
          filterExpression: null,
          filterItem: {
            column: "wo_id",
            dataType: "STRING",
            value: order.woId,
            filterItemType: "Equal",
            checkDBNull: false,
          },
        },
        {
          filterExpression: null,
          filterItem: {
            column: "oper_id",
            dataType: "STRING",
            value: order.operId,
            filterItemType: "Equal",
            checkDBNull: false,
          },
        },
        {
          filterExpression: null,
          filterItem: {
            column: "seq_no",
            dataType: "INT",
            value: order.seqNo,
            filterItemType: "Equal",
            checkDBNull: false,
          },
        },
        {
          filterExpression: null,
          filterItem: {
            column: "item_id",
            dataType: "STRING",
            value: order.itemId,
            filterItemType: "Equal",
            checkDBNull: false,
          },
        },
       
      ];

      const response2 = await MemoryDatabaseCall({
        params: get_pending_samples({ filter }),
        url: "queryDataFrameDataAsync",
      });
      if (response2) {
        if (response2.length > 0) {
          if (response2.length > 0) {
            qualityAlert = true;
            qualityData = response2.map((sample) => ({
              id: sample.sample_id,
              name: sample.sample_name,
              req_time_local: sample.requested_time_local,
              estado: sample.estado,
              status: sample.sample_status,
            }));
          } else {
            qualityAlert = false;
            qualityData = [];
          }
        } else {
          qualityAlert = false;
          qualityData = [];
        }
      }
      setPendingData({
        interruptions: { alert: interruptionAlert, data: interruptionData },
        quality: { alert: qualityAlert, data: qualityData },
      });

      
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
                value: `${line.entName}.Planificada`,
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
      clearTimeoutPlanificate = setTimeout(
        readPlanificateButtonState,
        globalVariables.intervalTime.lowFrequency
      );
    };

    if (line) {
      if (order) {
        fetchSpecs();
        fetchActualInterruption();
        fetchOrderDetail();
        fetchAlertData();
        readPlanificateButtonState();
        clearIntervalOfDetail = setInterval(fetchOrderDetail, 6000);
        clearIntervalAlert = setInterval(fetchAlertData, 6000);
      }
    }

    if (modalJustify) {
      clearTimeout(clearTimeoutActualInterruption);
    }

    if (refreshMain) {
      setRefreshMain(false);
    }
    return () => {
      //ComponentWillUnmount
      setOfDetailData(null);
      clearInterval(clearIntervalOfDetail);
      clearTimeout(clearTimeoutActualInterruption);
      clearInterval(clearIntervalAlert);
      clearTimeout(clearTimeoutPlanificate);
      setPendingData({
        interruptions: { alert: false, data: [] },
        quality: { alert: false, data: [] },
      });

      setGlobalVariables((globalVariables) => {
        return {
          ...globalVariables,
          activeIndexOFDetailPane: 0,
        };
      });
      localStorage.setItem("activeIndexOFDetailPane", 0);
    };
    //eslint-disable-next-line
  }, [modalJustify]);

  useEffect(() => {
    setActivePane(globalVariables.activeIndexOFDetailPane);
  }, [globalVariables]);
  useEffect(() => {
    setActivePane(undefined);
  }, [activePane]);

  const fetchSpecs = async () => {
    let oeeTarget, yellowThreshold;
    const response = await MemoryDatabaseCall({
      params: read_specs(),
      url: "queryDataFrameDataAsync",
    });
    if (response) {
      if (response.responseError) {
      } else {
        const findAmarillo = response.find(
          (el) => el.spec_id === "%amarilloOEE"
        );

        if (findAmarillo) {
          yellowThreshold = parseFloat(findAmarillo.units);
        }
      }
    }
    const filter = {
      filterExpression: null,
      filterItem: {
        column: "ent_id",
        dataType: "INT",
        value: line.entId,
        filterItemType: "Equal",
        checkDBNull: false,
      },
    };
    const response2 = await MemoryDatabaseCall({
      params: oee_targets({ filter }),
      url: "queryDataFrameDataAsync",
    });

    if (response2) {
      if (response2.responseError) {
      } else {
        if (response.length > 0) {
          oeeTarget = response2[0]?.target_oee || null;
        }
      }
    }

    setOeeSpecs({
      oeeTarget,
      yellowThreshold,
    });
  };
  const push =
    actualInterruption &&
    actualInterruption.reas_desc.toLowerCase().includes("paro") &&
    actualInterruption.reas_desc.toLowerCase().includes("pendiente") &&
    actualInterruption.reas_desc.toLowerCase().includes("justificar")
      ? setModalJustify
      : setModalGenerate; */

  return (
    <Container>
      <Box
        sx={{
          maxWidth: { xs: "350px", sm: "600px", md: "900px", lg: "1200px" },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
        >
          {ofDetailNav.map((tab, index) => (
            <Tab label={tab} index={index} />
          ))}
        </Tabs>
      </Box>

      <Container sx={{ m: "auto" }}>
        <Panels value={value} loading={loadingInitialData} />
      </Container>
    </Container>
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
        <Paros />
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
