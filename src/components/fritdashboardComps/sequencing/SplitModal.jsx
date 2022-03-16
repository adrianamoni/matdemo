import { Grid, Input, Slider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ApiCall } from "../../../services/Service";
import { split_operation } from "../../../services/serviceHelper";
import ModalWidget from "../../../widgets/modalWidget/ModalWidget";
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
        msg: "¡Operación dividida correctamente!",
        hide: response.responseHide,
      });
    }
    setRefreshMain(true);
  };

  const handleClose = () => {
    close(false);
    setQty(0);
  };
  const modalContent = (
    <>
      <Grid container spacing={2} alignItems="center" sx={{ p: 3 }}>
        <Grid item>
          <span>0</span>
        </Grid>
        <Grid item xs>
          <Slider value={qty} onChange={handleSliderChange} />
        </Grid>
        <Grid item>
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

  {
    /*      
       
            <Form style={{ fontSize: "1.4em" }}>
              <Form.Group style={{ placeContent: "center" }}>
                <Label
                  style={{
                    placeSelf: "center",
                    fontSize: "1.1em",
                    marginBottom: "-20px",
                  }}
                >
                  0
                </Label>
                <Form.Input
                  label={
                    <Input
                      size="mini"
                      label="Cantidad"
                      type="number"
                      min="0"
                    
                      onChange={(e, d) => setQty(d.value)}
                      value={qty}
                    />
                  }
                  min={0}
                  max={qtyMax}
                  name="cantidad"
                  onChange={handleChange}
                  step={qtyMax > 1000 ? 100 : qtyMax > 100 ? 10 : 1}
                  width={14}
                  type="range"
                  value={qty}
                />
                <Label
                  style={{
                    placeSelf: "center",
                    fontSize: "1.1em",
                    marginBottom: "-20px",
                  }}
                >
                  {qtyMax}
                </Label>
               
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            disabled={!qty || qty === "0"}
            primary
            onClick={handleSubmit}
            loading={loading}
          >
            Enviar
          </Button>
        </Modal.Actions>
      </Modal> */
  }
};

export default SplitModal;
