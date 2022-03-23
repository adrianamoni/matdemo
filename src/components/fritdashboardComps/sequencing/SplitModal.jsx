import { LoadingButton } from "@mui/lab";
import { Button, Grid, Input, Slider } from "@mui/material";
import React, { useState, useEffect } from "react";
import Text from "../../../languages/Text";
import { ApiCall } from "../../../services/Service";
import { split_operation } from "../../../services/serviceHelper";
import ButtonGroupWidget from "../../../widgets/buttonGroup/ButtonGroupWidget";
import ModalWidget from "../../../widgets/modalWidget/ModalWidget";
import { createNotification } from "../../alerts/NotificationAlert";
import useWindowSize from "../../customHooks/UseWindowsSize";

const SplitModal = ({ open, close, ofSelected, setRefreshMain }) => {
  const windowSize = useWindowSize();
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(0);
  const [qtyMax, setQtyMax] = useState(undefined);

  useEffect(() => {
    ofSelected && setQtyMax(ofSelected.QtyReqd);
    return () => {
      setQtyMax(undefined);
    };
  }, [ofSelected]);

  const handleSliderChange = (event, newValue) => {
    setQty(newValue);
  };

  const handleInputChange = (event) => {
    setQty(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await ApiCall({
      params: split_operation({
        woId: ofSelected.WoId,
        operId: ofSelected.OperId,
        seqNo: ofSelected.SeqNo,
        splitQty: qty,
      }),
    });
    if (response.responseError) {
      setLoading(false);
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
    } else {
      setLoading(false);
      createNotification({
        status: "success",
        msg: "splitSuccess",
        hide: response.responseHide,
      });
    }
    setRefreshMain(true);
    handleClose();
  };

  const handleClose = () => {
    close(false);
    setQty(0);
  };
  const modalContent = (
    <>
      <Grid container spacing={4} alignItems="center" sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Grid container colSpacing={2} textAlign="center">
            <Grid item xs={3}>
              <span>0</span>
            </Grid>
            <Grid item xs={6}>
              <Slider value={qty} onChange={handleSliderChange} />
            </Grid>
            <Grid item xs={3}>
              <Input
                value={qty}
                size="small"
                onChange={handleInputChange}
                /* onBlur={handleBlur} */
                inputProps={{
                  step: 1,
                  min: 0,
                  max: qtyMax,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} textAlign="right">
          <ButtonGroupWidget
            position="right"
            buttons={[
              {
                text: "cancel",
                color: "primary",
                onClick: handleClose,
                disabled: false,
              },
              {
                text: "send",
                color: "secondary",
                disabled: !qty,
                onClick: handleSubmit,
              },
            ]}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
  return (
    <ModalWidget
      title="splitOrder"
      open={open}
      close={close}
      content={modalContent}
      customWidth={windowSize.width < 620 ? 350 : 800}
    />
  );
};

export default SplitModal;
