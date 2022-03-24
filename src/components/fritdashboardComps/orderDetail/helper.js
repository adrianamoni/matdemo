import {
  get_order_details,
  get_pending_samples,
} from "../../../services/OFservices";
import { MemoryDatabaseCall } from "../../../services/Service";
import moment from "moment";
import _ from "lodash";
import { pending_interruptions } from "../../../services/Interruptions";
import uuid from "react-uuid";
import Text from "../../../languages/Text";

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

export const getPendingSamples = async ({ customParams }) => {
  let qualityAlert;
  let qualityData;
  const response = await MemoryDatabaseCall({
    params: get_pending_samples(customParams),
    url: "queryDataFrameDataAsync",
  });
  if (response) {
    if (response.length > 0) {
      if (response.length > 0) {
        qualityAlert = true;
        qualityData = response.map((sample) => ({
          id: sample.sample_id,
          name: sample.sample_name,
          req_time_local: sample.requested_time_local,
          estado: sample.estado,
          status: sample.sample_status,
        }));
        qualityData = _.sortBy(qualityData, "req_time_local");
      } else {
        qualityAlert = false;
        qualityData = [];
      }
    } else {
      qualityAlert = false;
      qualityData = [];
    }
  }
  return { samplesResult: { qualityData, qualityAlert } };
};

export const timeFormating = (seconds) => {
  let formated;
  if (seconds === 0) {
    formated = "0min 0s";
  } else {
    formated = new Date(seconds * 1000).toISOString();
    formated = formated
      .substring(11, 19)
      .replace(":", "h ")
      .replace(":", "min ");
    formated = formated + "s";
  }

  return formated;
};

export const getPendingInterruptions = async ({ customParams }) => {
  let interruptionAlert;
  let interruptionData;

  const response = await MemoryDatabaseCall({
    params: pending_interruptions(customParams),
    url: "queryDataFrameDataAsync",
  });

  if (response) {
    if (response.length > 0) {
      interruptionAlert = true;
      interruptionData = response.map((item, i) => ({
        index: i,
        Duration: timeFormating(item.Duration),
        customStartDateTime: dateFormater({
          date: item.StartDateTime,
          type: "hora-fecha",
        }),
        EndDateTime: dateFormater({
          date: item.EndDateTime,
          type: "hora-fecha",
        }),
        Prompt: item.Prompt,
        ID: item.ID,
        id: item.ID,
        ReasonDesc: item.ReasonDesc,
        Comment: item.Comment,
        UtilStateDesc: item.UtilStateDesc,
        ReasonGrpId: item.ReasonGrpId,
        ReasonCd: item.ReasonCd,
        RawReasCd: item.RawReasCd,
        EntId: item.EntId,
        StartDateTime: item.StartDateTime,
      }));
    } else {
      interruptionAlert = false;
      interruptionData = [];
    }
  } else {
    interruptionAlert = false;
    interruptionData = [];
  }
  return { interruptionResult: { interruptionData, interruptionAlert } };
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
          stop: false,
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

const getForegroundColor = (r, g, b) => {
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 140 ? "#eee" : "#111";
};

export const getColorFromBackend = ({ microparo, decFormatColor }) => {
  let red, green, blue;
  let foreground;
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
      return {
        background: `rgb(${red},${green},${blue})`,
        foreground: getForegroundColor(red, green, blue),
      };
    }
  }
};

export const processOrderTimeData = ({ orderTime, duracionJob }) => {
  const orderInMins = orderTime / 60;
  let res = parseFloat(duracionJob) - orderInMins;
  if (res < 0) {
    res = 0;
  } else {
    res = parseFloat(duracionJob) - orderInMins;
  }

  let tempRemainingTime = Math.ceil(res) + " min";

  return { value: res, text: tempRemainingTime };
};

export const getCleaningText = (cleanState) => {
  let text;
  if (cleanState || cleanState === "") {
    if (cleanState === "" || cleanState === "S") {
      text = Text({ tid: "dryCleaning" });
    } else if (cleanState === "P") {
      text = Text({ tid: "cleaningWithProduct" });
    } else if (cleanState === "A") {
      text = Text({ tid: "cleaningWithWater" });
    } else {
      text = "-";
    }
  } else {
    text = "-";
  }

  return text;
};
