import uuid from "react-uuid";
import {
  tab_consumptions,
  tab_productions,
} from "../../../services/OFservices";
import { MemoryDatabaseCall } from "../../../services/Service";
import { get_all_orders } from "../../../services/serviceHelper";
import { dateFormater } from "../../common/helpers/helper";

export const getOrdersData = async ({ entId, itemId, initDate, endDate }) => {
  let result;
  let response = await MemoryDatabaseCall({
    params: get_all_orders({
      entId,
      itemId,
      initDate,
      endDate,
    }),
    url: "queryDataAsync",
  });

  if (response) {
    if (response.length > 0) {
      result = response.map((item) => ({
        ...item,
        id: uuid(),
        material: item.item_id + " (" + item.itemDesc + ")",
        customSchedStart: dateFormater({
          date: item.sched_start_time_local,
          type: "hora-fecha",
        }),
        customSchedEnd: dateFormater({
          date: item.sched_finish_time_local,
          type: "hora-fecha",
        }),
        customActStart: dateFormater({
          date: item.act_start_time_local,
          type: "hora-fecha",
        }),
        customActEnd: dateFormater({
          date: item.act_finish_time_local,
          type: "hora-fecha",
        }),
      }));
    }
  }
  return result;
};

export const getConsumptionData = async ({ operId, entId, woId, seqNo }) => {
  let result;
  const response = await MemoryDatabaseCall({
    params: tab_consumptions({
      operId,
      entId,
      woId,
      seqNo,
    }),
    url: "queryDataAsync",
  });
  if (response) {
    if (response.length > 0) {
      result = response.map((item) => ({
        ...item,
        id: uuid(),
        material: item.item_id + " (" + item.item_desc + ")",
      }));
    }
  }
  return result;
};
export const getProductionData = async ({ operId, entId, woId, seqNo }) => {
  let result;
  const response = await MemoryDatabaseCall({
    params: tab_productions({
      operId,
      entId,
      woId,
      seqNo,
    }),
    url: "queryDataAsync",
  });
  if (response) {
    if (response.length > 0) {
      result = response.map((item) => ({
        ...item,
        id: uuid(),
        material: item.item_id + " (" + item.item_desc + ")",
      }));
    }
  }
  return result;
};
