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

import { Alert, Button, Container, Grid, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import {
  formContext,
  globalDataContext,
} from "../../../context/ContextProvider";
import Text from "../../../languages/Text";
import SelectWidget from "../../../widgets/forms/SelectWidget";
import UseFetchMemory from "../../customHooks/UseFetchMemory";

const ModalGenerateSample = () => {
  const { globalData } = useContext(globalDataContext);
  const { itemId } = globalData.orderData;

  const { formWidget, setformWidget } = useContext(formContext);
  const generateSample = formWidget;

  const { loading, data } = UseFetchMemory({
    request: "quality-qmspec",
    customParams: {
      itemId,
    },
  });
  let processedData;
  if (data) {
    processedData = data.map((item) => ({
      key: item.qm_spec_id,
      text: item.qm_spec_desc,
      value: item.qm_spec_id,
    }));
  }
  /*  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [apiData, setApiData] = useState(undefined);
  const [typeOptions, setTypeOptions] = useState(undefined);
  const [descSelected, setDescSelected] = useState(undefined);
  const { line } = useContext(LineContext);
  const { ofDetailData } = useContext(OfDetailData);
  const [notificationModal, setNotificationModal] = useState({}); */

  /* useEffect(() => {
    open && ofDetailData && ofDetailData.produccion && fetchData();
    //eslint-disable-next-line
  }, [open]); */

  /*  useEffect(() => {
    apiData &&
      setTypeOptions(
        apiData.map((item) => ({
          key: item.qm_spec_id,
          text: item.qm_spec_desc,
          value: item.qm_spec_id,
        }))
      );
  }, [apiData]);

  const fetchData = async () => {
    const response2 = await MemoryDatabaseCall({
      params: tab_quality_get_qmspec_by_filter({
        itemId: ofDetailData.produccion.item_id,
      }),
      url: "queryDataAsync",
    });
    if (response2) {
      if (response2.responseError) {
      } else {
        if (response2.length > 0) {
          setApiData(response2);
        } else {
          setNotificationModal({
            status: "info",
            msg: "No hay qmspec definida para este material",
            hide: 0,
            size: "large",
          });
        }
      }
    }
  };

  const handleGenerateSample = async () => {
    setLoadingSubmit(true);
    let value;
    let qm_spec_name;

    if (descSelected) {
      value = typeOptions.find((el) => el.value === descSelected).value;
      qm_spec_name = apiData.find(
        (item) => item.qm_spec_id === value
      ).qm_spec_name;
    } else {
      value = typeOptions[0].value;
      qm_spec_name = apiData.find(
        (item) => item.qm_spec_id === value
      ).qm_spec_name;
    }

    const obj = {
      itemId: ofDetailData.produccion.item_id,
      woId: ofDetailData.produccion.wo_id,
      operId: ofDetailData.produccion.oper_id,
      entName: line.entName,
      seqNo: ofDetailData.produccion.seq_no,
      qmSpecName: qm_spec_name,
    };

    const response = await ApiCall({
      params: tab_quality_generate_sample(obj),
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
    handleClose();
  };

  const handleClose = () => {
    setRefreshMain(true);
    setDescSelected(undefined);
    setNotificationModal({});
    close(false);
  };

  const handleChange = (e, { searchQuery, value }) => {
    setDescSelected(value);
  }; */
  let disableSubmit = true;
  if (formWidget.generateSample) {
    if (formWidget.generateSample.sample) {
      disableSubmit = false;
    }
  }

  const handleSubmit = () => {};

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : data ? (
    <>
      <Grid item xs={12}>
        <SelectWidget
          formId={"generateSample"}
          id={"sample"}
          label={"Selecciona una muestra"} //LANG
          options={processedData}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex" }} justifyContent="flex-end">
        <Button
          disabled={disableSubmit}
          /* onClick={handleSubmit} */
          onClick={() => doSomething(2)}
          variant="contained"
          color="primary"
        >
          {Text({ tid: "send" })}
        </Button>
      </Grid>
    </>
  ) : (
    <Grid item xs={12}>
      <Alert variant="outlined" severity="info">
        No hay qmspec definida para este material
      </Alert>
    </Grid>
  );
};
export default ModalGenerateSample;
