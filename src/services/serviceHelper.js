import moment from "moment";
import { getSEMI001, getPA001, getPA002 } from "./createOrderService";
/* const getTerminal = ({ terminal }) => {
  return {
    ExecutionType: 1,
    RuleId: "Terminal",
    RuleVersion: 1,
    EventStamp: moment().format(),
    SessionId: 0,
    UserId: "Administrator",
    Parameters: {
      terminal,
    },
  };
};
 */
const loginObj = ({ userName, userPassword }) => {
  return {
    ExecutionType: 1,
    RuleId: "Login",
    RuleVersion: 1,
    EventStamp: moment().format(),
    SessionId: "",
    UserId: userName,
    Parameters: {
      pwd: userPassword,
    },
  };
};

const logoutObj = {
  ExecutionType: 1,
  RuleId: "Logout",
  RuleVersion: 1,
  EventStamp: moment().format(),
  SessionId: 1090,
  UserId: "oasys",
  Parameters: {},
};

/* DEPRECATED */
const screen_operatorAssignment = {
  ExecutionType: 1,
  RuleId: "PantallaAsignacion",
  RuleVersion: 1,
  EventStamp: moment().format(),
};

/* DEPRECATED */
const screen_operatorDeAssignment = {
  ExecutionType: 1,
  RuleId: "PantallaDesasignacion",
  RuleVersion: 1,
  EventStamp: moment().format(),
};

/** MEMORY DB */
const deassignment = () => {
  return {
    dbDataSetName: "Desasignacion",
    dbQueryParameters: [],
    columns: [],
    filter: null,
  };
};

/** MEMORY DB */
const line_assignment = ({ name, dataType, value }) => {
  return {
    dbDataSetName: "AsignacionLineas",
    dbQueryParameters: [
      {
        name,
        dataType,
        value,
      },
    ],
    columns: [],
    filter: null,
  };
};

const screen_operatorAssignment_assign = ({ userId, entId }) => {
  return {
    ExecutionType: 1,
    RuleId: "AsignacionPersonal",
    RuleVersion: 1,
    EventStamp: moment().format(),
    SessionId: "",
    UserId: userId,
    Parameters: {
      entId,
    },
  };
};
const screen_operatorAssignment_deassign = ({ operario, labCd }) => {
  return {
    ExecutionType: 1,
    RuleId: "DesasignacionPersonal",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      operario,
      labCd,
    },
  };
};

const screen_sequencing_onCreate = ({ userId, operId }) => {
  return {
    ExecutionType: 1,
    RuleId: "ObtenerOperacionLineas",
    RuleVersion: 1,
    EventStamp: moment().format(),
    SessionId: 0,
    UserId: "oasys" /* userId */,
    Parameters: { operId },
  };
};

/* 
const screen_sequencing_line_operations = ({usuario, sesion, lineaId}) => {
  return {
    ExecutionType: 1,
    RuleId: "ObtenerLineaOperaciones",
    RuleVersion: 1,
    EventStamp: moment().format(),
// SessionId: 0,
//    UserId: "12345",
    Parameters: {
      usuario,
      sesion,
      lineaId
    },
  };
};
 */

const screen_sequencing_onSave = ({ edited_operations_arr }) => {
  return {
    ExecutionType: 1,
    RuleId: "SecuenciacionOrdenes",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      usuario: "oasys",
      sesion: 0,
      ordenes: edited_operations_arr,
    },
  };
};

const screen_sequencing_onLiberate = ({ liberateOrders_arr }) => {
  return {
    ExecutionType: 1,
    RuleId: "LiberarOrdenesSecuenciacion",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      usuario: "oasys",
      sesion: 0,
      ordenes: liberateOrders_arr,
    },
  };
};

/** MEMORY DB */
const logged_users = ({ filter_arr }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "PersonasLogeadas",
    columns: [],
    filter: {
      filterExpression: {
        filters: filter_arr,
        filterExpressionType: "AND",
        negationFilterExpression: false,
      },
      filterItem: null,
    },
  };
};

/** MEMORY DB deprecated */
/* const last_orders = ({ name, dataType, value }) => {
  return {
    dbDataSetName: "OrdenesFinalizadas",
    dbQueryParameters: [{ name, dataType, value }],
    columns: [],
    filter: null,
  };
}; */

/** MEMORY DB deprecated*/
/* const next_orders = (rownum, ent) => {
  return {
    dbDataSetName: "OrdenesSiguientes",
    dbQueryParameters: [rownum, ent],
    columns: [],
    filter: null,
  };
}; */

