import React, { useState } from "react";
import { Box, Container, LinearProgress } from "@mui/material";

import Variables from "./Variables";

function TabPanel(props) {
  const { children, value, index } = props;

  return value === index ? <Container>{children}</Container> : <></>;
}

const Signals = () => {
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
    <>
      {/* <Grid container>
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
      <TabPanel value={value} index={0}> */}
      <Variables />
      {/*  </TabPanel>
      <TabPanel value={value} index={1}>
        <VariablesProceso disabled />
      </TabPanel>
    </Grid> */}
    </>
  );
};

export default Signals;
