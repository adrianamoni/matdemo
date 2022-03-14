import { Grid, Typography } from "@mui/material";
import React from "react";

const Paros = () => {
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={12}>
        <Typography align="center" variant="h6" component="h6">
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
  );
};

export default Paros;
