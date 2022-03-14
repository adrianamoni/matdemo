import { toast } from "react-toastify";
import "./customNotification.css";

export const createNotification = ({ status, msg, hide }) => {
  const autoClose = hide === 1 ? (status === "error" ? 8000 : 3500) : 0;
  const options = {
    position: "top-right",
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  if (status === "success") {
    toast.success(msg, {
      ...options,
    });
  } else if (status === "error") {
    toast.error(msg, {
      ...options,
    });
  } else if (status === "warning") {
    toast.warn(msg, {
      ...options,
    });
  } else {
    toast.info(msg, {
      ...options,
    });
  }
};
