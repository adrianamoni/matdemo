import {
  Alert,
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
import { globalDataContext } from "../../../context/ContextProvider";
import Text from "../../../languages/Text";
import { tab_quality_generate_sample } from "../../../services/OFservices";
import { ApiCall } from "../../../services/Service";
import ButtonGroupWidget from "../../../widgets/buttonGroup/ButtonGroupWidget";
import ModalWidget from "../../../widgets/modalWidget/ModalWidget";
import { createNotification } from "../../alerts/NotificationAlert";
import UseFetchMemory from "../../customHooks/UseFetchMemory";

const ModalGenerateSample = ({ showModal, setShowModal, setRefreshMain }) => {
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
          msg: "sampleSuccess",
          hide: response.responseHide,
        });
      }
    }
    handleClose();
  };
  const handleClose = () => {
    setRefreshMain(true);
    setQmSpec(null);
    setShowModal(false);
  };
  const modalContent = loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : data ? (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>{Text({ tid: "selectSample" })}</InputLabel>
          <Select
            label={Text({ tid: "selectSample" })}
            onChange={(e) => setQmSpec(e.target.value)}
            value={qmSpec}
          >
            {processedData &&
              processedData.map((item, i) => (
                <MenuItem key={i} value={item.value}>
                  {item.text}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex" }} justifyContent="flex-end">
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
              onClick: handleGenerateSample,
              disabled: !qmSpec && qmSpec !== 0,
            },
          ]}
          loading={loadingSubmit}
        />
      </Grid>
    </>
  ) : (
    <Grid item xs={12}>
      <Alert variant="outlined" severity="info">
        {Text({ tid: "noQmspec" })}
      </Alert>
    </Grid>
  );

  return (
    <ModalWidget
      open={showModal}
      close={handleClose}
      content={modalContent}
      title={"registerTest"}
    />
  );
};
export default ModalGenerateSample;
