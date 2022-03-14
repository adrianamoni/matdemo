import React, { useState, useEffect, useContext } from "react";
import { Container, Grid, Segment, Tab } from "semantic-ui-react";
import { panes } from "./Paneles";
import { MemoryDatabaseCall } from "./../../services/Service";
import {
  OfDetailData,
  GlobalVariablesContext,
  OrderContext,
  LineContext,
  OeeSpecsContext,
  PendingContext,
  PageSizeContext,
} from "../../context/ContextProvider";
import {
  get_order_details,
  get_pending_samples,
  oee_targets,
  read_specs,
} from "../../services/OFservices";
import {
  get_actual_interruption,
  pending_interruptions,
} from "../../services/Interruptions";
import { read_tags_teams } from "../../services/serviceHelper";
import GenerateInterruptionModal from "../Interruptions/GenerateInterruptionModal";
import { getColorFromBackend } from "./helper";
import LineStatusButton from "../../common/LineStatusButton ";

import JustifyInterruptionOFModal from "../../common/modals/JustifyInterruptionOFModal";
import { dateFormater, timeFormating } from "../../common/helpers/helper";
import ActualInterruption from "../../common/ActualInterruption";

function OrderDetailGateway() {
  /**
   * Context variables
   */
  const { order } = useContext(OrderContext);
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
        /*  params: get_order_detail(cleaning_filters),
        url: "queryDataFrameDataAsync", */
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
      /* clearTimeoutOfDetail = setTimeout(
        () => fetchOrderDetail(),
        6000
        //globalVariables.intervalTime.midHighFrequency
      ); */
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
        /* {
          filterExpression: null,
          filterItem: {
            column: "Prompt",
            dataType: "Bit",
            value: true,
            filterItemType: "Equal",
            checkDBNull: false,
          },
        }, */
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
        /* {
          filterExpression: null,
          filterItem: {
            column: "Autocontrol",
            dataType: "STRING",
            value: "L", //hardcoded, dejar así
            filterItemType: "NotEqual",
            checkDBNull: false,
          },
        }, */
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

      /*   clearTimeoutAlert = setTimeout(
        () => fetchAlertData(),
        6000
        //globalVariables.intervalTime.midHighFrequency
      ); */
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
      : setModalGenerate;
  return (
    <>
      <Container fluid>
        <Segment.Group
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
        </Segment.Group>

        {ofDetailData && (
          <Tab
            panes={panes({ pendingData, order })}
            defaultActiveIndex={0}
            activeIndex={activePane}
            className="scrollbar-tabs"
          />
        )}
      </Container>
      <GenerateInterruptionModal
        modalGenerate={modalGenerate}
        setModalGenerate={setModalGenerate}
      />
      <JustifyInterruptionOFModal
        interruptionSelected={actualInterruption}
        modalJustify={modalJustify}
        setModalJustify={setModalJustify}
      />
    </>
  );
}

export default OrderDetailGateway;
