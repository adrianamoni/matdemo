import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import HalfDoughnut from "../widgets/halfDoughnut/HalfDoughnut";

const Charts = () => {
  const data = [[24], [36], [68]];
  const data2 = [[4], [53], [97]];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Semi Donut
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={2}>
            <Grid container spacing={2}>
              {data.map((item) => (
                <Grid item xs={12} md={4}>
                  <HalfDoughnut value={item} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom>
        Timeline
      </Typography>

      <Paper elevation={2}>
        <Grid container spacing={2}>
          {data2.map((item) => (
            <Grid item xs={12} md={4}>
              <HalfDoughnut value={item} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default Charts;
