import { toast } from "react-toastify";
import Text from "../../languages/Text";
import "./customNotification.css";

const createNotification = ({ status, msg, hide, num }) => {
  const autoClose = hide === 1 ? (status === "error" ? 8000 : 3500) : 0;

  const options = {
    position: "top-right",
    hideProgressBar: false,
    autoClose: autoClose,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    type:
      status === "success"
        ? toast.TYPE.SUCCESS
        : status === "error"
        ? toast.TYPE.ERROR
        : status === "warning"
        ? toast.TYPE.WARNING
        : toast.TYPE.INFO,
  };
  if (status === "error") {
    toast(msg || "error", options);
  } else {
    if (num) {
      toast(
        <>
          <Text tid={msg} />
          <span>&nbsp;({num})</span>
        </>,
        options
      );
    } else {
      toast(<Text tid={msg} />, options);
    }
  }
};

export { createNotification };
