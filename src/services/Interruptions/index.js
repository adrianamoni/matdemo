import moment from "moment";

/* UNUSED */

const screen_interruptions_init = ({ lineaId }) => {
  return {
    ExecutionType: 1,
    RuleId: "PantallaParos",
    RuleVersion: 1,
    EventStamp: "2020-10-17T12:45:11.7600035Z",
    Parameters: {
      lineaId,
    },
  };
};

/* UNUSED */
/* const screen_pending_interruptions = ({name,dataType,value}) => {

    return {
      dbDataSetName: "ParosPendientes",
      dbQueryParameters: [{
        name,dataType,value
      }],
      columns: [],
      filter: null
    };
  }; */

/* const screen_interruptions = (woId, entId) => {
  return {
    dbDataSetName: "ParosPorOrden",
    dbQueryParameters: [woId, entId],
    columns: [],
    filter: null,
  };
}; */

const screen_interruptions_generate = ({ lineaId, reasCd, comments }) => {
  return {
    ExecutionType: 1,
    RuleId: "GenerarParo",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      lineaId,
      reasCd,
      comments,
    },
  };
};

const screen_interruptions_justify = ({
  lineaId,
  reasCd,
  rawReasCd,
  eventTime,
  eventEndTime,
  comments,
}) => {
  return {
    ExecutionType: 1,
    RuleId: "JustificarParo",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      lineaId,
      reasCd,
      rawReasCd,
      eventTime,
      eventEndTime,
      comments,
    },
  };
};

const screen_interruptions_reasons = () => {
  return {
    dbDataSetName: "UtilGroupsAndReasons",
    dbQueryParameters: [],
    columns: [],
    filter: null,
  };
};
//DEPRECATED
/* const interruptions_prod_events = ({ filters_arr }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "ProdEvents",
    columns: [],
    filter: {
      filterExpression: {
        filters: filters_arr,
        filterExpressionType: "AND",
        negationFilterExpression: false,
      },
      filterItem: null,
    },
  };
};
 */
const pending_interruptions = ({ filter }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "ProdEventsPendientesDataFrame",
    columns: [],
    filter: {
      filterExpression: {
        filters: filter,
        filterExpressionType: "AND",
        negationFilterExpression: false,
      },
      filterItem: null,
    },
  };
};

const all_interruptions = (entId) => {
  return {
    dbDataSetName: "ProdEventsAll_Dataset",
    dbQueryParameters: [
      {
        name: "ent_id",
        dataType: "INT",
        value: entId,
      },
    ],
    columns: [],
    filter: null,
  };
};

const all_interruptions_filtered = ({ entId, section, reason, date }) => {
  return {
    dbDataSetName: "ProdEventsAllFilters_Dataset",
    dbQueryParameters: [
      {
        name: "seccion",
        dataType: "STRING",
        value: section || null,
      },
      {
        name: "motivo",
        dataType: "STRING",
        value: reason || null,
      },
      {
        name: "fecha",
        dataType: "DATETIME",
        value: date || null,
      },
      {
        name: "ent_id",
        dataType: "INT",
        value: entId || null,
      },
    ],
    columns: [],
    filter: null,
  };
};
//DEPRECATED
/* const pending_interruption_alert = (entId) => {
  return {
    dbDataSetName: "ProdEventsEntId",
    dbQueryParameters: [
      {
        "name": "entId",              
        "dataType": "INT",
        "value": entId
      }
    ],
    columns: [],
    filter: null
  };
}
 */
const get_actual_interruption = (entId) => {
  return {
    dbDataSetName: "ParoActual",
    dbQueryParameters: [
      {
        name: "ent_id",
        dataType: "INT",
        value: entId,
      },
    ],
    columns: [],
    filter: null,
  };
};

const oil_tanks = () => {
  return {
    clientName: "WebBrowser",
    dataFrameName: "DepositosAceite",
    columns: [],
    filter: null,
  };
};

const getAllowableUtilGroups = (entId) => {
  return {
    dbDataSetName: "_SP_065_GetAllowableUtilGroups",
    dbQueryParameters: [
      {
        name: "ent_id",
        dataType: "INT",
        value: entId,
      },
    ],
    columns: [],
    filter: null,
  };
};

const getAllowableUtilReasons = (entId) => {
  return {
    dbDataSetName: "_SP_066_GetAllowableUtilReasons",
    dbQueryParameters: [
      {
        name: "ent_id",
        dataType: "INT",
        value: entId,
      },
    ],
    columns: [],
    filter: null,
  };
};

export {
  screen_interruptions_init,
  screen_interruptions_generate,
  screen_interruptions_justify,
  screen_interruptions_reasons,
  pending_interruptions,
  all_interruptions,
  all_interruptions_filtered,
  oil_tanks,
  get_actual_interruption,
  getAllowableUtilGroups,
  getAllowableUtilReasons,
};
