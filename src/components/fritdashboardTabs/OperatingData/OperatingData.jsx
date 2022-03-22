import { Alert, Box, Grid, LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import Text from "../../../languages/Text";

const OperatingData = () => {
  const externalUrl = "http://192.168.9.128:8000/en-US/app/MES/dashboards";
  useEffect(() => {
    setTimeout(() => {
      window.location.href = externalUrl;
    }, 2000);
  }, []);
  const alertText = Text({ tid: "redirectingToExternal" });
  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: 4, paddingRight: 3 }}
      id="frit-tab-component"
    >
      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="indeterminate" color="info" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Alert variant="filled" severity="info">
          {alertText}
        </Alert>
      </Grid>
    </Grid>
  );
};

export default OperatingData;
