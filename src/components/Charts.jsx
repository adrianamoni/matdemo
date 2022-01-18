import { Grid, Typography } from "@mui/material";
import React from "react";
import HalfDoughnutChart from "./HalfDoughnutChart";

const Charts = () => {
  const data = [
    [
      { name: "Group A", value: 4000 },
      { name: "Group B", value: 300 },
    ],
    [
      { name: "Group A", value: 200 },
      { name: "Group B", value: 300 },
    ],
  ];

  return (
    <div>
      <Typography component="h4" variant="h4">
        Charts
      </Typography>
      <Grid>
        <Grid item xs={12}>
          {data.map((item) => (
            <HalfDoughnutChart data={item} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Charts;
