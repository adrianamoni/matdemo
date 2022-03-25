import React, { useState, useContext } from "react";

import { LinearProgress, MenuItem, TextField } from "@mui/material";
import ModalWidget from "../../../widgets/modalWidget/ModalWidget";
import { Box } from "@mui/system";
import { create_order_manually } from "../../../services/serviceHelper";
import { createNotification } from "../../alerts/NotificationAlert";
import { ApiCall } from "../../../services/Service";
import UseFetchMemory from "../../customHooks/UseFetchMemory";

import Text from "../../../languages/Text";
import ButtonGroupWidget from "../../../widgets/buttonGroup/ButtonGroupWidget";
import { pageSizeContext } from "../../../context/ContextProvider";
const ModalCreateOrder = ({ open, close, setRefreshMain }) => {
  const { pageSize } = useContext(pageSizeContext);
  const { width } = pageSize;
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
    const findEl = materialOptions.find((el) => el.itemId === material);
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
          msg: "orderSuccessfullyCreated",
          hide: 1,
        });
      }
    }
    handleClose();
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
          <LinearProgress variant="indeterminate" color="secondary" />
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
                    text: "create",
                    color: "secondary",
                    disabled: !material || !cantidad || loadingSubmit,
                    onClick: handleSubmit,
                  },
                ]}
                loading={loadingSubmit}
              />
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
