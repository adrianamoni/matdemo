import { Card, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext } from "react";
import {
  globalDataContext,
  navigationDataContext,
} from "../../../context/ContextProvider";

const Paros = ({ alert, data }) => {
  const { navigationData, setNavigationData } = useContext(
    navigationDataContext
  );
  const { globalData } = useContext(globalDataContext);
  const { pendingInterruptions } = globalData;

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
        backgroundColor: "background.grey4",
        cursor: "pointer",
        ...styledAlert,
      }}
      className={alert && "blinking-effect-red"}
      onClick={() => setNavigationData({ ...navigationData, activeTab: 7 })}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h6"
            component="h6"
            color={alert && "error"}
            className="title"
          >
            PAROS
          </Typography>
        </Grid>

        <Grid item xs={12} /* sx={{ height: "100%" }} */>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={6} sm={6} md={6} lg={6} align="left">
              <strong>Paros pendientes</strong>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} align="right">
              {pendingInterruptions?.data.length || "-"}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Paros;
