import React from "react";
import {
  Container,
  Divider,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import Text from "./../../languages/Text";

const ModalWidget = ({ open, close, title, content, customWidth }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: customWidth,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };
  const handleClose = () => {
    close();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper elevation={24} sx={style}>
        <Typography variant="h5" component="h6" sx={{ mb: 1 }}>
          {Text({ tid: title })}
        </Typography>
        <Divider />
        <Grid container sx={{ mt: 1 }} spacing={2}>
          {content}
        </Grid>
      </Paper>
    </Modal>
  );
};

export default ModalWidget;
