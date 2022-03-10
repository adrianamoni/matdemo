import React from "react";
import { Modal, Paper } from "@mui/material";

const ModalWidget = ({ open, close, content, customWidth }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: customWidth,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper elevation={24} sx={style}>
        {content}
      </Paper>
    </Modal>
  );
};

export default ModalWidget;
