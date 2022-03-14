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
import {
  tab_consumptions_correction,
  tab_materials_read_enrollment,
} from "../../services/OFservices";
import { createNotification } from "./../alerts/NotificationAlert";

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
  const [apiEnrollment, setApiEnrollment] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [notificationModal, setNotificationModal] = useState({});

  const closeModal = () => {
    setSelectedRowsIds({ consumptions: [] });
    setSelectedRows([]);
    setShowModal(false);
  };

  // CONSUMPTION CORRECTION
  const handleSubmit = async () => {
    const result = {
      woId: woId,
      operId: operId,
      seqNo: seqNo,
      entId: selectedRows[0].ent_id,
      fromEntId: selectedRows[0].from_ent_id
        ? selectedRows[0].from_ent_id
        : null,
      itemId: selectedRows[0].item_id,
      lotNo: selectedRows[0].lot_no,
      sublotNo: selectedRows[0].sublot_no ? selectedRows[0].sublot_no : "",
      quantity: parseFloat(formWidget?.consumptionCorrectionForm?.quantity),
      rowId: selectedRows[0].row_id ? selectedRows[0].row_id : "",
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
        msg: "¡Consumo corregido con éxito!",
        hide: response.responseHide,
      });
      closeModal();
      setRefreshData(true);
    }
  };

  const consumCorrectionModalContent = (
    <>
      <Typography variant="h6" gutterBottom>
        <strong>{Text({ tid: "consumptionCorrection" })}</strong>
      </Typography>
      <Divider sx={{ marginTop: "25px", marginBottom: "25px" }} />
      <Grid container spacing={2}>
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
      </Grid>
      <Grid container>
        <ButtonGroupWidget
          position="right"
          buttons={[
            {
              text: "send",
              color: "primary",
              onClick: handleSubmit,
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
  const handleReadEnrollment = async () => {
    if (!formWidget?.consumeForm?.registration) {
      //setErrorMatricula({ state: true, msg: "Debes introducir una matrícula" });
    } else {
      //setErrorMatricula({ state: false, msg: "" });
      setLoading(true);
      let matricula = formWidget.consumeForm.registration.toUpperCase();
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
        setApiEnrollment(response.responseData);
      }
    }
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
            id={"registration"}
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
                color: "primary",
                onClick: handleReadEnrollment,
                disabled: false,
              },
            ]}
            loading={loading}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <InputWidget
            formId={"consumeForm"}
            id={"material"}
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
            id={"quantity"}
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
            id={"lot"}
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
            id={"expiration"}
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

  return (
    <ModalWidget
      open={showModal}
      close={closeModal}
      content={
        modalContent === "consumptionCorrection"
          ? consumCorrectionModalContent
          : consumeModalContent
      }
      customWidth={windowSize.width < 620 ? 350 : 800}
    />
  );
};

export default ConsumptionsModal;
