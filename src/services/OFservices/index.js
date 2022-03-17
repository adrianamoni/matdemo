import moment from "moment";

const screen_of_detail = ({ woId, operId, seqNo }) => {
  return {
    ExecutionType: 1,
    RuleId: "PantallaDetalleOF",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      woId,
      operId,
      seqNo,
    },
  };
};

const tab_of_parameters = ({ woId, operId, seqNo }) => {
  return {
    dbDataSetName: "ParametrosOF",
    dbQueryParameters: [
      {
        name: "woId",
        dataType: "STRING",
        value: woId,
      },
      {
        name: "operId",
        dataType: "STRING",
        value: operId,
      },
      {
        name: "seqNo",
        dataType: "INT",
        value: seqNo,
      },
    ],
    columns: [],
    filter: null,
  };
};

const screen_of_start_btn = ({ woId, operId, seqNo }) => {
  console.log("woId, operId, seqNo", woId, operId, seqNo);
  return {
    ExecutionType: 1,
    RuleId: "InicioOperacion",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      items: [
        {
          woId,
          operId,
          seqNo,
          duracionLimpieza: 0, // Dejar así, el back necesita recibir este parámetro /,
          tipoLimpieza: "", // Dejar así, el back necesita recibir este parámetro /,
        },
      ],
    },
  };
};

const screen_of_pause_btn = ({ woId, operId, seqNo }) => {
  return {
    ExecutionType: 1,
    RuleId: "PausaOperacion",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      items: [
        {
          woId,
          operId,
          seqNo,
        },
      ],
    },
  };
};
const screen_of_stop_btn = ({ woId, operId, seqNo }) => {
  return {
    ExecutionType: 1,
    RuleId: "FinOperacion",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      woId,
      operId,
      seqNo,
    },
  };
};

const screen_cleaning_stop_btn = ({ arr_items }) => {
  return {
    ExecutionType: 1,
    RuleId: "FinOperacionLimpieza",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      items: arr_items,
    },
  };
};

const screen_cleaning_cancel_btn = ({ arr_items }) => {
  return {
    ExecutionType: 1,
    RuleId: "CancelarOperacionLimpieza",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      items: arr_items,
    },
  };
};
//deprecated
/* const get_order_detail = ({ filters }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "DetalleOrdenes",
    columns: [],
    filter: {
      filterExpression: {
        filters: filters,
        filterExpressionType: "AND",
        negationFilterExpression: false,
      },
      filterItem: null,
    },
  };
}; */

