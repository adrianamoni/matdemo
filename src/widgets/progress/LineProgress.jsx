import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function LineProgress({ value, height }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={value && value > 100 ? 100 : value || 0}
            sx={{ height: height || "1rem" }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }} textAlign="right">
          <Typography variant="body2" color="text.secondary">
            {value !== undefined ? `${Math.round(value)}%` : ""}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
