import { Card, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { navigationDataContext } from "../../../context/ContextProvider";

const Paros = ({ alert, data }) => {
  const { navigationData, setNavigationData } = useContext(
    navigationDataContext
  );
  let styledAlert = alert
    ? {
        border: "1.5px solid crimson",
        backgroundColor: "#DC143C10",
      }
    : {};

  return (
    <Card
      sx={{ p: 2, height: "100%", cursor: "pointer", ...styledAlert }}
      onClick={() => setNavigationData({ ...navigationData, activeTab: 7 })}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h6"
            component="h6"
            color={alert && "error"}
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
              -
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Paros;