const get_order_details = ({ operId, woId, seqNo }) => {
  return {
    dbDataSetName: "DetalleOrdenesWoIdOperIdSeqNo",
    dbQueryParameters: [
      {
        name: "oper_id",
        dataType: "STRING",
        value: operId,
      },
      {
        name: "wo_id",
        dataType: "STRING",
        value: woId,
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

/** MEMORY DB */
const tab_materials_init = ({ operId, entId, woId, seqNo }) => {
  return {
    dbDataSetName: "MaterialesAprovisionamiento",
    dbQueryParameters: [
      {
        name: "oper_id",
        dataType: "String",
        value: operId,
      },
      {
        name: "ent_id",
        dataType: "INT",
        value: entId,
      },
      {
        name: "wo_id",
        dataType: "String",
        value: woId,
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

const tab_materials_provisioning_request = ({
  lineaName,
  woId,
  operId,
  items,
}) => {
  return {
    ExecutionType: 1,
    RuleId: "SolicitudAprovisionamiento",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      lineaName,
      woId,
      operId,
      items,
    },
  };
};

const tab_materials_load = ({ woId, operId, seqNo, entId }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "Carga",
    columns: [],
    filter: {
      filterExpression: {
        filters: [
          {
            filterExpression: {
              filters: [
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
              ],
              filterExpressionType: "AND",
              negationFilterExpression: false,
            },
            filterItem: null,
          },
          {
            filterExpression: {
              filters: [
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
                    column: "StorageEntId",
                    dataType: "INT",
                    value: entId,
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
              ],
              filterExpressionType: "AND",
              negationFilterExpression: false,
            },
            filterItem: null,
          },
        ],
        filterExpressionType: "OR",
        negationFilterExpression: false,
      },
      filterItem: null,
    },
  };
};

/** MEMORY DB */
const possible_peaks = (parametersArray) => {
  return {
    dbDataSetName: "PosiblesPicos",
    dbQueryParameters: parametersArray,
    columns: [],
    filter: null,
  };
};

const tab_materials_charge_machine = ({
  lineaId,
  matricula,
  woId,
  operId,
  seqNo,
}) => {
  return {
    ExecutionType: 1,
    RuleId: "CargaMaquina",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      lineaId,
      matricula,
      woId,
      operId,
      seqNo,

      /*       "pieMaquinaName": "Pie de Maquina 01",
      "pieMaquinaId": 1071,
      "itemId": "i12",
      "lotNo": "lote20", */
    },
  };
};

/**leer matricula */
const tab_materials_read_enrollment = ({ matricula }) => {
  return {
    ExecutionType: 1,
    RuleId: "LeerMatricula",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      matricula,
    },
  };
};
//DEPRECATED
/* const tab_consumptions_init = ({ filters_arr }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "Consumos",
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
}; */

/** MEMORY DB */
const tab_consumptions = ({ entId, woId, operId, seqNo }) => {
  return {
    dbDataSetName: "ConsumosDataSet",
    dbQueryParameters: [
      {
        name: "ent_id",
        dataType: "INT",
        value: entId,
      },
      {
        name: "wo_id",
        dataType: "STRING",
        value: woId,
      },
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

const tab_consumptions_correction = ({
  woId,
  operId,
  entId,
  itemId,
  lotNo,
  seqNo,
  quantity,
  rowId,
  sublotNo,
  fromEntId,
}) => {
  return {
    ExecutionType: 1,
    RuleId: "ConsumoCorreccion",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      woId,
      operId,
      entId,
      itemId,
      lotNo,
      seqNo,
      quantity,
      rowId,
      sublotNo,
      fromEntId,
    },
  };
};

const tab_peak_generation = ({
  matriculaPico,
  woId,
  operId,
  seqNo,
  entId,
  itemId,
  lotNo,
  sublotNo,
  rowId,
  fromEntId,
  quantityPico,
}) => {
  return {
    ExecutionType: 1,
    RuleId: "GenerarPico",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      matriculaPico,
      woId,
      operId,
      seqNo,
      entId,
      itemId,
      lotNo,
      sublotNo,
      rowId,
      fromEntId,
      quantityPico,
    },
  };
};

const tab_productions_new_container = ({
  woId,
  operId,
  entId,
  itemId,
  quantity,
  matricula,
  seqNo,
}) => {
  return {
    ExecutionType: 1,
    RuleId: "ProduccionContenedor",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      woId,
      operId,
      entId,
      itemId,
      quantity,
      matricula,
      seqNo,
    },
  };
};
const empty_container_request = ({ woId, operId, lineaName }) => {
  return {
    ExecutionType: 1,
    RuleId: "SolicitudContenedorVacio",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      woId,
      lineaName,
      operId,
    },
  };
};

/** MEMORY DB */
//DEPRECATED
/* const tab_productions_init = ({ name, dataType, value }) => {
  return {
    dbDataSetName: "Producciones",
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
};  */

//DEPRECATED
/* const tab_productions_data = ({ filters_arr }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "ProductionData",
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
const tab_productions = ({ entId, woId, operId, seqNo }) => {
  return {
    dbDataSetName: "ProductionDataDataSet",
    dbQueryParameters: [
      {
        name: "ent_id",
        dataType: "INT",
        value: entId,
      },
      {
        name: "wo_id",
        dataType: "STRING",
        value: woId,
      },
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

const tab_production_add = ({ woId, operId, seqNo, quantity }) => {
  return {
    ExecutionType: 1,
    RuleId: "ProduccionManual",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      woId,
      operId,
      seqNo,
      quantity,
    },
  };
};

const tab_productions_correction = ({
  woId,
  operId,
  seqNo,
  entId,
  itemId,
  toEntName,
  lotNo,
  sublotNo,
  quantity,
  rowId,
  lastEditAt,
  createdAtUtc,
}) => {
  return {
    ExecutionType: 1,
    RuleId: "ProduccionCorreccion",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      woId,
      operId,
      seqNo,
      entId,
      itemId,
      toEntName,
      lotNo,
      sublotNo,
      quantity,
      rowId,
      lastEditAt,
      createdAtUtc,
    },
  };
};

const tab_wastage_add = ({ woId, operId, quantity, seqNo }) => {
  return {
    ExecutionType: 1,
    RuleId: "Merma",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      woId,
      operId,
      quantity,
      seqNo,
    },
  };
};

/* DEPRECATED */
/* 
const tab_quality_get_samples = ({ filter }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "_sp_037_SA_Sample",
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
}; */

const get_pending_samples = ({ entId, woId, operId, seqNo, itemId }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "SamplesPendientesDataframe",
    columns: [],
    filter: {
      filterExpression: {
        filters: [
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
              value: itemId,
              filterItemType: "Equal",
              checkDBNull: false,
            },
          },
          /* {
          filterExpression: null,
          filterItem: {
            column: "Autocontrol",
            dataType: "STRING",
            value: "L", //hardcoded, dejar así
            filterItemType: "NotEqual",
            checkDBNull: false,
          },
        }, */
        ],
        filterExpressionType: "AND",
        negationFilterExpression: false,
      },
      filterItem: null,
    },
  };
};

