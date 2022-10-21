import { toast } from "react-toastify";
import Text from "../../../languages/Text";
import {
  screen_cleaning_stop_btn,
  screen_of_pause_btn,
  screen_of_start_btn,
  screen_of_stop_btn,
} from "../../../services/OFservices";
import { ApiCall } from "../../../services/Service";
import { createNotification } from "../../alerts/NotificationAlert";

export const handleOperationAction = async ({
  type,
  isCleaning,
  woId,
  operId,
  seqNo,
  // callBack,
}) => {
  const actions = {
    start: {
      service: screen_of_start_btn,
      msg: isCleaning ? "cleaningOrderStarted" : "orderStarted",
    },
    pause: {
      service: screen_of_pause_btn,
      msg: isCleaning ? "cleaningOrderPaused" : "orderPaused",
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
    setTimeout(() => {
      createNotification({
        status: "success",
        msg,
        hide: response.responseHide,
      });
      // callBack();
    }, 2000);
  }
};
export const handleStopCleaning = async ({ woId, operId, seqNo, entName }) => {
  const response = await ApiCall({
    params: screen_cleaning_stop_btn({
      arr_items: [
        {
          woId,
          operId,
          seqNo,
          entName,
        },
      ],
    }),
  });

  if (response.responseError) {
    createNotification({
      status: "error",
      msg: response.responseMsg,
      hide: response.responseHide,
    });
  } else {
    setTimeout(
      () =>
        createNotification({
          status: "success",
          msg: "cleaningOrderStopped",
          hide: response.responseHide,
        }),
      2000
    );
  }
};
