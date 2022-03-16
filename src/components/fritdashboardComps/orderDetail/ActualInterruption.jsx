import { LoadingButton } from "@mui/lab";
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
      <span
        style={{
          color: foreground,
        }}
      >
        {interruption.EsMicroparo
          ? "MICROPARO"
          : `${interruption.reas_grp_desc} -
                    ${interruption.reas_desc}`}
      </span>
    </LoadingButton>
  ) : (
    <></>
  );
};

export default ActualInterruption;
