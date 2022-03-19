import { toast } from "react-toastify";
import Text from "../../../languages/Text";
import {
  screen_of_pause_btn,
  screen_of_start_btn,
  screen_of_stop_btn,
} from "../../../services/OFservices";
import { ApiCall } from "../../../services/Service";
import { createNotification } from "../../alerts/NotificationAlert";

export const handleOperationAction = async ({ type, woId, operId, seqNo }) => {
  const actions = {
    start: { service: screen_of_start_btn, msg: "orderStarted" },
    pause: {
      service: screen_of_pause_btn,
      msg: "orderPaused",
    },
    stop: { service: screen_of_stop_btn, msg: "orderStopped" },
  };
  const { service, msg } = actions[type];
  const response = await ApiCall({
    params: service({
      woId,
      operId,
      seqNo,
    }),
  });

  if (response.responseError) {
    createNotification({
      status: "error",
      /*  code: response.responseError, */
      msg: response.responseMsg,
      hide: response.responseHide,
    });
  } else {
    setTimeout(
      () =>
        createNotification({
          status: "success",
          msg,
          hide: response.responseHide,
        }),
      500
    );
  }
};
