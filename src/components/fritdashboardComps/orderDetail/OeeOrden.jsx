import { Grid, Typography } from "@mui/material";
import React from "react";
import HalfDoughnut from "../../../widgets/halfDoughnut/HalfDoughnut";

const OeeOrden = () => {
  return (
    <>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Typography align="center" variant="h6" component="h6">
            OEE ORDEN
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <HalfDoughnut value={[78]} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OeeOrden;
