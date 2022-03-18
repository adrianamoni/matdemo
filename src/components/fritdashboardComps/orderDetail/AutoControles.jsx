import { Card, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import moment from "moment";
import {
  globalDataContext,
  navigationDataContext,
} from "../../../context/ContextProvider";
import { dateFormater } from "./helper";
import Text from "../../../languages/Text";

const AutoControles = ({ data, alert }) => {
  const { navigationData, setNavigationData } = useContext(
    navigationDataContext
  );
  const { globalData } = useContext(globalDataContext);
  const { pendingSamples } = globalData;

  let samplesData;
  if (pendingSamples && pendingSamples.data.length > 0) {
    let moments = data.map((d) => moment(d.req_time_local)),
      maxDate = moment.max(moments);
    samplesData = maxDate._i;
  }

  let styledAlert = alert
    ? {
        border: "1.5px solid",

        borderColor: "error.main",
        backgroundColor: "background.error",
      }
    : {};

  return (
    <Card
      sx={{
        p: 2,
        height: "100%",
        cursor: "pointer",
        backgroundColor: "background.grey4",
        ...styledAlert,
      }}
      className={alert && "blinking-effect-red"}
      onClick={() => setNavigationData({ ...navigationData, activeTab: 6 })}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h6"
            component="h6"
            color={alert && "error"}
            sx={{ borderRadius: "3px" }}
            className="title"
          >
            {Text({ tid: "selfControls" })}
          </Typography>
        </Grid>

        <Grid item xs={12} /* sx={{ height: "100%" }} */>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={6} sm={6} md={6} lg={6} align="left">
              <strong>{Text({ tid: "lastSelfControlDate" })}</strong>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} align="right">
              {samplesData
                ? dateFormater({ date: samplesData, type: "hora-fecha" })
                : "-"}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AutoControles;
