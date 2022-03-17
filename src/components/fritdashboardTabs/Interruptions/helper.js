import { dateFormater, timeFormating } from "../../common/helpers/helper";
import {
  all_interruptions,
  all_interruptions_filtered,
  pending_interruptions,
} from "../../../services/Interruptions";
import { MemoryDatabaseCall } from "../../../services/Service";

const InterruptionManagerFilter = ({ entId }) => {
  if (entId) {
    return [
      {
        filterExpression: null,
        filterItem: {
          column: "EntId",
          dataType: "INT",
          value: entId,
          filterItemType: "Equal",
          checkDBNull: false,
        },
      },

      {
        filterExpression: null,
        filterItem: {
          column: "ShiftEndDateTime",
          dataType: "Datetime",
          value: null,
          filterItemType: "null",
          checkDBNull: false,
        },
      },
    ];
  } else {
    return [
      {
        filterExpression: null,
        filterItem: {
          column: "ShiftEndDateTime",
          dataType: "Datetime",
          value: null,
          filterItemType: "null",
          checkDBNull: false,
        },
      },
    ];
  }
};

const fetchAllData = async (entId) => {
  let err = null;
  let orginalRes = [];
  let res = [];

  const response = await MemoryDatabaseCall({
    params: all_interruptions(entId),
    url: "queryDataAsync",
  });

  if (response) {
    if (response.responseError) {
      err = {
        status: "error",
        code: response.responseError,
        msg: response.responseError,
        hide: 1,
      };
    } else {
      if (response.length > 0) {
        orginalRes = response;
        const newArr = response.map((item, i) => {
          return {
            index: i + 1,
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
            id: item.ID,
            ReasonDesc: item.ReasonDesc,
            Comment: item.Comment,
            UtilStateDesc: item.UtilStateDesc,
            ReasonGrpId: item.ReasonGrpId,
            ReasonCd: item.ReasonCd,
            RawReasCd: item.RawReasCd,
            EntId: item.EntId,

            StartDateTime: item.StartDateTime,
          };
        });

        res = newArr;
      }
    }
  }
  return { orginalRes, res, err };
};

const fetchAllManagerData = async ({ entId, section, reason, date }) => {
  let err = null;
  let res = [];
  const response = await MemoryDatabaseCall({
    params: all_interruptions_filtered({ entId, section, reason, date }),
    url: "queryDataAsync",
  });

  if (response) {
    if (response.responseError) {
      err = {
        status: "error",
        code: response.responseError,
        msg: response.responseError,
        hide: 1,
      };
    } else {
      if (response.length > 0) {
        const newArr = response.map((item, i) => {
          return {
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
            ReasonDesc: item.ReasonDesc,
            Comment: item.Comment,
            UtilStateDesc: item.UtilStateDesc,
            ReasonGrpId: item.ReasonGrpId,
            ReasonCd: item.ReasonCd,
            RawReasCd: item.RawReasCd,
            EntId: item.EntId,
            EntityName: item.EntityName,
            StartDateTime: item.StartDateTime,
            WOID: item.WOID,
            ProductID: item.ProductID,
            ProductDesc: item.ProductDesc,
          };
        });

        res = newArr;
      }
    }
  }
  return { res, err };
};

const fetchPendingManagerData = async ({ entId }) => {
  let err = null;
  let res = [];

  const response = await MemoryDatabaseCall({
    params: pending_interruptions({
      filter: InterruptionManagerFilter({ entId }),
    }),
    url: "queryDataFrameDataAsync",
  });
  console.log("response", response);
  if (response) {
    if (response.responseError) {
      err = {
        status: "error",
        code: response.responseError,
        msg: response.responseError,
        hide: 1,
      };
    } else {
      if (response.length > 0) {
        const newArr = response.map((item, i) => {
          return {
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
            ReasonDesc: item.ReasonDesc,
            Comment: item.Comment,
            UtilStateDesc: item.UtilStateDesc,
            ReasonGrpId: item.ReasonGrpId,
            ReasonCd: item.ReasonCd,
            RawReasCd: item.RawReasCd,
            EntId: item.EntId,
            StartDateTime: item.StartDateTime,
            WOID: item.WOID,
            ProductID: item.ProductID,
            ProductDesc: item.ProductDesc,
          };
        });

        res = newArr;
      }
    }
  }
  return { res, err };
};

export {
  /*  fetchPendingData, */
  fetchAllData,
  fetchAllManagerData,
  fetchPendingManagerData,
};
