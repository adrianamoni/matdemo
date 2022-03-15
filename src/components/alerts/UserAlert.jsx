import React from "react";
import { Alert } from "@mui/material";

const UserAlert = ({ severity, message }) => {
  return (
    <Alert variant="filled" severity={severity}>
      {message}
    </Alert>
  );
};

export default UserAlert;
