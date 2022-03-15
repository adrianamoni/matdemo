import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Text from "../languages/Text";
import {
  Container,
  Grid,
  LinearProgress,
  styled,
  Typography,
} from "@mui/material";

const NoMatch = () => {
  const navigateTo = useNavigate();
  //Redirect
  setTimeout(() => {
    navigateTo("/");
  }, 2000);
  return (
    <Container sx={{ maxWidth: 300, m: "auto" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            {Text({ tid: "notFound" })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="text.main" align="center">
            {Text({ tid: "redirecting" })}...
          </Typography>
          <LinearProgress variant={"indeterminate"} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NoMatch;
