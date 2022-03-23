import { Alert, Box, Button, Grid, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Text from "../../../languages/Text";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
const OperatingData = () => {
  const [redirecting, setRedirecting] = useState(true);

  const externalUrl = "http://192.168.9.128:8000/en-US/app/MES/dashboards";
  useEffect(() => {
    setRedirecting(true);
    let clearKey = setTimeout(() => {
      window.open(externalUrl, "_blank");
      setTimeout(() => setRedirecting(false), 500);
    }, 2000); //2000

    return () => {
      clearTimeout(clearKey);
    };
  }, []);
  const alertText = redirecting;

  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: 2, paddingRight: 3 }}
      id="frit-tab-component"
    >
      <Grid item xs={12} sx={{ minHeight: 20 }}>
        {redirecting && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="indeterminate" color="info" />
          </Box>
        )}
      </Grid>
      {redirecting ? (
        <Grid item xs={12}>
          <Alert variant="filled" severity={"info"}>
            {Text({ tid: "redirectingToExternal" })}
          </Alert>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={9}>
              <Alert
                variant="filled"
                severity={"success"}
                sx={{ minHeight: 51 }}
              >
                {Text({ tid: "redirectedToExternal" })}
              </Alert>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="info"
                sx={{ minHeight: 50 }}
                endIcon={<OpenInNewIcon />}
                onClick={() => {
                  window.open(externalUrl, "_blank");
                }}
              >
                {Text({ tid: "openManually" })}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default OperatingData;
/*   action={
            !redirecting && (
              <Button
                color="primary"
                size="small"
                variant="outlined"
                onClick={() => {
                  window.open(externalUrl, "_blank");
                }}
              >
                Open manually  
              </Button>
            )
          } */
