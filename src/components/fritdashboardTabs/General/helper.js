import {
  screen_of_pause_btn,
  screen_of_start_btn,
  screen_of_stop_btn,
} from "../../../services/OFservices";
import { ApiCall } from "../../../services/Service";
import { createNotification } from "../../alerts/NotificationAlert";

export const handleOperationAction = async ({ type, woId, operId, seqNo }) => {
  const actions = {
    start: { service: screen_of_start_btn, msg: "iniciada" },
    pause: { service: screen_of_pause_btn, msg: "pausada" },
    stop: { service: screen_of_stop_btn, msg: "parada" },
  };

  const response = await ApiCall({
    params: actions[type].service({
      woId,
      operId,
      seqNo,
    }),
  });

  if (response.responseError) {
    createNotification({
      status: "error",
      code: response.responseError,
      msg: response.responseMsg,
      hide: response.responseHide,
    });
  } else {
    createNotification({
      status: "success",
      msg: `¡Orden ${msg} correctamente!`,
      hide: response.responseHide,
    });
  }
};
