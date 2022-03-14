import { Card, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import moment from "moment";
import { navigationDataContext } from "../../../context/ContextProvider";

const AutoControles = ({ data, alert }) => {
  const { navigationData, setNavigationData } = useContext(
    navigationDataContext
  );
  let styledAlert = alert
    ? {
        border: "1.5px solid",
        borderColor: "error.main",
        backgroundColor: "background.error",
      }
    : {};

  let qualityData;

  if (data && data.length > 0) {
    let moments = data.map((d) => moment(d.req_time_local)),
      maxDate = moment.max(moments);
    qualityData = maxDate._i;
  }

  return (
    <Card
      sx={{ p: 2, height: "100%", cursor: "pointer", ...styledAlert }}
      onClick={() => setNavigationData({ ...navigationData, activeTab: 6 })}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h6"
            component="h6"
            color={alert && "error"}
          >
            AUTO CONTROLES
          </Typography>
        </Grid>

        <Grid item xs={12} /* sx={{ height: "100%" }} */>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={6} sm={6} md={6} lg={6} align="left">
              <strong>
                Fecha último
                <br />
                auto control
              </strong>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} align="right">
              -
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AutoControles;