const all_samples = ({ entId, woId, operId, seqNo, itemId }) => {
  return {
    dbDataSetName: "SamplesAll_Dataset",
    dbQueryParameters: [
      {
        name: "sample_id",
        dataType: "INT",
        value: null,
      },
      {
        name: "sample_name",
        dataType: "STRING",
        value: null,
      },
      {
        name: "ent_id",
        dataType: "INT",
        value: entId,
      },
      {
        name: "item_id",
        dataType: "STRING",
        value: itemId,
      },
      {
        name: "wo_id",
        dataType: "STRING",
        value: woId,
      },
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

      {
        name: "sample_status",
        dataType: "INT",
        value: null,
      },
      {
        name: "freq_id",
        dataType: "INT",
        value: null,
      },
      {
        name: "plan_id",
        dataType: "INT",
        value: null,
      },
    ],
    columns: [],
    filter: null,
  };
};

const tab_quality_generate_sample = ({
  itemId,
  woId,
  operId,
  entName,
  seqNo,
  qmSpecName,
}) => {
  return {
    ExecutionType: 1,
    RuleId: "GenerateSample",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      itemId,
      woId,
      operId,
      entName,
      seqNo,
      qmSpecName, //Qm_spec
    },
  };
};

/** MEMORY DB */
const tab_quality_get_attributes = ({ attrId }) => {
  return {
    dbDataSetName: "AttrCualitativos",
    dbQueryParameters: [
      {
        name: "attrId",
        dataType: "INT",
        value: attrId,
      },
    ],
    columns: [],
    filter: null,
  };
};

/** MEMORY DB */
const tab_quality_get_attributes_by_desc = () => {
  return {
    dbDataSetName: "AttrCualitativosPorDescripcion",
    dbQueryParameters: [
      {
        name: "attr_desc",
        dataType: "String",
        value: "Bascula",
      },
    ],
    columns: [],
    filter: null,
  };
};

/** MEMORY DB */
const tab_quality_get_results = ({ sampleId }) => {
  return {
    dbDataSetName: "_SP_018_S_results",
    dbQueryParameters: [
      {
        name: "sample_id",
        dataType: "INT",
        value: sampleId,
      },
    ],
    columns: [],
    filter: null,
  };
};

/** MEMORY DB deprecated*/
/* const tab_quality_get_qmspec_by_item = ({ itemId }) => {
  return {
    dbDataSetName: "GetQmSpecByItem",
    dbQueryParameters: [
      {
        name: "itemid",
        dataType: "STRING",
        value: itemId,
      },
    ],
    columns: [],
    filter: null,
  };
}; */

/** MEMORY DB */
const tab_quality_get_qmspec_by_filter = ({ itemId }) => {
  return {
    dbDataSetName: "QmSpecByFilter",
    dbQueryParameters: [
      {
        name: "item_id",
        dataType: "STRING",
        value: itemId,
      },
    ],
    columns: [],
    filter: {
      filterExpression: {
        filters: [
          {
            filterExpression: null,
            filterItem: {
              column: "spare1",
              dataType: "String",
              value: "A",
              filterItemType: "Equal",
              checkDBNull: false,
            },
          },
          {
            filterExpression: null,
            filterItem: {
              column: "spare1",
              dataType: "String",
              value: "CM",
              filterItemType: "Equal",
              checkDBNull: false,
            },
          },
        ],
        filterExpressionType: "OR",
        negationFilterExpression: false,
      },
      filterItem: null,
    },
  };
};

const tab_quality_save_results = (samples) => {
  return {
    ExecutionType: 1,
    RuleId: "SaveSampleResults",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      usuario: "12345",
      sesion: 0,
      samples: samples,
    },
  };
};

const screen_cleaning_container = () => {
  return {
    ExecutionType: 1,
    RuleId: "PantallaLimpiezaContenedor",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {},
  };
};

/** MEMORY DB DEPRECATED*/
/* const screen_cleaning_monthly_order = ({ entId }) => {
  return {
    dbDataSetName: "OrdenesLimpieza",
    dbQueryParameters: [
      {
        name: "ent",
        dataType: "INT",
        value: entId,
      },
    ],
    columns: [],
    filter: null,
  };
}; */

