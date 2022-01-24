import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  Container,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const [activePage, setActivePage] = useState(1);

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={4}>
              <Item>Item</Item>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Item>Item</Item>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Item>Item</Item>
            </Grid>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={4}>
              <Item>Item</Item>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Item>Item</Item>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Item>Item</Item>
            </Grid>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={4}>
              <Item>Item</Item>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Item>Item</Item>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Item>Item</Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
