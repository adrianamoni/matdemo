import { Grid, Typography } from "@mui/material";
import React from "react";
import HalfDoughnut from "../../../widgets/halfDoughnut/HalfDoughnut";

const OeeOrden = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography align="center" variant="h6" component="h6">
          OEE ORDEN
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <HalfDoughnut value={[78]} />
      </Grid>
    </>
  );
};

export default OeeOrden;
