import React, { useContext, useState, useEffect } from "react";
import {
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../context/ContextProvider";
import { Typography, Grid } from "@mui/material";
import useWindowSize from "./../customHooks/UseWindowsSize";
import InputWidget from "./../../widgets/forms/InputWidget";
import ButtonGroupWidget from "./../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "./../../languages/Text";

const ConsumptionsModal = ({ modalContent, showModal }) => {
  const windowSize = useWindowSize();

  const { formWidget, setformWidget } = useContext(formContext);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const closeModal = () => {
    setSelectedRowsIds({ consumptions: [] });
    setSelectedRows([]);
    setShowModal(false);
    setRefreshMain(true);
  };

  // CONSUMPTION CORRECTION
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
            id={"consumptionCorrectionMaterial"}
            label={<Text tid={"material"} />}
            required={true}
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
            formId={"consumptionCorrectionForm"}
            id={"consumptionCorrectionLot"}
            label={<Text tid={"lot"} />}
            required={true}
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
            formId={"consumptionCorrectionForm"}
            id={"consumptionCorrectionQty"}
            label={<Text tid={"quantity"} />}
            required={true}
            multiline={false}
            type="number"
            maxLength={100}
            disabled={false}
            placeholder={""}
            min={0}
            max={1 ^ 10}
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
                parseInt(
                  formWidget?.consumptionCorrectionForm
                    ?.consumptionCorrectionQty
                ) === selectedRows[0].qty_cons
                  ? true
                  : false,
            },
          ]}
          loading={loading}
        />
      </Grid>
    </>
  );

  const handleSubmit = async () => {
    // const result = {
    //   woId: order.woId,
    //   operId: order.operId,
    //   seqNo: order.seqNo,
    //   entId: selectedRows[0].ent_id,
    //   fromEntId: selectedRows[0].from_ent_id
    //     ? selectedRows[0].from_ent_id
    //     : null,
    //   itemId: selectedRows[0].item_id,
    //   lotNo: selectedRows[0].lot_no,
    //   sublotNo: selectedRows[0].sublot_no
    //     ? selectedRows[0].sublot_no
    //     : "",
    //   quantity: parseFloat(qty),
    //   rowId: selectedRows[0].row_id ? selectedRows[0].row_id : "",
    // };
    // setLoading(true);
    // const response = await ApiCall({
    //   params: tab_consumptions_correction(result),
    // });
    // if (response.responseError) {
    //   setLoading(false);
    //   createNotification({
    //     status: "error",
    //     code: response.responseError,
    //     msg: response.responseMsg,
    //     hide: response.responseHide,
    //   });
    //   close(false);
    // } else {
    //   setLoading(false);
    //   createNotification({
    //     status: "success",
    //     msg: "¡Consumo corregido con éxito!",
    //     hide: response.responseHide,
    //   });
    //   close(false);
    // }
    // setRefreshMain(true);
  };

  return (
    <ModalWidget
      open={showModal}
      close={closeModal}
      content={
        modalContent === "consumptionCorrection"
          ? consumCorrectionModalContent
          : modalContent === "consume"
          ? consumeModalContent
          : notificationModalContent
      }
      customWidth={windowSize.width < 620 ? 350 : 800}
    />
  );
};

export default ConsumptionsModal;
