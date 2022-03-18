import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Text from "../../languages/Text";

const ConfirmationDialog = ({
  title,
  msg,
  open,
  close,
  handleConfirm,
  handleCancel,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        /* PaperComponent={PaperComponent} */
      >
        <DialogTitle>{Text({ tid: title })}</DialogTitle>
        <DialogContent>
          <DialogContentText>{Text({ tid: msg })}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleCancel || close}>
            {Text({ tid: "cancel" })}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleConfirm}>
            {Text({ tid: "accept" })}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ConfirmationDialog;
