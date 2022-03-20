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
    bgcolor: "background.grey3",
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h6">
              {Text({ tid: title })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{ mt: 1 }} spacing={2}>
              {content}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default ModalWidget;