const get_next_orders = ({ filter }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "OrdenesSiguientesDataFrame",
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

const get_last_orders = ({ filter }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "OrdenesFinalizadasDataFrame",
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

/** MEMORY DB deprecated */
/* const entities_parents = () => {
  return {
    dbDataSetName: "EntidadesyParents",
    dbQueryParameters: [],
    columns: [],
    filter: null,
  };
}; */

/** MEMORY DB */
const entities_by_terminal = ({ name, dataType, value }) => {
  return {
    dbDataSetName: "EntidadesPorTerminal",
    dbQueryParameters: [
      {
        name,
        dataType,
        value,
      },
    ],
    columns: [],
    filter: null,
  };
};

const all_entities = () => {
  return {
    dbDataSetName: "Lineas",
    dbQueryParameters: [],
    columns: [],
    filter: null,
  };
};

/** MEMORY DB */ //!UNUSED
/* const cleaning_lines = () => {
  return {
    dbDataSetName: "LineasLimpieza",
    dbQueryParameters: [],
    columns: [],
    filter: null,
  };
}; */

const cleaning_type_options = ({ entId }) => {
  return {
    ExecutionType: 1,
    RuleId: "TiposOperacionLimpieza",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      entId,
    },
  };
};

/* 
const read_tags = (tags) => {
  return {
    ExecutionType: 1,
    RuleId: "ReadTags",
    RuleVersion: 1,
    EventStamp: moment().format(),
    SessionId: 1106,
    UserId: "administrator",
    Parameters: {
      tags: {
        tags,
      },
    },
  };
};
 */
const container_removal = ({ parameters }) => {
  return {
    ExecutionType: 1,
    RuleId: "RetiradaContenedor",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: parameters,
  };
};

const download_machine = ({ items_arr }) => {
  return {
    ExecutionType: 1,
    RuleId: "DescargaMaquina",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      items: items_arr,
    },
  };
};

const inventory_fetch = ({ filters_arr, expressionType }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "ConsultaInventario",
    columns: [],
    filter: {
      filterExpression: {
        filters: filters_arr,
        filterExpressionType: expressionType,
        negationFilterExpression: false,
      },
      filterItem: null,
    },
  };
};

//DEPRECATED
/* const stock_adjustment = ({OperId, Matricula, LotNo, Quantity}) => {
  return {
    ExecutionType: 1,
    RuleId: "AjusteStock",
    RuleVersion: 1,
    EventStamp: moment().format(),
    SessionId: 1089,
    UserId: "12345",
    Parameters: {
      OperId,
      Matricula,
      LotNo,
      Quantity
    },
  };
}; */

const stock_adjustment_oil = ({ entId, newQty }) => {
  return {
    ExecutionType: 1,
    RuleId: "AjusteStockAceite",
    RuleVersion: 1,
    EventStamp: moment().format(),
    SessionId: 1089,
    UserId: "12345",
    Parameters: {
      entId,
      newQty,
    },
  };
};

const oil_stock_delete = ({ entName, itemId, lotNo }) => {
  return {
    ExecutionType: 1,
    RuleId: "BorrarStockAceite",
    RuleVersion: 1,
    EventStamp: moment().format(),
    SessionId: 1089,
    UserId: "12345",
    Parameters: {
      entName,
      itemId,
      lotNo,
    },
  };
};

const oil_stock_update = ({ entName, itemId, lotNo, newQty }) => {
  return {
    ExecutionType: 1,
    RuleId: "ModificarStockAceite",
    RuleVersion: 1,
    EventStamp: moment().format(),
    SessionId: 1089,
    UserId: "12345",
    Parameters: {
      entName,
      itemId,
      lotNo,
      newQty,
    },
  };
};

const cleaning_types = () => {
  return {
    dbDataSetName: "TiposLimpieza",
    dbQueryParameters: [],
    columns: [],
    filter: null,
  };
};

const cleaning_order_time = ({ woId, operId, seqNo }) => {
  return {
    dbDataSetName: "TiempoPorOrden",
    dbQueryParameters: [
      { name: "wo_id", dataType: "STRING", value: woId },
      {
        name: "oper_id",
        dataType: "STRING",
        value: operId,
      },
      {
        name: "seq_no",
        dataType: "INT",
        value: seqNo,
      },
    ],
    columns: [],
    filter: null,
  };
};

const split_operation = ({ woId, operId, seqNo, splitQty }) => {
  return {
    ExecutionType: 1,
    RuleId: "SplitOperacion",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: { woId, operId, seqNo, splitQty },
  };
};

const read_tags_teams = ({ filter }) => {
  return {
    clientName: "WebBrowser",
    dataFrameName: "Equipos",
    columns: [],
    filter: filter || null,
  };
};

