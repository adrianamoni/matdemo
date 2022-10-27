import React, { useState, useEffect, useContext } from "react";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { globalDataContext } from "../../context/ContextProvider";
import { propsByState } from "../../helpers/props";

const CustomStepper = ({ setActive, lastCleaningData }) => {
  const { globalData } = useContext(globalDataContext);
  const { orderDetails /* , lastCleaningData */ } = globalData;
  const [orderBackground, setorderBackground] = useState("#cecece");
  const [cleaningBackground, setCleaningBackground] = useState("#cecece");

  const CleaningButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(
      lastCleaningData?.backgroundColor
        ? lastCleaningData?.backgroundColor
        : "#cecece"
    ),
    backgroundColor: lastCleaningData?.backgroundColor
      ? lastCleaningData?.backgroundColor
      : "#cecece",
    "&:hover": {
      backgroundColor: lastCleaningData?.backgroundColor
        ? lastCleaningData?.backgroundColor
        : "#cecece",
    },
  }));
  const OrderButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orderBackground),
    backgroundColor: orderBackground,
    "&:hover": {
      backgroundColor: orderBackground,
    },
  }));
  const DisabledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#7d7d7d"),
    backgroundColor: "#7d7d7d",
    "&:hover": {
      backgroundColor: "#7d7d7d",
    },
  }));

  useEffect(() => {
    const { background } = propsByState({
      prodState: orderDetails?.productionData?.state_cd,
      cleanState: null,
    });
    setorderBackground(background);
  }, [orderDetails]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   flex: 1,
          // width: "70%",
        }}
      >
        <Box sx={{ paddingRight: "20px" }}>
          <OrderButton
            startIcon={<CheckIcon />}
            variant={"contained"}
            onClick={() => {
              setActive("oee");
            }}
          >
            {`${orderDetails?.productionData?.item_id.slice(-6)} ${
              orderDetails?.productionData?.item_desc
            }`}
          </OrderButton>
        </Box>
        <Box sx={{ display: "flex", /* flex: 1, */ marginLeft: "-20px" }}>
          <Box></Box>
          <Box
            sx={{
              borderTop: "1px solid #76767680",
              // flex: 1,
              display: "flex",
              minWidth: "30px",
              maxWidth: "50px",
            }}
          ></Box>
        </Box>
        <Box sx={{ minHeight: "85px", marginTop: "3px" }}>
          <Box sx={{ height: "25px" }}></Box>
          <Box
            sx={{
              borderTop: "1px solid #76767680",
              borderLeft: "1px solid #76767680",
              flex: 1,
              display: "flex",
              width: "20px",
              height: "25px",
            }}
          ></Box>
          <Box sx={{ borderLeft: "1px solid #76767680", height: "25px" }}></Box>
          <Box
            sx={{
              borderTop: "1px solid #76767680",
              flex: 1,
              display: "flex",
              width: "20px",
              height: "25px",
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            // paddingLeft: "20px",
            display: "flex",
            flexDirection: "column",
            // borderLeft: "1px solid #000",
          }}
        >
          <CleaningButton
            sx={{
              margin: "0px",
              marginLeft: 0,
              marginBottom: "14px",
            }}
            variant={"outlined"}
            startIcon={<PlayArrowIcon />}
            onClick={() => {
              setActive("limpieza");
            }}
          >
            Limpieza
          </CleaningButton>
          <DisabledButton
            sx={{
              margin: "0px",
              marginLeft: 0,
            }}
            startIcon={<WatchLaterIcon fontSize={"small"} />}
            disabled
          >
            Cambio
          </DisabledButton>
        </Box>
      </Box>
    </>
  );
};

export default CustomStepper;
