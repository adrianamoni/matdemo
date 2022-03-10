import Timeline from "../widgets/timeline/Timeline";
import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import HalfDoughnut from "../widgets/halfDoughnut/HalfDoughnut";
import LineProgress from "../widgets/progress/LineProgress";

const Charts = () => {
  const data = [[14], [36], [88]];

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Semi Donut
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ mb: 3 }}>
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

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Timeline
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Paper elevation={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Timeline />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Progress
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LineProgress value={12} />
            </Grid>
            <Grid item xs={12}>
              <LineProgress indeterminate={true} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Charts;
