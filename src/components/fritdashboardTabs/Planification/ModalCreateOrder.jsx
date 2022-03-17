import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import uuid from "react-uuid";
import ModalWidget from "../../../widgets/modalWidget/ModalWidget";
import { Box } from "@mui/system";
import { create_order_manually } from "../../../services/serviceHelper";
import { createNotification } from "../../alerts/NotificationAlert";
import { ApiCall } from "../../../services/Service";

const ModalCreateOrder = ({ open, close, setRefreshMain }) => {
  const [material, setMaterial] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [materialOptions, setMaterialOptions] = useState(false);

  const handleSubmit = async () => {
    setLoadingSubmit(true);

    const response = await ApiCall({
      params: create_order_manually({
        item,
        qtyReqd,
      }),
    });
    if (response.responseError) {
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
    } else {
      createNotification({
        status: "success",
        msg: "¡Orden creada con éxito!",
        hide: 1,
      });
    }
    setLoadingSubmit(false);
  };

  const handleClose = () => {
    setMaterial("");
    setCantidad("");
    setCleaningOperId("");
    close(false);
  };

  const modalContent = (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            select
            label="Material"
            value={material}
            onChange={() => setMaterial(e.target.value)}
            variant="filled"
          >
            {materialOptions &&
              materialOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            variant="contained"
            onClick={handleSubmit}
            disabled={!material || !cantidad || loadingSubmit}
            loading={loadingSubmit}
          >
            Crear
          </LoadingButton>
        </div>
      </Box>
    </>
  );

  return (
    <>
      <ModalWidget
        title={"createOrder"}
        open={open}
        close={close}
        content={modalContent}
      />
    </>
  );
};

export default ModalCreateOrder;