const get_cleaning_orders = ({ filter }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "OrdenesLimpiezaDataFrame",
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

/** MEMORY DB */
const screen_of_last_cleaning = ({ entId }) => {
  return {
    dbDataSetName: "UltimaLimpieza",
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

/** MEMORY DB deprecated*/
/* const screen_ofdetail_oee_real = (ent_id) => {
  return {
    dbDataSetName: "OeeReal",
    dbQueryParameters: [ent_id],
    columns: [],
    filter: null,
  };
}; */

const get_oee_real = ({ filter }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "OeeRealDataFrame",
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

/** MEMORY DB deprecated*/
/* const screen_ofdetail_oee_shift = ({ entId }) => {
  return {
    dbDataSetName: "OeeShift",
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
 */
const get_oee_shift = ({ filter }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "OEECurrentShift",
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
//DEPRECATED
/* const screen_ofdetail_util_shift = ({ name, dataType, value }) => {
  return {
    dbDataSetName: "UtilShift",
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
}; */

const get_utilshift = ({ filter }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "UtilShiftDataFrame",
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

/** MEMORY DB */
const tavil_send = (entId) => {
  return {
    dbDataSetName: "EnvioTavil",
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

const read_coil = ({ matriculaBobina }) => {
  return {
    ExecutionType: 1,
    RuleId: "LeerBobina",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      matricula: matriculaBobina,
    },
  };
};

const read_signal_class = ({ matricula }) => {
  return {
    ExecutionType: 1,
    RuleId: "LeerClasseSenyal",
    RuleVersion: 1,
    EventStamp: moment().format(),
    Parameters: {
      matricula,
    },
  };
};

const read_specs = () => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "Spec",
    columns: [],
    filter: null,
  };
};

const oee_targets = ({ filter }) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "OEETargets",
    columns: [],
    filter,
  };
};

const get_documentation_data = (filters) => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "Documentacion",
    columns: [],
    filter: {
      filterExpression: {
        filters: filters,
        filterExpressionType: "OR",
        negationFilterExpression: false,
      },
      filterItem: null,
    },
  };
};

const tab_of_planification = ({ entId }) => {
  return {
    dbDataSetName: "OrdenesSiguientesLinea",
    dbQueryParameters: [
      {
        name: "entId",
        dataType: "INT",
        value: entId,
      },
    ],
    columns: [],
    filter: null,
  };
};
const tab_of_reprint = ({ entId }) => {
  return {
    dbDataSetName: "ReimpresionEtiquetas",
    dbQueryParameters: [
      {
        name: "entId",
        dataType: "INT",
        value: entId,
      },
    ],
    columns: [],
    filter: null,
  };
};

const sections_available_sequencing = () => {
  return {
    dbDataSetName: "OperacionesSecuenciacionDataSet",
    dbQueryParameters: [],
    columns: [],
    filter: null,
  };
};

const get_data_create_order = () => {
  return {
    clientName: "CLIENTE_WEB",
    dataFrameName: "CreadorOrdenes_DataFrame",
    columns: [],
    filter: null,
  };
};

export {
  screen_of_detail,
  tab_of_parameters,
  screen_of_start_btn,
  screen_of_pause_btn,
  screen_of_stop_btn,
  screen_cleaning_stop_btn,
  screen_cleaning_cancel_btn,
  /*  get_order_detail, */
  get_order_details,
  tab_materials_init,
  tab_materials_provisioning_request,
  tab_materials_load,
  possible_peaks,
  tab_materials_charge_machine,
  tab_materials_read_enrollment,
  /*  tab_consumptions_init, */
  tab_consumptions,
  tab_consumptions_correction,
  tab_peak_generation,
  /*   tab_productions_init, */
  /*   tab_productions_data, */
  tab_productions,
  tab_productions_new_container,
  tab_production_add,
  tab_productions_correction,
  empty_container_request,
  tab_wastage_add,
  /*   tab_quality_get_samples, */
  get_pending_samples,
  all_samples,
  tab_quality_generate_sample,
  tab_quality_get_attributes,
  tab_quality_get_attributes_by_desc,
  tab_quality_get_results,
  tab_quality_save_results,
  /*   tab_quality_get_qmspec_by_item, */
  tab_quality_get_qmspec_by_filter,
  screen_cleaning_container,
  /*   screen_cleaning_monthly_order, */
  get_cleaning_orders,
  screen_of_last_cleaning,
  /*   screen_ofdetail_oee_real, */
  get_oee_real,
  /*   screen_ofdetail_oee_shift, */
  get_oee_shift,
  /*   screen_ofdetail_util_order, */
  /* screen_ofdetail_util_shift, */
  get_utilshift,
  /* screen_ofdetail_util_actual, */
  tavil_send,
  read_coil,
  read_signal_class,
  read_specs,
  oee_targets,
  get_documentation_data,
  tab_of_planification,
  tab_of_reprint,
  sections_available_sequencing,
  get_data_create_order,
};
