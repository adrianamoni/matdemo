import { get_order_details } from "../../../services/OFservices";
import { MemoryDatabaseCall } from "../../../services/Service";
import moment from "moment";

export const getOrderDetails = async ({ order }) => {
  let error;
  let obj1, obj2;
  const response = await MemoryDatabaseCall({
    params: get_order_details({
      woId: order.woId,
      operId: order.operId,
      seqNo: order.seqNo,
    }),
    url: "queryDataAsync",
  });

  if (response) {
    if (response.length > 0) {
      obj1 = response.find(
        (data) => data.oper_id !== "limpieza" && data.oper_id !== "NETEJA"
      );

      //PARSEO DE PROP TEXTO ROTURA STOCK
      let textRotura = obj1?.TextoRoturaStock;
      textRotura = textRotura ? JSON.parse(textRotura) : "";
      obj1.TextoRoturaStock = textRotura;
    }
  }

  const response2 = await MemoryDatabaseCall({
    params: get_order_details({
      woId: order.woId,
      operId: "NETEJA",
      seqNo: parseInt(order.spare3),
    }),
    url: "queryDataAsync",
  });

  if (response2) {
    if (response2.length > 0) {
      obj2 = response2.find((data) => data.oper_id === "NETEJA");
    }
  }

  return { productionData: obj1, cleaningData: obj2, error };
};

export const getPendingSamples = async (data) => {
  /*   let error;
  let obj1, obj2;
  const response = await MemoryDatabaseCall({
    params: get_order_details({
      woId: order.woId,
      operId: order.operId,
      seqNo: order.seqNo,
    }),
    url: "queryDataAsync",
  });

  if (response) {
    if (response.length > 0) {
      obj1 = response.find(
        (data) => data.oper_id !== "limpieza" && data.oper_id !== "NETEJA"
      );

    }
  }

  const response2 = await MemoryDatabaseCall({
    params: get_order_details({
      woId: order.woId,
      operId: "NETEJA",
      seqNo: parseInt(order.spare3),
    }),
    url: "queryDataAsync",
  });

  if (response2) {
    if (response2.length > 0) {
      obj2 = response2.find((data) => data.oper_id === "NETEJA");
    }
  }

  return { productionData: obj1, cleaningData: obj2, error }; */
};

export const dateFormater = ({ date, type }) => {
  const dateProp = date;
  let finalDate;

  if (moment(dateProp).isValid()) {
    switch (type) {
      case "hora-fecha":
        finalDate = moment(dateProp).format("HH:mm:ss DD/MM/YYYY");
        break;
      case "fecha-hora":
        finalDate = moment(dateProp).format("DD/MM/YYYY HH:mm:ss");
        break;
      case "fecha":
        finalDate = moment(dateProp).format("DD/MM/YYYY");
        break;
      case "hora":
        finalDate = moment(dateProp).format("HH:mm:ss");
        break;
      default:
        finalDate = moment(dateProp).format("DD/MM/YYYY HH:mm:ss");
    }
  } else {
    finalDate = "-";
  }

  return finalDate;
};

export const operation_states = ({ stateCd, type, prodStateCd }) => {
  if (type === "cleaning") {
    switch (stateCd) {
      case 1:
        return {
          state: "New",
          play: false,
          pause: true,
          stop: true,
          cancel: false,
        };
      case 2:
        return {
          state: "Ready",
          play: false,
          pause: true,
          stop: true,
          cancel: false,
        };
      case 3:
        return {
          state: "Running",
          play: true,
          pause: false,
          stop: false,
          cancel: false,
        };
      case 4:
        return {
          state: "Complete",
          play: true,
          pause: true,
          stop: true,
          cancel: true,
        };
      case 5:
        return {
          state: "Suspended",
          play: false,
          pause: true,
          stop: true,
          cancel: false,
        };
      case 6:
        return {
          state: "Onhold",
          play: true,
          pause: true,
          stop: true,
          cancel: true,
        };
      case 7:
        return {
          state: "Canceled",
          play: true,
          pause: true,
          stop: true,
          cancel: true,
        };
      case 8:
        return {
          state: "Bypassed",
          play: true,
          pause: true,
          stop: true,
          cancel: true,
        };
      case 9:
        return {
          state: "Superseded",
          play: true,
          pause: true,
          stop: true,
          cancel: true,
        };
      default:
        return {
          state: "Unknown",
          play: true,
          pause: true,
          stop: true,
          cancel: true,
        };
    }
  } else if (type === "cleaningOrder") {
    switch (stateCd) {
      case 1:
        return {
          state: "New",
          play: true,
          pause: true,
          stop: true,
          cancel: false,
        };
      case 2:
        return {
          state: "Ready",
          play: prodStateCd === 4 ? false : true,
          pause: true,
          stop: true,
          cancel: false,
        };
      case 3:
        return {
          state: "Running",
          play: true,
          pause: false,
          stop: false,
          cancel: false,
        };
      case 4:
        return {
          state: "Complete",
          play: true,
          pause: true,
          stop: true,
          cancel: true,
        };
      case 5:
        return {
          state: "Suspended",
          play: false,
          pause: true,
          stop: true,
          cancel: false,
        };
      case 6:
        return {
          state: "Onhold",
          play: true,
          pause: true,
          stop: true,
          cancel: true,
        };
      case 7:
        return {
          state: "Canceled",
          play: true,
          pause: true,
          stop: true,
          cancel: true,
        };
      case 8:
        return {
          state: "Bypassed",
          play: true,
          pause: true,
          stop: true,
          cancel: true,
        };
      case 9:
        return {
          state: "Superseded",
          play: true,
          pause: true,
          stop: true,
          cancel: true,
        };
      default:
        return {
          state: "Change",
          play: prodStateCd === 4 ? false : true,
          pause: true,
          stop: true,
          cancel: false,
        };
    }
  } else {
    switch (stateCd) {
      case 1:
        return { state: "New", play: true, pause: true, stop: false };
      case 2:
        return {
          state: "Ready",
          play: false,
          pause: true,
          stop: false,
        };
      case 3:
        return { state: "Running", play: true, pause: false, stop: false };
      case 4:
        return { state: "Complete", play: true, pause: true, stop: true };
      case 5:
        return {
          state: "Suspended",
          play: false,
          pause: true,
          stop: true,
        };
      case 6:
        return { state: "Onhold", play: true, pause: true, stop: true };
      case 7:
        return { state: "Canceled", play: true, pause: true, stop: true };
      case 8:
        return { state: "Bypassed", play: true, pause: true, stop: true };
      case 9:
        return { state: "Superseded", play: true, pause: true, stop: true };
      default:
        return {
          state: "Unknown",
          play: true,
          pause: true,
          stop: true,
        };
    }
  }
};

export const getColorFromBackend = ({ microparo, decFormatColor }) => {
  let red, green, blue;

  red = decFormatColor % 256;
  green = ((decFormatColor - red) / 256) % 256;
  blue = (decFormatColor - red - green * 256) / 256 / 256;

  if (microparo) {
    return { background: `rgb(${red},${green},${blue})`, foreground: "white" };
  } else {
    if (
      Math.abs(red - green) <= 10 &&
      Math.abs(red - blue) <= 10 &&
      Math.abs(green - blue) <= 10
    ) {
      return {
        background: `rgb(${red},${green},${blue})`,
        foreground: "black",
      };
    } else {
      return { background: `rgb(${red},${green},${blue})`, foreground: "#fff" };
    }
  }
};
