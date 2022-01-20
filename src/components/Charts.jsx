import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import HalfDoughnutApex from "./HalfDoughnutApex";

const Charts = () => {
  const data = [
    [24, 55, 41, 17, 95],
    [44, 553, 69, 17, 75],
    [454, 545, 41, 67, 35],
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Semi Donut
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={2}>
            {/*  <Typography component="h4" variant="h4">
              Recharts
            </Typography>
            <Grid item container spacing={2}>
              {data.map((item) => (
                <Grid item xs={12} md={4}>
                  <HalfDoughnutRecharts data={item} />
                </Grid>
              ))}
            </Grid> */}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={2}>
            <Grid container spacing={2}>
              {data.map((item) => (
                <Grid item xs={12} md={4}>
                  <HalfDoughnutApex series={item} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="h3" gutterBottom>
        Timeline
      </Typography>
      <Paper elevation={2}>
        {/*  <Typography component="h4" variant="h4">
          Recharts
        </Typography>
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={12} md={4}>
              <HalfDoughnutRecharts data={item} />
            </Grid>
          ))}
        </Grid> */}
      </Paper>
      <Paper elevation={2}>
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={12} md={4}>
              <HalfDoughnutApex series={item} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default Charts;
