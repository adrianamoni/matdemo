import uuid from "react-uuid";
import {
  tab_consumptions,
  tab_productions,
} from "../../../services/OFservices";
import { MemoryDatabaseCall } from "../../../services/Service";
import { get_all_orders } from "../../../services/serviceHelper";

export const getOrdersData = async ({ entId, itemId, date }) => {
  let result;
  let response = await MemoryDatabaseCall({
    params: get_all_orders({
      entId,
      itemId,
      date,
    }),
    url: "queryDataAsync",
  });
  console.log("response1", response);
  if (response) {
    console.log("response2", response);
    if (response.length > 0) {
      console.log("response3", response);
      result = response.map((item) => ({
        ...item,
        id: uuid(),
        material: item.item_id + " (" + item.itemDesc + ")",
      }));
      console.log("response4", result);
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
