import React, { useContext, useState } from "react";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../context/ContextProvider";
import { Typography, Grid, Divider } from "@mui/material";
import useWindowSize from "./../customHooks/UseWindowsSize";
import ModalWidget from "./../../widgets/modalWidget/ModalWidget";
import InputWidget from "./../../widgets/forms/InputWidget";
import ButtonGroupWidget from "./../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "./../../languages/Text";
import { ApiCall } from "./../../services/Service";
import { tab_productions_correction } from "../../services/OFservices";

const ProductionsModal = ({
  showModal,
  setShowModal,
  modalContent,
  setRefreshData,
}) => {
  const windowSize = useWindowSize();

  //useContext
  const { globalData } = useContext(globalDataContext);
  const { woId, operId, seqNo } = globalData.orderData;
  const { formWidget, setformWidget } = useContext(formContext);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);
  //useState
  const [loading, setLoading] = useState(false);
  const [notificationModal, setNotificationModal] = useState({});

  const closeModal = () => {
    setSelectedRowsIds({ productions: [] });
    setSelectedRows([]);
    setShowModal(false);
    setRefreshMain(true);
  };

  // MANUAL PRODUCTION
  const handleSubmitManualProduction = async () => {
    // setLoading(true);
    // const paramObj = {
    //   woId: data.woId,
    //   operId: data.operId,
    //   quantity: qty ? parseFloat(qty) : null,
    //   seqNo: data.seqNo,
    // };
    // const response = await ApiCall({
    //   params: tab_production_add(paramObj),
    // });
    // if (response.responseError) {
    //   setLoading(false);
    //   createNotification({
    //     status: "error",
    //     code: response.responseError,
    //     msg: response.responseMsg,
    //     hide: response.responseHide,
    //   });
    //   handleClose();
    // } else {
    //   setLoading(false);
    //   createNotification({
    //     status: "success",
    //     msg: "¡Producción manual realizada correctemente!",
    //     hide: 1,
    //   });
    //   handleClose();
    // }
  };

  const manualProductionModalContent = (
    <>
      {/* <Typography variant="h6" gutterBottom>
        <strong>{Text({ tid: "manualProduction" })}</strong>
      </Typography> */}
      <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <InputWidget
            formId={"manualProductionForm"}
            id={"quantity"}
            label={<Text tid={"quantity"} />}
            required={true}
            multiline={false}
            type="number"
            maxLength={100}
            disabled={false}
            placeholder={""}
            min={0}
            max={null}
          />
        </Grid>
      </Grid>
      <Grid container>
        <ButtonGroupWidget
          position="right"
          buttons={[
            {
              text: "send",
              color: "primary",
              onClick: handleSubmitManualProduction,
              disabled: formWidget?.manualProductionForm?.quantity
                ? false
                : true,
            },
          ]}
          loading={loading}
        />
      </Grid>
    </>
  );

  // PRODUCTION CORRECTION
  const handleSubmitProductionCorrection = async () => {
    // const result = {
    //   woId: selectedRows[0].wo_id,
    //   operId: selectedRows[0].oper_id,
    //   seqNo: selectedRows[0].seq_no,
    //   entId: selectedRows[0].ent_id,
    //   itemId: selectedRows[0].item_id,
    //   lotNo: selectedRows[0].lot_no,
    //   toEntName: selectedRows[0].to_ent_name
    //     ? selectedRows[0].to_ent_name
    //     : null,
    //   sublotNo: selectedRows[0].sublot_no ? selectedRows[0].sublot_no : "",
    //   quantity: parseFloat(formWidget?.manualProductionForm?.quantity),
    //   rowId: selectedRows[0].row_id,
    //   lastEditAt: selectedRows[0].last_edit_at,
    //   createdAtUtc: selectedRows[0].created_at_utc,
    // };
    // setLoading(true);
    // const response = await ApiCall({
    //   params: tab_productions_correction(result),
    // });
    // if (response.responseError) {
    //   setLoading(false);
    //   createNotification({
    //     status: "error",
    //     code: response.responseError,
    //     msg: response.responseMsg,
    //     hide: response.responseHide,
    //   });
    //   closeModal();
    // } else {
    //   setLoading(false);
    //   createNotification({
    //     status: "success",
    //     msg: "¡Producción corregida con éxito!",
    //     hide: response.responseHide,
    //   });
    //   closeModal();
    // }
  };

  const productionCorrectionModalContent = (
    <>
      {/* <Typography variant="h6" gutterBottom>
        <strong>{Text({ tid: "productionCorrection" })}</strong>
      </Typography> */}
      <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <InputWidget
            formId={"productionCorrectionForm"}
            id={"material"}
            label={<Text tid={"material"} />}
            required={false}
            multiline={false}
            type="text"
            maxLength={100}
            disabled={true}
            placeholder={""}
            min={0}
            max={null}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <InputWidget
            formId={"productionCorrectionForm"}
            id={"lot"}
            label={<Text tid={"lot"} />}
            required={false}
            multiline={false}
            type="text"
            maxLength={100}
            disabled={true}
            placeholder={""}
            min={0}
            max={null}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputWidget
            formId={"productionCorrectionForm"}
            id={"quantity"}
            label={<Text tid={"quantity"} />}
            required={true}
            multiline={false}
            type="number"
            maxLength={100}
            disabled={false}
            placeholder={""}
            min={0}
            max={null}
          />
        </Grid>
      </Grid>
      <Grid container>
        <ButtonGroupWidget
          position="right"
          buttons={[
            {
              text: "send",
              color: "primary",
              onClick: handleSubmitProductionCorrection,
              disabled:
                selectedRows.length > 0 &&
                parseInt(formWidget?.productionCorrectionForm?.quantity) ===
                  selectedRows[0].qty_prod,
            },
          ]}
          loading={loading}
        />
      </Grid>
    </>
  );

  // PRODUCTION DECREASE
  const handleSubmitProductionDecrease = async () => {
    // setLoading(true);
    // const paramObj = {
    //   woId: data.woId,
    //   operId: data.operId,
    //   quantity: parseFloat(qty),
    //   seqNo: data.seqNo,
    // };
    // const response = await ApiCall({
    //   params: tab_wastage_add(paramObj),
    // });
    // if (response.responseError) {
    //   setLoading(false);
    //   createNotification({
    //     status: "error",
    //     code: response.responseError,
    //     msg: response.responseMsg,
    //     hide: response.responseHide,
    //   });
    //   closeModal();
    // } else {
    //   setLoading(false);
    //   createNotification({
    //     status: "success",
    //     msg: "¡Merma añadida correctemente!",
    //     hide: 1,
    //   });
    //   closeModal();
    // }
  };

  const addDecreaseModalContent = (
    <>
      {/* <Typography variant="h6" gutterBottom>
        <strong>{Text({ tid: "addDecrease" })}</strong>
      </Typography> */}
      <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <InputWidget
            formId={"addDecreaseForm"}
            id={"quantity"}
            label={<Text tid={"quantity"} />}
            required={true}
            multiline={false}
            type="number"
            maxLength={100}
            disabled={false}
            placeholder={""}
            min={0}
            max={null}
          />
        </Grid>
      </Grid>
      <Grid container>
        <ButtonGroupWidget
          position="right"
          buttons={[
            {
              text: "send",
              color: "primary",
              onClick: handleSubmitProductionDecrease,
              disabled: formWidget?.addDecreaseForm?.quantity ? false : true,
            },
          ]}
          loading={loading}
        />
      </Grid>
    </>
  );

  return (
    <ModalWidget
      title={
        modalContent === "manualProduction"
          ? "manualProduction"
          : modalContent === "productionCorrection"
          ? "productionCorrection"
          : "addDecrease"
      }
      open={showModal}
      close={closeModal}
      content={
        modalContent === "manualProduction"
          ? manualProductionModalContent
          : modalContent === "productionCorrection"
          ? productionCorrectionModalContent
          : addDecreaseModalContent
      }
      customWidth={windowSize.width < 620 ? 350 : 800}
    />
  );
};

export default ProductionsModal;
