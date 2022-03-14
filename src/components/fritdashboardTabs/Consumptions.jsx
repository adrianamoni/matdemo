import React, { useContext, useState, useEffect } from "react";
import useWindowSize from "./../customHooks/UseWindowsSize";
import {
  //
  //    LineContext,
  //     OrderContext,
  //     WidgetTableContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../context/ContextProvider";
import { Divider, Grid, Typography } from "@mui/material";
import TableWidget from "./../../widgets/TableWidget/TableWidget";
import ButtonGroupWidget from "./../../widgets/buttonGroup/ButtonGroupWidget";
import InputWidget from "./../../widgets/forms/InputWidget";
import Text from "./../../languages/Text";
import ConsumptionsModal from "./../modals/ConsumptionsModal";

const Consumptions = () => {
  const consumptionTableColumns = [
    {
      field: "material",
      headerName: `${Text({ tid: "material" })}`,
      flex: 1,
    },
    {
      field: "lot_no",
      headerName: `${Text({ tid: "lot" })}`,
      flex: 1,
    },
    {
      field: "qty_cons",
      headerName: `${Text({ tid: "quantity" })}`,
      flex: 1,
    },
  ];

  // const { order } = useContext(OrderContext);
  // const { line } = useContext(LineContext);
  // const { tableVariables, setTableVariables } = useContext(WidgetTableContext);
  const { formWidget, setformWidget } = useContext(formContext);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);

  const [loadingInitialData, setLoadingInitialData] = useState(false);
  //const [apiData, setApiData] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [apiEnrollment, setApiEnrollment] = useState(undefined);

  //   const [consumptionReaderModal, setConsumptionReaderModal] = useState(false);
  //   const [notificationModal, setNotificationModal] = useState(undefined);
  //const [consumptionSelected, setConsumptionSelected] = useState(undefined);
  const [refreshMain, setRefreshMain] = useState(false);
  //   const [page, setPage] = useState(1);

  const ITEMS_PAGE = 10;
  const styledTable = { cursor: "pointer" };

  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     let clearTimeoutKey;

  //     const fetchData = async (showLoader) => {
  //       showLoader && setLoadingInitialData(true);

  //       const response = await MemoryDatabaseCall({
  //         params: tab_consumptions({
  //           entId: line.entId,
  //           woId: order.woId,
  //           operId: order.operId,
  //           seqNo: order.seqNo,
  //         }),
  //         url: "queryDataAsync",
  //       });
  //       if (response) {
  //         const res = response.map((item, i) => ({
  //           ...item,
  //           index: i + 1,
  //           id: uuid(),
  //         }));
  //         setApiData(res);
  //       }
  //       setLoadingInitialData(false);
  //       clearTimeoutKey = setTimeout(
  //         fetchData,
  //         30000
  //         //globalVariables.intervalTime.highFrequency
  //       );
  //     };

  //     fetchData(true);
  //     refreshMain && setRefreshMain(false);
  //     return () => {
  //       clearTimeout(clearTimeoutKey);
  //       setTableVariables({ ...tableVariables, ConsumptionsTable: false });
  //       setApiData(undefined);
  //     };
  //     //eslint-disable-next-line
  //   }, [refreshMain]);

  //   useEffect(() => {
  //     apiData && apiData.length < 1
  //       ? setNotificationModal({
  //           status: "info" /* HARDCODED */,
  //           msg: "No hay consumos actualmente",
  //           hide: 0,
  //           type: "screen",
  //           size: "large",
  //         })
  //       : setNotificationModal(undefined);
  //   }, [apiData]);

  const apiData = [
    {
      wo_id: "OFALEIX28012022AC",
      oper_id: "TRENENVA",
      seq_no: 0,
      item_id: "i12",
      item_desc: "itemupdated",
      qty_cons: 1.167,
      lot_no: "1",
      sublot_no: null,
      reas_cd: 5,
      reas_desc: "Good Consumption",
      item_scrapped: false,
      from_ent_id: null,
      ent_id: 6,
      storage_ent_id: null,
      last_edit_at: "2022-02-28T07:47:46",
      row_id: 242,
      index: 1,
      id: "ed0d5fd-ffa3-42bb-da77-2a06ff741d2f",
    },
    {
      wo_id: "OFALEIX28012022AC",
      oper_id: "TRENENVA",
      seq_no: 0,
      item_id: "000000000000075840",
      item_desc: "NUECES GRANO CHILE DESEMBALADAS",
      qty_cons: 700,
      lot_no: "900473-0011",
      sublot_no: null,
      reas_cd: 5,
      reas_desc: "Good Consumption",
      item_scrapped: false,
      from_ent_id: 37,
      ent_id: 6,
      storage_ent_id: null,
      last_edit_at: "2022-02-28T07:47:26",
      row_id: 241,
      index: 2,
      id: "2c78a01-ab8c-3afd-fb4d-4f7507dcf335",
    },
    {
      wo_id: "OFALEIX28012022AC",
      oper_id: "TRENENVA",
      seq_no: 0,
      item_id: "i12",
      item_desc: "itemupdated",
      qty_cons: 1.167,
      lot_no: "1",
      sublot_no: null,
      reas_cd: 5,
      reas_desc: "Good Consumption",
      item_scrapped: false,
      from_ent_id: null,
      ent_id: 6,
      storage_ent_id: null,
      last_edit_at: "2022-02-24T12:51:02",
      row_id: 240,
      index: 3,
      id: "8cca43-5b87-6365-384e-a0423a3a28d6",
    },
  ];

  const consumptionData = apiData.map((el) => {
    return {
      material: el.item_id + " (" + el.item_desc + ")",
      wo_id: el.wo_id,
      oper_id: el.oper_id,
      seq_no: el.seq_no,
      item_id: el.item_desc,
      item_desc: el.item_desc,
      qty_cons: el.qty_cons,
      lot_no: el.lot_no,
      sublot_no: el.sublot_no,
      reas_cd: el.reas_cd,
      reas_desc: el.reas_cd,
      item_scrapped: el.item_scrapped,
      from_ent_id: el.from_ent_id,
      ent_id: el.ent_id,
      storage_ent_id: el.storage_ent_id,
      last_edit_at: el.last_edit_at,
      row_id: el.row_id,
      index: el.index,
      id: el.id,
    };
  });

  const consumptionRenderData = apiData.map((el) => {
    return {
      material: el.item_id + " (" + el.item_desc + ")",
      lot: el.lot_no,
      quantity: el.qty_cons,
      wo_id: el.wo_id,
      oper_id: el.oper_id,
      seq_no: el.seq_no,
      item_id: el.item_desc,
      item_desc: el.item_desc,
      qty_cons: el.qty_cons,
      lot_no: el.lot_no,
      sublot_no: el.sublot_no,
      reas_cd: el.reas_cd,
      reas_desc: el.reas_cd,
      item_scrapped: el.item_scrapped,
      from_ent_id: el.from_ent_id,
      ent_id: el.ent_id,
      storage_ent_id: el.storage_ent_id,
      last_edit_at: el.last_edit_at,
      row_id: el.row_id,
      index: el.index,
      id: el.id,
    };
  });

  //useEffect on change selected row
  useEffect(() => {
    if (
      selectedRowsIds["consumptions"] &&
      selectedRowsIds["consumptions"].length > 0
    ) {
      let tempRow = consumptionRenderData.filter((consumption) => {
        return consumption.id === selectedRowsIds["consumptions"][0];
      });
      setSelectedRows(tempRow);
    }
  }, [selectedRowsIds]);

  const handleConsumptionCorrection = () => {
    setformWidget({
      ...formWidget,
      consumptionCorrectionForm: {
        consumptionCorrectionMaterial: selectedRows[0].item_desc,
        consumptionCorrectionLot: selectedRows[0].lot_no,
        consumptionCorrectionQty: selectedRows[0].qty_cons,
      },
    });
    setModalContent("consumptionCorrection");
    setShowModal(true);
  };

  // CONSUME
  const handleConsume = () => {
    setModalContent("consume");
    setShowModal(true);
  };

  const handleReadEnrollment = async () => {
    // if (matricula === undefined || matricula === "") {
    //   setErrorMatricula({ state: true, msg: "Debes introducir una matrícula" });
    // } else {
    //   setErrorMatricula({ state: false, msg: "" });
    //   setLoadingRead(true);
    //   const response = await ApiCall({
    //     params: tab_materials_read_enrollment({
    //       matricula,
    //     }),
    //   });
    //   if (response.responseError) {
    //     setLoadingRead(false);
    //     setNotificationModal({
    //       status: "error",
    //       code: response.responseError,
    //       msg: response.responseMsg,
    //       hide: response.responseHide,
    //     });
    //   } else {
    //     setLoadingRead(false);
    //     setApiEnrollment(response.responseData);
    //   }
    // }
  };

  const handleLoad = async () => {};

  const consumeModalContent = (
    <>
      <Typography variant="h6" gutterBottom>
        <strong>{Text({ tid: "consume" })}</strong>
      </Typography>
      <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <InputWidget
            formId={"consumeForm"}
            id={"consumeRegistration"}
            label={<Text tid={"registration"} />}
            required={true}
            multiline={false}
            type="text"
            maxLength={100}
            disabled={false}
            placeholder={
              formWidget?.consumeForm?.consumeRegistration
                ? ""
                : "Introduzca matrícula"
            }
            min={null}
            max={null}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <ButtonGroupWidget
            position="left"
            buttons={[
              {
                text: "readRegistration",
                color: "success",
                onClick: handleReadEnrollment,
                disabled: apiEnrollment ? false : true,
              },
            ]}
            loading={loading}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <InputWidget
            formId={"consumeForm"}
            id={"consumeMaterial"}
            label={<Text tid={"material"} />}
            required={false}
            multiline={false}
            type="text"
            maxLength={100}
            disabled={false}
            placeholder={""}
            min={null}
            max={null}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <InputWidget
            formId={"consumeForm"}
            id={"consumeQty"}
            label={<Text tid={"quantity"} />}
            required={false}
            multiline={false}
            type="number"
            maxLength={100}
            disabled={false}
            placeholder={""}
            min={0}
            max={1 ^ 10}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputWidget
            formId={"consumeForm"}
            id={"consumeLot"}
            label={<Text tid={"lot"} />}
            required={false}
            multiline={false}
            type="text"
            maxLength={100}
            disabled={false}
            placeholder={""}
            min={null}
            max={null}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputWidget
            formId={"consumeForm"}
            id={"consumeExpiration"}
            label={<Text tid={"expiration"} />}
            required={false}
            multiline={false}
            type="text"
            maxLength={100}
            disabled={false}
            placeholder={""}
            min={null}
            max={null}
          />
        </Grid>
      </Grid>
      <Grid container>
        <ButtonGroupWidget
          position="right"
          buttons={[
            {
              text: "loadMachine",
              color: "primary",
              onClick: handleLoad,
              disabled: apiEnrollment ? false : true,
            },
          ]}
          loading={loading}
        />
      </Grid>
    </>
  );
  const notificationModalContent = <></>;

  return loadingInitialData ? (
    <p>loading TODO</p>
  ) : (
    <>
      {/* Consumpions Table */}
      <Grid container sx={{ width: "100%", marginTop: "1rem" }}>
        {apiData && apiData.length > 0 ? (
          <Grid
            container
            item
            sx={{
              margin: 0,
              alignItems: "center",
            }}
          >
            <Grid item xs={12} md={12}>
              <TableWidget
                data={consumptionRenderData}
                columns={consumptionTableColumns}
                multipleSelection={false}
                tableName="consumptions"
              />
            </Grid>
          </Grid>
        ) : (
          TODO
        )}
      </Grid>
      {/* Buttons */}
      <Grid container>
        <Grid
          container
          item
          sx={{
            margin: 2,
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={12}>
            <ButtonGroupWidget
              position="right"
              buttons={[
                {
                  text: "consumptionCorrection",
                  color: "grey",
                  onClick: handleConsumptionCorrection,
                  disabled: selectedRows?.[0] ? false : true,
                },
                {
                  text: "consume",
                  color: "grey",
                  onClick: handleConsume,
                  disabled: false,
                },
              ]}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Others */}
      <ConsumptionsModal modalContent={modalContent} showModal={showModal} />
    </>
  );
};

export default Consumptions;
