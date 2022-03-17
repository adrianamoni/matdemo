import moment from "moment";

export const getSEMI001 = (qtyReqd) => {
  const getDate = moment().format();
  const woId = `ADVANCED_FACTORIES_${getDate}`;
  let duration = (66.66 / 1000) * qtyReqd;
  duration = duration / 0.59;
  return {
    ExecutionType: 1,
    RuleId: "SAPRecepcionOrdenes",
    RuleVersion: 1,
    EventStamp: "2022-03-03T14:01:01",
    Parameters: {
      ordenes: {
        wo: [
          {
            woId: `${woId}`,
            woDesc: `Orden Semi ${woId}`,
            itemId: "SEMI001",
            reqQty: qtyReqd,
            releaseTimeLocal: getDate,
            loteInspeccion: "0",
            ean13: "EAN13",
            ean14: "EAN14",
            job: [
              {
                operId: "AreaSemielaborado",
                jobDesc: "Semielavorado",
                itemId: "SEMI001",
                initSchedEntName: "AreaSemielaborado",
                targetSchedEntName: "AreaSemielaborado",
                qtyReqd: qtyReqd,
                duracion: duration,
                factorOEE: 0.59,
                personas: 1,
                velocidad: 66.66,
                posiblesVelocidades: [
                  {
                    personas: 1,
                    velocidad: 66.66,
                  },
                  {
                    personas: 2,
                    velocidad: 33.33,
                  },
                  {
                    personas: 3,
                    velocidad: 22.22,
                  },
                  {
                    personas: 4,
                    velocidad: 11.1,
                  },
                ],
                bom: [
                  {
                    itemClassId: "MPR",
                    bomPos: 1,
                    itemId: "MP001",
                    qtyPerParentItem: 50.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                  {
                    itemClassId: "MPR",
                    bomPos: 2,
                    itemId: "MP002",
                    qtyPerParentItem: 30.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                  {
                    itemClassId: "MPR",
                    bomPos: 3,
                    itemId: "MP003",
                    qtyPerParentItem: 15.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                  {
                    itemClassId: "MPR",
                    bomPos: 4,
                    itemId: "MP004",
                    qtyPerParentItem: 5.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                ],
              },
              {
                operId: "NETEJA",
              },
            ],
          },
        ],
      },
    },
  };
};
export const getPA001 = (qtyReqd) => {
  const getDate = moment().format();
  const woId = `ADVANCED_FACTORIES_${getDate}`;
  let duration = (66.66 / 1000) * qtyReqd;
  duration = duration / 0.59;
  return {
    ExecutionType: 1,
    RuleId: "SAPRecepcionOrdenes",
    RuleVersion: 1,
    EventStamp: "2022-03-03T14:01:01",
    Parameters: {
      ordenes: {
        wo: [
          {
            woId: `${woId}`,
            woDesc: `Orden PA001 ${woId}`,
            itemId: "PA001",
            reqQty: qtyReqd,
            releaseTimeLocal: getDate,
            loteInspeccion: "0",
            ean13: "EAN13",
            ean14: "EAN14",
            job: [
              {
                operId: "AreaEnvasado",
                jobDesc: "Envasado PA001",
                itemId: "PA001",
                initSchedEntName: "AreaEnvasado",
                targetSchedEntName: "AreaEnvasado",
                qtyReqd: qtyReqd,
                duracion: duration,
                factorOEE: 0.59,
                personas: 1,
                velocidad: 66.66,
                posiblesVelocidades: [
                  {
                    personas: 1,
                    velocidad: 66.66,
                  },
                  {
                    personas: 2,
                    velocidad: 33.33,
                  },
                  {
                    personas: 3,
                    velocidad: 22.22,
                  },
                  {
                    personas: 4,
                    velocidad: 11.1,
                  },
                ],
                bom: [
                  {
                    itemClassId: "SEM",
                    bomPos: 1,
                    itemId: "SEMI001",
                    qtyPerParentItem: 625.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                  {
                    itemClassId: "BOL",
                    bomPos: 2,
                    itemId: "BOLSA001",
                    qtyPerParentItem: 2500.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                  {
                    itemClassId: "ETI",
                    bomPos: 3,
                    itemId: "ETIQUETACAJA001",
                    qtyPerParentItem: 100.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                  {
                    itemClassId: "CAJ",
                    bomPos: 4,
                    itemId: "CAJA001",
                    qtyPerParentItem: 100.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                ],
              },
              {
                operId: "NETEJA",
              },
            ],
          },
        ],
      },
    },
  };
};

export const getPA002 = (qtyReqd) => {
  const getDate = moment().format();
  const woId = `ADVANCED_FACTORIES_${getDate}`;
  let duration = (66.66 / 1000) * qtyReqd;
  duration = duration / 0.59;
  return {
    ExecutionType: 1,
    RuleId: "SAPRecepcionOrdenes",
    RuleVersion: 1,
    EventStamp: "2022-03-03T14:01:01",
    Parameters: {
      ordenes: {
        wo: [
          {
            woId: `${woId}`,
            woDesc: `Orden PA002 ${woId}`,
            itemId: "PA002",
            reqQty: qtyReqd,
            releaseTimeLocal: getDate,
            loteInspeccion: "0",
            ean13: "EAN13",
            ean14: "EAN14",
            job: [
              {
                operId: "AreaEnvasado",
                jobDesc: "Envasado PA002",
                itemId: "PA002",
                initSchedEntName: "AreaEnvasado",
                targetSchedEntName: "AreaEnvasado",
                qtyReqd: qtyReqd,
                duracion: duration,
                factorOEE: 0.59,
                personas: 1,
                velocidad: 66.66,
                posiblesVelocidades: [
                  {
                    personas: 1,
                    velocidad: 66.66,
                  },
                  {
                    personas: 2,
                    velocidad: 33.33,
                  },
                  {
                    personas: 3,
                    velocidad: 22.22,
                  },
                  {
                    personas: 4,
                    velocidad: 11.1,
                  },
                ],
                bom: [
                  {
                    itemClassId: "SEM",
                    bomPos: 1,
                    itemId: "SEMI001",
                    qtyPerParentItem: 750.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                  {
                    itemClassId: "BOL",
                    bomPos: 2,
                    itemId: "BOLSA002",
                    qtyPerParentItem: 1500.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                  {
                    itemClassId: "ETI",
                    bomPos: 3,
                    itemId: "ETIQUETACAJA001",
                    qtyPerParentItem: 100.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                  {
                    itemClassId: "CAJ",
                    bomPos: 4,
                    itemId: "CAJA002",
                    qtyPerParentItem: 100.0,
                    backflush: false,
                    jobBomSubst: [],
                  },
                ],
              },
              {
                operId: "NETEJA",
              },
            ],
          },
        ],
      },
    },
  };
};
