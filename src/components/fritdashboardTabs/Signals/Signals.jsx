import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { colorModeContext } from "../../../context/ContextProvider";
import WindowIcon from "@mui/icons-material/Window";
import CropDinIcon from "@mui/icons-material/CropDin";
import Variables from "./Variables";
import VariablesProceso from "./VariablesProceso";
function TabPanel(props) {
  const { children, value, index } = props;

  return value === index ? <Container>{children}</Container> : <></>;
}

const Signals = () => {
  const { colorMode, setColorMode } = useContext(colorModeContext);

  let loading;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <Grid container>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="Variables" icon={<CropDinIcon />} iconPosition="start" />
          <Tab
            label="Variables de Proceso"
            icon={<WindowIcon />}
            iconPosition="start"
            disabled
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Variables />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VariablesProceso disabled />
      </TabPanel>
    </Grid>
  );
};

export default Signals;
