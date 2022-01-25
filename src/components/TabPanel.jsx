import React from "react";
import { Box } from "@mui/material";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{ flexGrow: 1 }}
    >
      {value === index && children}
    </Box>
  );
};

export default TabPanel;