const read_tags_packing_machine = () => {
  return {
    clientName: "WebBrowser",
    dataFrameName: "Envasadoras",
    columns: [],
    filter: null,
  };
};

const read_signals = () => {
  return {
    clientName: "WebBrowser",
    dataFrameName: "Variables",
    columns: [],
    filter: null,
  };
};
//datos para chart de energia en OEE
const read_energy = () => {
  return {
    clientName: "WebBrowser",
    dataFrameName: "Energia",
    columns: [],
    filter: null,
  };
};

const write_tags = ({ tags_arr }) => {
  return {
    ExecutionType: 1,
    RuleId: "WriteTags",
    RuleVersion: 1,
    EventStamp: moment().format(),
    SessionId: 1106,
    UserId: "administrator",
    Parameters: {
      tags: {
        tags: tags_arr,
      },
    },
  };
};

const stock_break_action = ({ woId, operId, seqNo, accion }) => {
  return {
    ExecutionType: 1,
    RuleId: "AccionRoturaStock",
    RuleVersion: 1,
    EventStamp: moment().format(),
    /* SessionId: 1106,
    UserId: "administrator", */
    Parameters: {
      woId,
      operId,
      seqNo,
      accion,
    },
  };
};

const tab_reprint_print = ({
  EntId,
  WoId,
  OperId,
  SeqNo,
  Fecha,
  Matricula,
  LotNo,
}) => {
  return {
    ExecutionType: 1,
    RuleId: "ReimpresionEtiqueta",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      EntId,
      WoId,
      OperId,
      SeqNo,
      Fecha,
      Matricula,
      LotNo,
    },
  };
};

const printers_list = ({ value }) => {
  return {
    dbDataSetName: "ListaImpresoras",
    dbQueryParameters: [{ name: "dummy", dataType: "INT", value }],
    columns: [],
    filter: null,
  };
};

const printers_list_save = ({ TipoImpresora, ValorAConfigurar, EntId }) => {
  return {
    ExecutionType: 1,
    RuleId: "ConfigurarImpresora",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: { TipoImpresora, ValorAConfigurar, EntId },
  };
};
const printers_list_options = () => {
  return {
    ExecutionType: 1,
    RuleId: "ListarImpresorasDisponibles",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {},
  };
};

const order_manager_ent_filter = () => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "JobFiltroEnt",
    columns: [],
    filter: null,
  };
};
const order_manager_item_filter = () => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "JobFiltroItem",
    columns: [],
    filter: null,
  };
};
const order_manager_date_filter = () => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "JobFiltroFecha",
    columns: [],
    filter: null,
  };
};

const get_all_orders = ({ entId, itemId, initDate, endDate }) => {
  return {
    dbDataSetName: "JobAllFilters_Dataset",
    dbQueryParameters: [
      { name: "ent_id", dataType: "INT", value: entId || null },
      {
        name: "item_id",
        dataType: "STRING",
        value: itemId || null,
      },
      {
        name: "fechaIni",
        dataType: "DATETIME",
        value: initDate || null,
      },
      {
        name: "fechaFin",
        dataType: "DATETIME",
        value: endDate || null,
      },
    ],
    columns: [],
    filter: null,
  };
};

const create_order_manually = ({ item, qtyReqd }) => {
  let jsonData;
  if (item.itemId === "PA001") {
    jsonData = getPA001(qtyReqd);
  } else if (item.itemId === "PA002") {
    jsonData = getPA002(qtyReqd);
  } else {
    jsonData = getSEMI001(qtyReqd);
  }

  return jsonData;
};

export {
  loginObj,
  logoutObj,
  screen_operatorAssignment,
  deassignment,
  line_assignment,
  screen_operatorAssignment_assign,
  screen_operatorDeAssignment,
  screen_operatorAssignment_deassign,
  screen_sequencing_onCreate,
  screen_sequencing_onSave,
  screen_sequencing_onLiberate,
  logged_users,
  /*   last_orders, */
  /*   next_orders, */
  get_next_orders,
  get_last_orders,
  entities_by_terminal,
  all_entities,
  cleaning_type_options,
  container_removal,
  download_machine,
  inventory_fetch,
  stock_adjustment_oil,
  oil_stock_delete,
  oil_stock_update,
  cleaning_types,
  cleaning_order_time,
  split_operation,
  read_tags_teams,
  read_tags_packing_machine,
  read_signals,
  write_tags,
  stock_break_action,
  tab_reprint_print,
  printers_list,
  printers_list_save,
  printers_list_options,
  order_manager_ent_filter,
  order_manager_item_filter,
  order_manager_date_filter,
  get_all_orders,
  create_order_manually,
  read_energy,
};
