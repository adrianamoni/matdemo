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
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Toolbar,
  Divider,
  CardActionArea,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import HalfDoughnut from "../widgets/halfDoughnut/HalfDoughnut";
import { blue, green, orange, red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import Text from "./../languages/Text";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const CardItem = ({ color, line }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const randomNumber = Math.random() * 100;

  return (
    <Card>
      <CardActionArea>
        <StyledLink to={`/frit-dashboard/${line}`}>
          <CardHeader
            component="div"
            sx={{ bgcolor: color, color: "#eee", mb: 2 }}
            title={line}
          />
          <HalfDoughnut value={[randomNumber.toFixed(2)]} />
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  <strong>{Text({ tid: "product" })}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h8" gutterBottom>
                  000000000003452612 (BOB.CASERAS 170G 412 MM)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  <strong>{Text({ tid: "order" })}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h8" gutterBottom>
                  OFFRIT015306363
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </StyledLink>
      </CardActionArea>
    </Card>
  );
};

const Dashboard = () => {
  const [activePage, setActivePage] = useState(1);

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          <Grid
            container
            item
            spacing={3}
            xs={12}
            sm={12}
            md={12}
            lg={4}
            justifyContent={"center"}
          >
            <Grid item>
              <CardItem color={blue[600]} line="L001" />
            </Grid>
            <Grid item>
              <CardItem color={green[600]} line="L001" />
            </Grid>
            <Grid item>
              <CardItem color={orange[600]} line="L001" />
            </Grid>
          </Grid>
          {/* <Divider orientation="vertical" /> */}
          <Grid
            container
            item
            spacing={3}
            xs={12}
            sm={12}
            md={12}
            lg={4}
            justifyContent={"center"}
          >
            <Grid item>
              <CardItem color={blue[600]} line="L002" />
            </Grid>
            <Grid item>
              <CardItem color={green[600]} line="L002" />
            </Grid>
            <Grid item>
              <CardItem color={orange[600]} line="L002" />
            </Grid>
          </Grid>
          <Grid
            container
            item
            spacing={3}
            xs={12}
            sm={12}
            md={12}
            lg={4}
            justifyContent={"center"}
          >
            <Grid item>
              <CardItem color={blue[600]} line="L003" />
            </Grid>
            <Grid item>
              <CardItem color={red[600]} line="L003" />
            </Grid>
            <Grid item>
              <CardItem color={orange[600]} line="L003" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
