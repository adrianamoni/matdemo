import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackBar = ({ snackBarAlert, setSnackBarAlert }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarAlert({
      open: false,
      message: "",
      severity: "",
    });
  };

  return (
    <>
      <Snackbar
        open={snackBarAlert.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ width: "100%" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarAlert.severity}
          sx={{ width: "100%" }}
        >
          {snackBarAlert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomSnackBar;
