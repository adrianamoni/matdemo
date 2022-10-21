import { Box, Button } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
const CustomStepper = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   flex: 1,
          width: "70%",
        }}
      >
        <Box sx={{ paddingRight: "20px" }}>
          <Button
            startIcon={<CheckIcon />}
            variant={"text"}
            sx={{ color: "green" }}
          >
            EMI001 Semielaborado 1
          </Button>
        </Box>
        <Box sx={{ display: "flex", flex: 1 }}>
          <Box></Box>
          <Box sx={{ borderTop: "1px solid #000", flex: 1 }}></Box>
        </Box>
        <Box
          sx={{ paddingLeft: "20px", display: "flex", flexDirection: "column" }}
        >
          <Button variant={"text"} startIcon={<PlayArrowIcon />}>
            Limpieza
          </Button>
          <Button variant={"text"}>Cambio</Button>
        </Box>
        {/* <Box sx={{ display: "flex", flex: 1 }}>
          <Box></Box>
          <Box
            sx={{ borderTop: "1px solid #000", flex: 1 }}
          ></Box>
        </Box>
        <Box>4</Box> */}
      </Box>
    </>
  );
};

export default CustomStepper;
