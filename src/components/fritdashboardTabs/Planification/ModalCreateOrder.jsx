import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
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
import UseFetchMemory from "../../customHooks/UseFetchMemory";
import useWindowSize from "../../customHooks/UseWindowsSize";
import Text from "../../../languages/Text";
const ModalCreateOrder = ({ open, close, setRefreshMain }) => {
  const { width } = useWindowSize();
  const [material, setMaterial] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  /*   const [materialOptions, setMaterialOptions] = useState(false); */

  const { loading, data: materialOptions } = UseFetchMemory({
    request: "planification-createorder",
  });
  /*  if (data) {
    setMaterialOptions(data);
  } */
  const handleSubmit = async () => {
    setLoadingSubmit(true);
    console.log("materialOptions", materialOptions);
    console.log("materialOptions2", material);
    const findEl = materialOptions.find((el) => el.itemId === material);
    console.log("materialOptions3", findEl);
    if (findEl) {
      const response = await ApiCall({
        params: create_order_manually({
          item: findEl,
          qtyReqd: cantidad,
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
          msg: Text({ tid: "orderSuccessfullyCreated" }),
          hide: 1,
        });
      }
    }

    setLoadingSubmit(false);
  };

  const handleClose = () => {
    setMaterial("");
    setCantidad("");

    close(false);
  };

  const modalContent = (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: "1em auto",
            width: "30ch",
          },
        }}
        noValidate
        autoComplete="off"
      >
        {loading ? (
          <LinearProgress variant="indetermiante" color="secondary" />
        ) : (
          <>
            <div
              style={{
                display: width > 600 && "flex",
                justifyContent: width > 600 && "center",
              }}
            >
              <TextField
                select
                label="Material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                variant="filled"
              >
                {materialOptions &&
                  materialOptions.map((option) => (
                    <MenuItem key={option.itemId} value={option.itemId}>
                      {option.itemId}({option.itemDesc})
                    </MenuItem>
                  ))}
              </TextField>

              <TextField
                id="outlined-number"
                label={Text({ tid: "qtyToManufacture" })}
                type="number"
                onChange={(e) => setCantidad(e.target.value)}
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
                {Text({ tid: "create" })}
              </LoadingButton>
            </div>
          </>
        )}
      </Box>
    </>
  );

  return (
    <>
      <ModalWidget
        title={"createOrder"}
        open={open}
        close={handleClose}
        content={modalContent}
      />
    </>
  );
};

export default ModalCreateOrder;
