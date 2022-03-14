import React, { useState, useContext } from "react";
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
  Toolbar,
  Divider,
  ButtonGroup,
  Button,
  Drawer,
  Tabs,
  Tab,
} from "@mui/material";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import HalfDoughnut from "../widgets/halfDoughnut/HalfDoughnut";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import Timeline from "../widgets/timeline/Timeline";
import Text from "./../languages/Text";
import TabPanel from "./TabPanel";
import { pageSizeContext } from "../context/ContextProvider";
import useWindowSize from "./customHooks/UseWindowsSize";
import General from "./fritdashboardTabs/General";
import Materials from "./fritdashboardTabs/Materials";
import { useParams } from "react-router-dom";
import LineProgress from "../widgets/progress/LineProgress";
import Paros from "./fritdashboardTabs/Paros";
import Consumptions from "./fritdashboardTabs/Consumptions";
import Productions from "./fritdashboardTabs/Productions";

const FritDashboard = () => {
  const { size } = useContext(pageSizeContext);
  let { slug } = useParams();
  const { width } = useWindowSize();

  const ofDetailNav = [
    "General",
    Text({ tid: "signals" }),
    Text({ tid: "parameters" }),
    Text({ tid: "materials" }),
    Text({ tid: "load" }),
    Text({ tid: "consumptions" }),
    Text({ tid: "productions" }),
    Text({ tid: "quality" }),
    Text({ tid: "interruptions" }),
    Text({ tid: "documentation" }),
    Text({ tid: "planification" }),
  ];
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };

  return (
    <Container>
      <Box
        sx={{
          maxWidth: { xs: "350px", sm: "600px", md: "900px", lg: "1200px" },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
        >
          {ofDetailNav.map((tab, index) => (
            <Tab label={tab} index={index} />
          ))}
        </Tabs>
      </Box>

      <Container sx={{ m: "auto" }}>
        <TabPanel value={value} index={0}>
          <General />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Materials />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Consumptions />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Productions />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <Paros />
        </TabPanel>
      </Container>
    </Container>
  );
};

export default FritDashboard;
