/* import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, Button, Dropdown, Label } from "semantic-ui-react";
import AlertModal from "../../common/alerts/AlertModal";
import { createNotification } from "../../common/alerts/NotificationAlert";
import { LineContext, OfDetailData } from "../../context/ContextProvider";
import {
  tab_quality_generate_sample,
  tab_quality_get_qmspec_by_filter,
} from "../../services/OFservices";
import { ApiCall, MemoryDatabaseCall } from "./../../services/Service"; */

import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import uuid from "react-uuid";
import {
  formContext,
  globalDataContext,
} from "../../../context/ContextProvider";
import Text from "../../../languages/Text";
import { tab_quality_generate_sample } from "../../../services/OFservices";
import { ApiCall } from "../../../services/Service";
import SelectWidget from "../../../widgets/forms/SelectWidget";
import { createNotification } from "../../alerts/NotificationAlert";
import UseFetchMemory from "../../customHooks/UseFetchMemory";

const ModalGenerateSample = ({ setRefreshMain }) => {
  const { globalData } = useContext(globalDataContext);
  const { orderDetails, orderData } = globalData;
  const { productionData } = orderDetails;
  const { itemId } = orderData;
  const { entName } = globalData.lineData;
  const [qmSpec, setQmSpec] = useState();
  const [loadingSubmit, setLoadingSubmit] = useState();
  const { loading, data } = UseFetchMemory({
    request: "quality-qmspec",
    customParams: {
      itemId,
    },
  });
  let processedData;
  if (data) {
    processedData = data.map((item) => ({
      key: uuid(),
      text: item.qm_spec_desc,
      value: item.qm_spec_id,
      name: item.qm_spec_name,
    }));
  }

  const handleGenerateSample = async () => {
    setLoadingSubmit(true);
    const getEl = processedData.find((item) => item.value === qmSpec);
    if (getEl) {
      const response = await ApiCall({
        params: tab_quality_generate_sample({
          itemId: productionData.item_id,
          woId: productionData.wo_id,
          operId: productionData.oper_id,
          entName: entName,
          seqNo: productionData.seq_no,
          qmSpecName: getEl.name,
        }),
      });

      if (response.responseError) {
        setLoadingSubmit(false);
        createNotification({
          status: "error",
          code: response.responseError,
          msg: response.responseMsg,
          hide: response.responseHide,
        });
      } else {
        setLoadingSubmit(false);
        createNotification({
          status: "success",
          msg: "¡Muestra generada correctamente!",
          hide: response.responseHide,
        });
      }
    }
    handleClose();
  };
  const handleClose = () => {
    setRefreshMain(true);
    setQmSpec(null);
    close(false);
  };

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : data ? (
    <Grid container spacing={2} sx={{ width: "20em" }}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Selecciona una muestra</InputLabel>
          <Select
            label="Selecciona una muestra"
            onChange={(e) => setQmSpec(e.target.value)}
            value={qmSpec}
          >
            {processedData &&
              processedData.map((item) => (
                <MenuItem value={item.value}>{item.text}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex" }} justifyContent="flex-end">
        <LoadingButton
          disabled={!qmSpec && qmSpec !== 0}
          onClick={() => handleGenerateSample()}
          variant="contained"
          color="primary"
          loading={loadingSubmit}
        >
          {Text({ tid: "send" })}
        </LoadingButton>
      </Grid>
    </Grid>
  ) : (
    <Grid item xs={12}>
      <Alert variant="outlined" severity="info">
        No hay qmspec definida para este material
      </Alert>
    </Grid>
  );
};
export default ModalGenerateSample;
