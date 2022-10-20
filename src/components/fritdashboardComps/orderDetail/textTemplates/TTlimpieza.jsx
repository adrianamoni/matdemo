import { Grid } from "@mui/material";
import React from "react";
import Text from "../../../../languages/Text";
import { getCleaningText, timeFormating } from "../helper";
import LastCleaning from "../LastCleaning";

const TTlimpieza = ({ cleaningData, processedOrderTime, width }) => {
  return (
    <Grid container item rowSpacing={1} columnSpacing={2} alignItems="stretch">
      <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
        <Grid container rowSpacing={2} textAlign="left" sx={{ p: 2 }}>
          <Grid item xs={6}>
            <strong>{Text({ tid: "description" })}</strong>
          </Grid>
          <Grid item xs={6} textAlign="right">
            {cleaningData.DuracionJob === "0"
              ? Text({ tid: "noCleaning" })
              : getCleaningText(cleaningData.job_desc)}
          </Grid>
          <Grid item xs={6}>
            <strong>{Text({ tid: "time" })}</strong>
          </Grid>
          <Grid item xs={6} textAlign="right">
            {cleaningData.DuracionJob
              ? timeFormating(cleaningData.DuracionJob * 60)
              : "0 min"}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
        <Grid
          container
          textAlign="center"
          sx={{
            p: 2,
            height: "100%",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={12}
            textAlign={width > 1536 ? "center" : "left"}
          >
            <strong>{Text({ tid: "timeRemaining" })}</strong>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={12}
            textAlign={width > 1536 ? "center" : "right"}
          >
            {processedOrderTime?.text || "-"}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
        <Grid
          container
          rowSpacing={2}
          textAlign="left"
          alignItems={"center"}
          sx={{
            p: 2,
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LastCleaning />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TTlimpieza;
