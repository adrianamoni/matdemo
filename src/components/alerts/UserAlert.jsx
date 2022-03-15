import React from "react";
import { Alert } from "@mui/material";

const UserAlert = ({ severity, message }) => {
  return (
    <Alert variant="filled" severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  );
};

export default UserAlert;
