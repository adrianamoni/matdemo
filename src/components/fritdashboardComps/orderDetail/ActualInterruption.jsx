import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import React from "react";
import { getColorFromBackend } from "./helper";

const ActualInterruption = ({ interruption, push }) => {
  const { background, foreground } = getColorFromBackend({
    microparo: interruption.EsMicroparo,
    decFormatColor: interruption.EsMicroparo
      ? interruption.colorFiltroMicroparo
      : interruption.color,
  });
  return interruption ? (
    <LoadingButton
      fullWidth
      sx={{
        backgroundColor: background,
      }}
      onClick={() => push(true)}
    >
      <Typography
        sx={{
          color: foreground,
        }}
        variant="h6"
      >
        {interruption.EsMicroparo
          ? "MICROPARO"
          : `${interruption.reas_grp_desc} -
                    ${interruption.reas_desc}`}
      </Typography>
    </LoadingButton>
  ) : (
    <></>
  );
};

export default ActualInterruption;
