import { Grid, Typography } from "@mui/material";
import React from "react";

const AutoControles = () => {
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={12}>
        <Typography align="center" variant="h6" component="h6">
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
  );
};

export default AutoControles;
