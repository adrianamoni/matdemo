import _ from "lodash";
import uuid from "react-uuid";
import { sections_available_sequencing } from "../../../services/OFservices";
import { ApiCall, MemoryDatabaseCall } from "../../../services/Service";
import {
  screen_sequencing_onCreate,
  screen_sequencing_onSave,
} from "../../../services/serviceHelper";
import { createNotification } from "../../alerts/NotificationAlert";
import moment from "moment";
import Text from "../../../languages/Text";
export const getSections = async () => {
  let tempOp;
  const response = await MemoryDatabaseCall({
    params: sections_available_sequencing(),
    url: "queryDataAsync",
  });
  if (response.responseError) {
    createNotification({
      status: "error",
      code: response.responseError,
      msg: response.responseMsg,
      hide: response.responseHide,
    });
  } else {
    if (response.length > 0) {
      tempOp = response.map((d) => ({
        key: d.ent_id,
        text: d.oper_desc,
        value: d.oper_id,
      }));
    }
  }
  return tempOp;
};

export const getData = async ({ userId, operId }) => {
  let newData;
  const response = await ApiCall({
    params: screen_sequencing_onCreate({
      userId,
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
    newData = response.responseData.map((data) => {
      if (data.ordenes.length > 0) {
        const orders = _.orderBy(data.ordenes, "StateCd", "asc");
        return {
          ...data,
          ordenes: orders.map(
            ({
              Duracion,
              FactorOEE,
              ItemDesc,
              ItemId,
              OperId,
              Personas,
              QtyProd,
              QtyReqd,
              RowId,
              SchedStartTimeLocal,
              SeqNo,
              StateCd,
              StateCdDesc,
              WoId,
              matriculasCargadas,
              posiblesVelocidades,
              target_EntId,
              target_EntName,
            }) => ({
              Duracion,
              FactorOEE,
              ItemDesc,
              ItemId,
              OperId,
              Personas,
              QtyProd,
              QtyReqd,
              RowId,
              SchedStartTimeLocal,
              SeqNo,
              StateCd,
              StateCdDesc,
              WoId,
              matriculasCargadas,
              posiblesVelocidades,
              target_EntId,
              target_EntName,
              id: uuid(),
            })
          ),
        };
      } else {
        return data;
      }
    });
  }
  return newData;
};

export const getGroups = (data, operations) => {
  let unasigned = operations.map((o) => ({
    id: o.entId,
    title: o.entName,
  }));
  let result = data.map((d) => {
    return {
      id: d.entId,
      title: d.description,
      stackItems: true,
    };
  });
  return [...result, ...unasigned];
};
export const getOperations = (data) => {
  const result = data.map((d) => {
    return { name: d.entDesc, id: d.entId, desc: d.entDesc };
  });
  return result;
};

export const getLines = (data) => {
  let result = data.flatMap((d) => d.lineas);
  result = result.map((r) => {
    return {
      name: r.description,
      id: r.entId,
    };
  });
  return result;
};

export const editSelectedOrder = (data) => {};

export const getLineFromInput = (evalue, rowId, apiData) => {
  const line = evalue;

  let orderIndex = apiData.ordenes.findIndex((el) => el.id === rowId);

  apiData.ordenes[orderIndex].target_EntId = line;
  return apiData;
};

export const getPeopleFromInput = (evalue, rowId, apiData) => {
  const speed = evalue;

  let orderIndex = apiData.ordenes.findIndex((el) => el.id === rowId);
  const people = apiData.ordenes[orderIndex].posiblesVelocidades.find(
    (el) => el.velocidad === speed
  ).personas;

  apiData.ordenes[orderIndex].Personas = people;

  return apiData;
};

export const getDateFromInput = (evalue, rowId, apiData) => {
  const initDate = evalue;

  let orderIndex = apiData.ordenes.findIndex((el) => el.id === rowId);
  if (orderIndex !== -1) {
    apiData.ordenes[orderIndex].SchedStartTimeLocal = initDate;
  }
  return apiData;
};

export const getQtyFromInput = (evalue, rowId, apiData) => {
  const qty = parseInt(evalue);

  let orderIndex = apiData.ordenes.findIndex((el) => el.id === rowId);
  apiData.ordenes[orderIndex].QtyReqd = qty;

  return apiData;
};

export const propsByState = ({ prodState, cleanState }) => {
  switch (prodState) {
    case 0:
      return {
        state: "Unknown",
        color: "#bfbfbf",
        background: "#ff5e69",
        light: "#f7cad3",
        dark: "#000000",
      };
    case 1:
      return {
        state: "New",
        color: "#b6f0f0",
        background: "#70f5e5",
        light: "#caf7f2",
        dark: "#154f4f",
      };
    case 2:
      return {
        state: "Ready",
        color: "#ebf0b6",
        background: "#f5cb70",
        light: "#f7e9ca",
        dark: "#4a4f13",
      };
    case 3:
      return {
        state: "Running",
        color: "#baf0b6",
        background: "#70f5a7",
        light: "#caf7dd",
        dark: "#183b16",
      };
    case 4:
      if (cleanState === 2 || cleanState === 3) {
        return {
          state: "Limpieza no completada",
          color: "#baf0b6",
          background: "#70f5a7",
          light: "#caf7dd",
          dark: "#183b16",
        };
      } else {
        return {
          state: "Complete",
          color: "#b6b8f0",
          background: "#6ebff5",
          light: "#cae5f7",
          dark: "#16183b",
        };
      }

    case 5:
      return {
        state: "Suspended",
        color: "#f0b6bd",
        background: "#ff5e69",
        light: "#f7cad3",
        dark: "#3d181d",
      };
    case 6:
      return {
        state: "Onhold",
        color: "#f0b6bd",
        background: "#ff5e69",
        light: "#f7cad3",
        dark: "#3d181d",
      };
    case 7:
      return {
        state: "Canceled",
        color: "#f0b6bd",
        background: "#b83007",
        light: "#f08878",
        dark: "#3d181d",
      };
    case 8:
      return {
        state: "Bypassed",
        color: "#C1C1C1",
        background: "#d6d6d6",
        light: "#F4F4F4",
        dark: "#000000",
      };
    case 9:
      return {
        state: "Superseded",
        color: "#f0b6bd",
        background: "#f5708b",
        light: "#f7cad3",
        dark: "#3d181d",
      };
    default:
      return {
        state: "Unknown",
        color: "#C1C1C1",
        background: "#d6d6d6",
        light: "#F4F4F4",
        dark: "#000000",
      };
  }
};

export const colorByState = ({ isDark, prodState, cleanState }) => {
  switch (prodState) {
    case 0:
      return {
        color: isDark ? "#454545" : "#bfbfbf",
      };
    case 1:
      return {
        color: isDark ? "#027a7a" : "#b6f0f0",
      };
    case 2:
      return {
        color: isDark ? "#868f27" : "#ebf0b6",
      };
    case 3:
      return {
        color: isDark ? "#275e23" : "#baf0b6",
      };
    case 4:
      if (cleanState === 2 || cleanState === 3) {
        return {
          color: isDark ? "#275e23" : "#baf0b6",
        };
      } else {
        return {
          color: isDark ? "#21246e" : "#b6b8f0",
        };
      }

    case 5:
      return {
        color: isDark ? "#6b111c" : "#f0b6bd",
      };
    case 6:
      return {
        color: isDark ? "#6b111c" : "#f0b6bd",
      };
    case 7:
      return {
        color: isDark ? "#6b111c" : "#f0b6bd",
      };
    case 8:
      return {
        color: isDark ? "#454545" : "#C1C1C1",
      };
    case 9:
      return {
        color: isDark ? "#6b111c" : "#f0b6bd",
      };
    default:
      return {
        color: isDark ? "#454545" : "#C1C1C1",
      };
  }
};

export const prepareItems = (data, isDark) => {
  let productionOrders;

  productionOrders = data.ordenes.filter(
    (el) => el.OperId !== "NETEJA" && el.OperId !== "LIMPIEZA"
  );

  let cleaningOrders = data.ordenes.filter(
    (e) => e.OperId === "limpieza" || e.OperId === "NETEJA"
  );

  let items = productionOrders.map((e) => {
    let currentSpeed = e.posiblesVelocidades.find(
      (el) => el.personas === e.Personas
    );
    let Duracion;
    let closest;
    if (currentSpeed) {
      Duracion = (currentSpeed.velocidad / 1000) * e.QtyReqd;
    } else {
      //Find nearer number of people
      closest = e.posiblesVelocidades.reduce(function (prev, curr) {
        return Math.abs(curr.personas - e.Personas) <
          Math.abs(prev.personas - e.Personas)
          ? curr.personas
          : prev.personas;
      });
      currentSpeed = e.posiblesVelocidades.find(
        (el) => el.personas === closest
      );
      Duracion = (currentSpeed.velocidad / 1000) * e.QtyReqd;
    }

    //FactorOEE applied
    Duracion = Duracion / e.FactorOEE;

    let clean = cleaningOrders && cleaningOrders.find((c) => c.WoId === e.WoId);
    let cleanDuration;
    if (clean) {
      cleanDuration = clean.Duracion;
    }
    const cleaningPercentage = cleanDuration
      ? (cleanDuration / (Duracion + cleanDuration)) * 100
      : 0;
    let endTime = moment(e.SchedStartTimeLocal)
      .add(Duracion, "minutes")
      .add(cleanDuration, "minutes");

    return {
      id: e.id,
      group:
        typeof e.posiblesLineas === "number"
          ? e.posiblesLineas
          : e.target_EntId,
      title: e.WoId,
      start_time: moment(e.SchedStartTimeLocal),
      end_time: endTime,
      itemProps: {
        style: {
          color: "rgb(20,20,20)",
          opacity: 1,
          fontSize: "1em",
          background: `linear-gradient(90deg, ${
            /*        propsByState(e.StateCd).color */
            colorByState({
              isDark,
              prodState: e.StateCd,
              cleanState: null,
            }).color
          } ${100 - cleaningPercentage}%, #84BBCE ${
            100 - cleaningPercentage
          }%)`,
          backgroundColor: "yellow",
          fontWeight: "bolder",
          border: "1px solid #167394",
        },
      },
    };
  });

  return [items, productionOrders, cleaningOrders];
};
export const filterArray = (array, originalData) => {
  // FILTRO1 -> que no sean limpieza
  const notCleaningOrders = array.filter(
    (el) => el.OperId !== "NETEJA" && el.OperId !== "limpieza"
  );

  // FILTRAR Las que no estan secuenciadas
  const filtered_arr_seq_table = notCleaningOrders.filter(
    (item) => item.StateCd === 1 || item.StateCd === 2
  );

  //Filtrar modificadas
  const modified_orders = filtered_arr_seq_table.filter(
    (o) =>
      !_.isEqual(
        o,
        originalData.find((el) => el.id === o.id)
      )
  );
  return modified_orders;
};

export const formatForSave = (array) => {
  const res = array.map((item) => {
    const currentSpeed = item.posiblesVelocidades.find(
      (el) => el.personas === item.Personas
    ).velocidad;
    let newDuration = (currentSpeed / 1000) * parseInt(item.QtyReqd);
    newDuration = newDuration / item.FactorOEE;

    return {
      WoId: item.WoId,
      OperId: item.OperId,
      SeqNo: item.SeqNo,
      EntId: item.target_EntId,
      QtyReqd: parseInt(item.QtyReqd),
      SchedStartTimeLocal: item.SchedStartTimeLocal,
      SchedFinishTimeLocal: moment(item.SchedStartTimeLocal)
        .add(newDuration, "minutes")
        .format("YYYY-MM-DDTHH:mm:ss"),
      EditTime: moment().format(),
      personas: item.Personas,
      duracion: newDuration,
    };
  });
  return res;
};

export const saveOrders = async (array) => {
  const response = await ApiCall({
    params: screen_sequencing_onSave({
      edited_operations_arr: array,
    }),
  });
  if (response.responseError) {
    createNotification({
      status: "error",
      code: response.responseError,
      msg: response.responseMsg,
      hide: response.responseHide,
    });
    return false;
  } else {
    createNotification({
      status: "success",
      msg: "ordersSavedSuccessfully",
      hide: response.responseHide,
    });
    return true;
  }
};
