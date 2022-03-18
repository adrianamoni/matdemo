import React, { useContext, useState } from "react";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../../context/ContextProvider";
import { Grid, Divider, InputLabel, TextField } from "@mui/material";
import useWindowSize from "./../../customHooks/UseWindowsSize";
import ModalWidget from "./../../../widgets/modalWidget/ModalWidget";
import InputWidget from "./../../../widgets/forms/InputWidget";
import ButtonGroupWidget from "./../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "./../../../languages/Text";
import { ApiCall } from "./../../../services/Service";
import { createNotification } from "./../../alerts/NotificationAlert";
import {
  tab_consumptions_correction,
  tab_materials_read_enrollment,
  tab_consumptions_consume,
} from "../../../services/OFservices";

const ConsumptionsModal = ({
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
  const [readLot, setReadLot] = useState(undefined);
  const [material, setMaterial] = useState(undefined);
  const [expiration, setExpiration] = useState(undefined);
  const [quantity, setQuantity] = useState(undefined);
  const [apiEnrollment, setApiEnrollment] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [notificationModal, setNotificationModal] = useState({});

  const closeModal = () => {
    setSelectedRowsIds({ consumptions: [] });
    setSelectedRows([]);
    setformWidget({
      ...formWidget,
      consumptionCorrectionForm: [],
      consumeForm: [],
    });
    setShowModal(false);
    setRefreshData(true);
  };

  // CONSUMPTION CORRECTION
  const handleSubmitConsumptionCorrection = async () => {
    console.log("selectedRows[0]", selectedRows[0]);
    const result = {
      woId: woId,
      operId: operId,
      seqNo: seqNo,
      entId: selectedRows[0].ent_id,
      fromEntId: selectedRows[0].from_ent_id,
      itemId: selectedRows[0].item_id,
      lotNo: selectedRows[0].lot_no,
      sublotNo:
        selectedRows[0].sublot_no != null ? selectedRows[0].sublot_no : "",
      quantity: parseFloat(formWidget.consumptionCorrectionForm.quantity),
      rowId: selectedRows[0].row_id,
    };
    setLoading(true);
    const response = await ApiCall({
      params: tab_consumptions_correction(result),
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
        msg: Text({ tid: "consumptionCorrection" }),
        hide: response.responseHide,
      });
      closeModal();
    }
  };

  const consumCorrectionModalContent = (
    <>
      <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
      <Grid item md={8} xs={12}>
        <InputWidget
          formId={"consumptionCorrectionForm"}
          id={"material"}
          label={<Text tid={"material"} />}
          required={false}
          multiline={false}
          type="text"
          maxLength={100}
          disabled={true}
          placeholder={""}
          min={null}
          max={null}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <InputWidget
          formId={"consumptionCorrectionForm"}
          id={"lot"}
          label={<Text tid={"lot"} />}
          required={false}
          multiline={false}
          type="text"
          maxLength={100}
          disabled={true}
          placeholder={""}
          min={null}
          max={null}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <InputWidget
          formId={"consumptionCorrectionForm"}
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
              text: "send",
              color: "primary",
              onClick: handleSubmitConsumptionCorrection,
              disabled:
                selectedRows.length > 0 &&
                parseInt(formWidget?.consumptionCorrectionForm?.quantity) ===
                  selectedRows[0].qty_cons
                  ? true
                  : false,
            },
          ]}
          loading={loading}
        />
      </Grid>
    </>
  );

  // CONSUME
  const handleReadEnrollment = async (e) => {
    if (e.key === "Enter") {
      if (!readLot) {
        //setErrorMatricula({ state: true, msg: "Debes introducir una matrícula" });
      } else {
        //setErrorMatricula({ state: false, msg: "" });
        setLoading(true);
        let matricula = readLot.toUpperCase();
        const response = await ApiCall({
          params: tab_materials_read_enrollment({
            matricula,
          }),
        });
        if (response.responseError) {
          setLoading(false);
          setNotificationModal({
            status: "error",
            code: response.responseError,
            msg: response.responseMsg,
            hide: response.responseHide,
          });
        } else {
          setLoading(false);
          setMaterial(response.responseData.ItemDesc);
          setExpiration(response.responseData.ExpiryDate);
          setQuantity(response.responseData.Qty);
          setApiEnrollment(response.responseData);
        }
      }
    }
  };

  const handleChangeQty = (e) => {
    if (e.target.value > 0 && e.target.value <= apiEnrollment.Qty) {
      setQuantity(e.target.value);
    } else {
    }
  };
  const handleConsume = async () => {
    const result = {
      woId: woId,
      operId: operId,
      seqNo: seqNo,
      quantity: parseFloat(quantity),
      itemId: apiEnrollment.ItemId,
      lotNo: apiEnrollment.LotNo,
      subLotNo: apiEnrollment.SubLotNo != null ? apiEnrollment.SubLotNo : "",
      lotNr: apiEnrollment.LotNo,
    };
    setLoading(true);
    const response = await ApiCall({
      params: tab_consumptions_consume(result),
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
        msg: Text({ tid: "consumptionSubmited" }),
        hide: response.responseHide,
      });
      closeModal();
    }
  };

  const consumeModalContent = (
    <>
      <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
      <Grid item md={6} xs={12}>
        <InputLabel required={true}>
          <Text tid={"lot"} />
        </InputLabel>
        <TextField
          required={true}
          id={`consumeForm-textField-lot-label`}
          value={readLot}
          onChange={(e) => {
            setReadLot(e.target.value);
          }}
          onKeyDown={handleReadEnrollment}
          fullWidth
          disabled={false}
          placeholder={readLot ? "" : "Introduzca lote"}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <InputLabel required={false}>
          <Text tid={"material"} />
        </InputLabel>
        <TextField
          required={false}
          id={`consumeForm-textField-material-label`}
          value={material}
          onChange={(e) => {
            setMaterial(e.target.value);
          }}
          fullWidth
          disabled={true}
          placeholder={""}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <InputLabel required={false}>
          <Text tid={"expiration"} />
        </InputLabel>
        <TextField
          required={false}
          id={`consumeForm-textField-expiration-label`}
          value={expiration}
          onChange={(e) => {
            setExpiration(e.target.value);
          }}
          fullWidth
          disabled={true}
          placeholder={""}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <InputLabel required={false}>
          <Text tid={"quantity"} />
        </InputLabel>
        <TextField
          required={false}
          id={`consumeForm-textField-quantity-label`}
          value={quantity}
          onChange={handleChangeQty}
          fullWidth
          disabled={false}
          placeholder={""}
          type="number"
        />
      </Grid>
      <Grid container>
        <ButtonGroupWidget
          position="right"
          buttons={[
            {
              text: "consume",
              color: "primary",
              onClick: handleConsume,
              disabled: apiEnrollment ? false : true,
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
        modalContent === "consumptionCorrection"
          ? "consumptionCorrection"
          : "consume"
      }
      open={showModal}
      close={closeModal}
      content={
        modalContent === "consumptionCorrection"
          ? consumCorrectionModalContent
          : consumeModalContent
      }
      customWidth={windowSize.width < 820 ? 350 : 800}
    />
  );
};

export default ConsumptionsModal;
