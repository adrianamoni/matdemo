import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 2,
  boxShadow: 10,
  p: 2,
};

const ModalContainer = ({ opened, closed, children }) => {
  console.log("opened", opened);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    closed(false);
    setOpen(false);
  };

  useEffect(() => {
    if (opened) {
      setOpen(opened);
    }
  }, [opened]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};
export default ModalContainer;
