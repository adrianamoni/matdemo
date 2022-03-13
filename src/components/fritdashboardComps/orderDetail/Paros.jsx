import { Grid, Typography } from "@mui/material";
import React from "react";

const Paros = () => {
  return (
    <>
      <Grid container sx={{display:'flex'}}>
        <Grid item xs={12}>
          <Typography align="center" variant="h6" component="h6">
            PAROS
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems="center">
            <Grid item xs={6} sm={6} md={6} lg={6} align="left">
              Paros pendientes
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} align="right">
              -
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Paros;
