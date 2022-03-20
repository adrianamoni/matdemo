import React, { useContext, useState } from "react";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../../context/ContextProvider";
import { Grid, Divider } from "@mui/material";
import useWindowSize from "./../../customHooks/UseWindowsSize";
import ModalWidget from "./../../../widgets/modalWidget/ModalWidget";
import InputWidget from "./../../../widgets/forms/InputWidget";
import ButtonGroupWidget from "./../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "./../../../languages/Text";
import { ApiCall } from "./../../../services/Service";
import { createNotification } from "./../../alerts/NotificationAlert";
import {
  tab_production_add,
  tab_productions_correction,
  tab_wastage_add,
} from "../../../services/OFservices";

const ProductionsModal = ({
  showModal,
  setShowModal,
  modalContent,
  setRefreshData,
  data,
}) => {
  const windowSize = useWindowSize();

  //useContext
  const { globalData } = useContext(globalDataContext);
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
    setformWidget({
      ...formWidget,
      manualProductionForm: [],
      productionCorrectionForm: [],
      addDecreaseForm: [],
    });
    setShowModal(false);
    setRefreshData(true);
  };

  // MANUAL PRODUCTION
  const handleSubmitManualProduction = async () => {
    setLoading(true);
    const paramObj = {
      woId: data.woId,
      operId: data.operId,
      quantity: formWidget?.manualProductionForm?.quantity
        ? parseFloat(formWidget.manualProductionForm.quantity)
        : null,
      seqNo: data.seqNo,
    };

    const response = await ApiCall({
      params: tab_production_add(paramObj),
    });
    if (response.responseError) {
      setLoading(false);
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
      closeModal();
    } else {
      setLoading(false);
      createNotification({
        status: "success",
        msg: "manualProductionSuccess",
        hide: 1,
      });
      closeModal();
    }
  };

  const manualProductionModalContent = (
    <>
      <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
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
      <Grid container>
        <ButtonGroupWidget
          position="right"
          buttons={[
            {
              text: "cancel",
              color: "primary",
              onClick: () => setShowModal(false),
              disabled: false,
            },
            {
              text: "send",
              color: "secondary",
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
    const paramObj = {
      woId: selectedRows[0].wo_id,
      operId: selectedRows[0].oper_id,
      seqNo: selectedRows[0].seq_no,
      entId: selectedRows[0].ent_id,
      itemId: selectedRows[0].item_id,
      lotNo: selectedRows[0].lot_no,
      toEntName: selectedRows[0].to_ent_name
        ? selectedRows[0].to_ent_name
        : null,
      sublotNo: selectedRows[0].sublot_no ? selectedRows[0].sublot_no : "",
      quantity: parseFloat(formWidget.productionCorrectionForm.quantity),
      rowId: selectedRows[0].row_id,
      lastEditAt: selectedRows[0].last_edit_at,
      createdAtUtc: selectedRows[0].created_at_utc,
    };

    setLoading(true);
    const response = await ApiCall({
      params: tab_productions_correction(paramObj),
    });
    if (response.responseError) {
      setLoading(false);
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
      closeModal();
    } else {
      setLoading(false);
      createNotification({
        status: "success",
        msg: "productionCorrectionSuccess",
        hide: response.responseHide,
      });
      closeModal();
    }
  };

  const productionCorrectionModalContent = (
    <>
      <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
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
      <Grid container>
        <ButtonGroupWidget
          position="right"
          buttons={[
            {
              text: "cancel",
              color: "primary",
              onClick: () => setShowModal(false),
              disabled: false,
            },
            {
              text: "send",
              color: "secondary",
              onClick: handleSubmitProductionCorrection,
              disabled:
                selectedRows &&
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
    setLoading(true);
    const paramObj = {
      woId: data.woId,
      operId: data.operId,
      quantity: parseFloat(formWidget.addDecreaseForm.quantity),
      seqNo: data.seqNo,
    };

    const response = await ApiCall({
      params: tab_wastage_add(paramObj),
    });
    if (response.responseError) {
      setLoading(false);
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
      closeModal();
    } else {
      setLoading(false);
      createNotification({
        status: "success",
        msg: "addWastageSuccess",
        hide: 1,
      });
      closeModal();
    }
  };

  const addDecreaseModalContent = (
    <>
      <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
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
      <Grid container>
        <ButtonGroupWidget
          position="right"
          buttons={[
            {
              text: "cancel",
              color: "primary",
              onClick: () => setShowModal(false),
              disabled: false,
            },
            {
              text: "send",
              color: "secondary",
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
      customWidth={windowSize.width < 820 ? 350 : 800}
    />
  );
};

export default ProductionsModal;
