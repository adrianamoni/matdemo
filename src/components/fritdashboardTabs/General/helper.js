import {
  screen_of_pause_btn,
  screen_of_start_btn,
  screen_of_stop_btn,
} from "../../../services/OFservices";
import { ApiCall } from "../../../services/Service";
import { createNotification } from "../../alerts/NotificationAlert";

export const handlePlayButton = async ({ data }) => {
  const response = await ApiCall({
    params: screen_of_start_btn({
      items_arr: [
        {
          woId: data.wo_id,
          operId: data.oper_id,
          seqNo: data.seq_no,
          duracionLimpieza: 0, // Dejar así, el back necesita recibir este parámetro /,
          tipoLimpieza: "", // Dejar así, el back necesita recibir este parámetro /,
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
    createNotification({
      status: "success",
      msg: "¡Orden iniciada correctamente!",
      hide: response.responseHide,
    });
  }
};
export const handlePauseButton = async ({ data }) => {
  const response = await ApiCall({
    params: screen_of_pause_btn([
      {
        woId: data.wo_id,
        operId: data.oper_id,
        seqNo: data.seq_no,
      },
    ]),
  });

  if (response.responseError) {
    /* createNotification({
      status: "error",
      code: response2.responseError,
      msg: response2.responseMsg,
      hide: response2.responseHide,
    }); */
  } else {
    /*  createNotification({
      status: "success",
      msg: "¡Orden pausada correctamente!",
      hide: response.responseHide,
    }); */
  }
};
export const handleStopButton = async ({ data }) => {
  const response = await ApiCall({
    params: screen_of_stop_btn({
      woId: data.wo_id,
      operId: data.oper_id,
      seqNo: data.seq_no,
    }),
  });
  if (response.responseError) {
    /*  createNotification({
      status: "error",
      code: response.responseError,
      msg: response.responseMsg,
      hide: response.responseHide,
    }); */
  } else {
    /* createNotification({
      status: "success",
      msg: "¡Orden parada correctamente!",
      hide: response.responseHide,
    }); */
  }
};
