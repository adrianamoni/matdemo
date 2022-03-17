import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ApiCall } from "../../../services/Service";
import { write_tags } from "../../../services/serviceHelper";

const LineStatusButton = ({ lineName, planificatedButton }) => {
  const [loading, setLoading] = useState(false);
  const [localPlanificated, setLocalPlanificated] = useState(undefined);

  const handlePlanificateClick = async (change) => {
    setLoading(true);
    const tags_arr = [
      {
        TagName: `${lineName}.Planificada`,
        Value: change ? 1 : 0,
      },
    ];

    const response = await ApiCall({
      params: write_tags({ tags_arr }),
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
      if (response.responseCode === "0") {
        setLoading(false);
        setLocalPlanificated(change);
      }
    }
  };

  const stateButton =
    localPlanificated !== undefined
      ? localPlanificated
        ? true
        : false
      : planificatedButton
      ? true
      : false;

  return (
    <StateButton
      state={stateButton}
      handleClick={handlePlanificateClick}
      loading={loading}
    />
  );
};

const StateButton = ({ state, handleClick, loading /*  disabled */ }) => {
  return (
    <LoadingButton
      fullWidth
      sx={{
        backgroundColor: state ? "success.main" : "error.main",
        color: state ? "#111" : "eee",
      }}
      onClick={() => handleClick(state ? false : true)}
      loading={loading}
    >
      <Typography variant="h6">
        {state ? "MÁQUINA ACTIVA" : "MÁQUINA INACTIVA"}
      </Typography>
    </LoadingButton>
  );
};

export default LineStatusButton;
