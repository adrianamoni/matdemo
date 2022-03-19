import {
  empty_container_request,
  tab_materials_provisioning_request,
} from "../../services/OFservices";
import { ApiCall } from "../../services/Service";
import { createNotification } from "../alerts/NotificationAlert";

export const emptyContainerRequest = async ({ lineaName, woId, operId }) => {
  const response = await ApiCall({
    params: empty_container_request({
      lineaName,
      woId,
      operId,
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
      msg: "containerSuccessfullyRequested",
      hide: response.responseHide,
    });
  }
};

export const provisionRequestRequest = async ({
  lineaName,
  woId,
  operId,
  items,
}) => {
  const response = await ApiCall({
    params: tab_materials_provisioning_request({
      lineaName,
      woId,
      operId,
      items: items,
    }),
  });

  // if (response.responseError) {
  //   createNotification({
  //     status: "error",
  //     code: response.responseError,
  //     msg: response.responseMsg,
  //     hide: response.responseHide,
  //   });
  // } else {
  //   createNotification({
  //     status: "success",
  //     msg: "¡Contenedor solicitado correctamente!¡",
  //     hide: response.responseHide,
  //   });
  // }
  createNotification({
    status: "success",
    msg: "provisioningRequestSubmitedSuccessfully",
    hide: response.responseHide,
  });
};
