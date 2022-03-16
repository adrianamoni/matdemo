import uuid from "react-uuid";
import { MemoryDatabaseCall } from "../../../services/Service";
import {
  all_samples,
  tab_quality_get_attributes,
} from "../../../services/OFservices";
import _ from "lodash";

export const fetchAllSampleData = async ({
  entId,
  woId,
  operId,
  seqNo,
  itemId,
}) => {
  let err = null;
  let res = [];

  const response = await MemoryDatabaseCall({
    params: all_samples({ entId, woId, operId, seqNo, itemId }),
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
        const filteredSamples = response.map((sample) => ({
          id: sample.sample_id,
          name: sample.sample_name,
          req_time_local: sample.requested_time_local,
          estado: sample.estado,
          status: sample.sample_status,
        }));
        res = _.sortBy(filteredSamples, "req_time_local");
      }
    }
  }
  return { res, err };
};

export const get_sample_filters_arr = ({
  entId,
  woId,
  operId,
  seqNo,
  item_id,
}) => [
  {
    filterExpression: null,
    filterItem: {
      column: "ent_id",
      dataType: "INT",
      value: entId,
      filterItemType: "Equal",
      checkDBNull: false,
    },
  },
  {
    filterExpression: null,
    filterItem: {
      column: "wo_id",
      dataType: "STRING",
      value: woId,
      filterItemType: "Equal",
      checkDBNull: false,
    },
  },
  {
    filterExpression: null,
    filterItem: {
      column: "oper_id",
      dataType: "STRING",
      value: operId,
      filterItemType: "Equal",
      checkDBNull: false,
    },
  },
  {
    filterExpression: null,
    filterItem: {
      column: "seq_no",
      dataType: "INT",
      value: seqNo,
      filterItemType: "Equal",
      checkDBNull: false,
    },
  },
  {
    filterExpression: null,
    filterItem: {
      column: "item_id",
      dataType: "STRING",
      value: item_id,
      filterItemType: "Equal",
      checkDBNull: false,
    },
  },
  {
    filterExpression: null,
    filterItem: {
      column: "Autocontrol",
      dataType: "STRING",
      value: "L", //hardcoded, dejar así
      filterItemType: "NotEqual",
      checkDBNull: false,
    },
  },
];
export const checkInputResult = (min, max, num) => {
  let className = "custom-default";
  let res;
  if (num) {
    let value = Number.isNaN(num) ? undefined : num;

    className = "custom-red";

    if (value) {
      if (min == null || max == null) {
        if (min == null && value <= max) {
          className = "custom-green";
        } else if (max == null && value >= min) {
          className = "custom-green";
        }
      } else {
        if (value >= min && value <= max) {
          className = "custom-green";
        }
      }
    } else {
      className = "custom-input";
    }
  }

  res = className.concat("-input");

  return res;
};

export const checkDropdownResult = (min, max, num, char_id) => {
  let className = "custom-default";
  let res;
  if (num) {
    let value = Number.isNaN(num) ? undefined : num;
    className = "custom-red";

    if (value) {
      if (min == null || max == null) {
        if (min == null && value <= max) {
          className = "custom-green";
        } else if (max == null && value >= min) {
          className = "custom-green";
        }
      } else {
        if (value >= min && value <= max) {
          className = "custom-green";
        }
      }
    } else {
      className = "custom-input";
    }
  }

  res = className.concat("-dropdown");

  return res;
};

const customDropdown = ({ data, text, value, extra, possible_value }) => {
  const res = data.map((d) => {
    return {
      key: uuid(),
      text: d[text],
      value: d[value],
      extra: d[extra],
      possible_value: d[possible_value],
    };
  });
  return res;
};

const apiCall = async (attr_id) => {
  const response = await MemoryDatabaseCall({
    params: tab_quality_get_attributes({ attrId: attr_id }),
    url: "queryDataAsync",
  });
  if (response.responseError) {
  } else {
    return response;
  }
};

export const multiCall = async (results) => {
  let allIds;
  allIds = results.filter((c) => c.attrId > -1);
  const char_attr_id = allIds.map((c) => ({
    charId: c.charId,
    attrId: c.attrId,
  }));

  let calls = char_attr_id.map((c) => {
    return {
      api: apiCall(c.attrId),
    };
  });

  const result = await Promise.all(calls.map((c) => c.api));

  const finalResponse = char_attr_id.map((o, i) => {
    return {
      ...o,
      datos: result[i],
    };
  });

  const drop = finalResponse.map((item) => {
    return {
      charId: item.charId,
      options: customDropdown({
        data: item.datos,
        text: "possible_value_user",
        value: "display_seq",
        extra: "possible_value_sap",
        possible_value: "possible_value",
      }),
    };
  });
  return drop;
};

export const sortBy = (key, arr) => {
  return arr.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));
};
