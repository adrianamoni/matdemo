import moment from 'moment';
export const fakeData3 = 
  [
      {
          "entId": 125,
          "entName": "FSECBOLA",
          "entDesc": "Tostador Bola 02",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 107,
                  "entName": "FSB01",
                  "description": "FSB01",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 108,
                  "entName": "FSB02",
                  "description": "FSB02",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 127,
          "entName": "FSECCINT",
          "entDesc": "Tostador Cinta 02",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 109,
                  "entName": "FSC01",
                  "description": "FSC01",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 110,
                  "entName": "FSC02",
                  "description": "FSC02",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 124,
          "entName": "FSECCOCT",
          "entDesc": "Coctelera Frutos Secos 3",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 121,
                  "entName": "FSQ01",
                  "description": "FSQ01",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 122,
                  "entName": "FSQ02",
                  "description": "FSQ02",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 101,
                  "entName": "FSQ03",
                  "description": "FSQ03",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 131,
          "entName": "FSECDESE",
          "entDesc": "Desembalar Frutos Secos 5",
          "ordenes": [
              {
                  "WoId": "000001336227",
                  "OperId": "FSECDESE",
                  "SeqNo": 0,
                  "RowId": 262,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 131,
                  "target_EntId": 112,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 2,
                  "StateCdDesc": "Ready",
                  "ItemId": "000000000000075745",
                  "ItemDesc": "MARCONA 14/16 CRU DESEMBALADA",
                  "QtyReqd": 2000,
                  "Duracion": 30,
                  "Personas": 1,
                  "posiblesVelocidades": [
                      {
                          "personas": 1,
                          "velocidad": 15
                      }
                  ],
                  "SchedStartTimeLocal": "2021-07-28T05:22:11",
                  "SchedFinishTimeLocal": "2021-07-28T06:07:11",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-28T06:54:14",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSD01",
                          "LineaName": "FSD01",
                          "LineaId": 112
                      },
                      {
                          "LineaDesc": "FSD02",
                          "LineaName": "FSD02",
                          "LineaId": 113
                      },
                      {
                          "LineaDesc": "FSD03",
                          "LineaName": "FSD03",
                          "LineaId": 114
                      },
                      {
                          "LineaDesc": "FSD04",
                          "LineaName": "FSD04",
                          "LineaId": 115
                      },
                      {
                          "LineaDesc": "FSD05",
                          "LineaName": "FSD05",
                          "LineaId": 116
                      }
                  ]
              },
              {
                  "WoId": "000001336227",
                  "OperId": "NETEJA",
                  "SeqNo": 0,
                  "RowId": 263,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 131,
                  "target_EntId": 112,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 2,
                  "StateCdDesc": "Ready",
                  "ItemId": "000000000000075745",
                  "ItemDesc": "MARCONA 14/16 CRU DESEMBALADA",
                  "QtyReqd": 1,
                  "Duracion": 15,
                  "Personas": 1,
                  "posiblesVelocidades": [],
                  "SchedStartTimeLocal": "2021-07-28T06:07:11",
                  "SchedFinishTimeLocal": "2021-07-28T06:22:11",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-28T06:54:14",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSD01",
                          "LineaName": "FSD01",
                          "LineaId": 112
                      },
                      {
                          "LineaDesc": "FSD02",
                          "LineaName": "FSD02",
                          "LineaId": 113
                      },
                      {
                          "LineaDesc": "FSD03",
                          "LineaName": "FSD03",
                          "LineaId": 114
                      },
                      {
                          "LineaDesc": "FSD04",
                          "LineaName": "FSD04",
                          "LineaId": 115
                      },
                      {
                          "LineaDesc": "FSD05",
                          "LineaName": "FSD05",
                          "LineaId": 116
                      }
                  ]
              }
          ],
          "lineas": [
              {
                  "entId": 112,
                  "entName": "FSD01",
                  "description": "FSD01",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 113,
                  "entName": "FSD02",
                  "description": "FSD02",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 114,
                  "entName": "FSD03",
                  "description": "FSD03",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 115,
                  "entName": "FSD04",
                  "description": "FSD04",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 116,
                  "entName": "FSD05",
                  "description": "FSD05",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 38,
          "entName": "FSECENVA",
          "entDesc": "L72 Envasadora Frutos Secos",
          "ordenes": [
              {
                  "WoId": "000001336229",
                  "OperId": "FSECENVA",
                  "SeqNo": 0,
                  "RowId": 265,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 38,
                  "target_EntId": 36,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 2,
                  "StateCdDesc": "Ready",
                  "ItemId": "000000000000311029",
                  "ItemDesc": "MARCONA REP. 14/16 CRUDA 6XB.1K",
                  "QtyReqd": 1225,
                  "Duracion": 40.425,
                  "Personas": 2,
                  "posiblesVelocidades": [
                      {
                          "personas": 1,
                          "velocidad": 67
                      },
                      {
                          "personas": 2,
                          "velocidad": 33
                      }
                  ],
                  "SchedStartTimeLocal": "2021-07-28T10:50:00",
                  "SchedFinishTimeLocal": "2021-07-28T11:42:25",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-28T12:56:56",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "L024",
                          "LineaName": "L024",
                          "LineaId": 66
                      },
                      {
                          "LineaDesc": "L025",
                          "LineaName": "L025",
                          "LineaId": 29
                      },
                      {
                          "LineaDesc": "L026",
                          "LineaName": "L026",
                          "LineaId": 36
                      },
                      {
                          "LineaDesc": "L027",
                          "LineaName": "L027",
                          "LineaId": 37
                      },
                      {
                          "LineaDesc": "L041",
                          "LineaName": "L041",
                          "LineaId": 24
                      },
                      {
                          "LineaDesc": "L042",
                          "LineaName": "L042",
                          "LineaId": 25
                      },
                      {
                          "LineaDesc": "L043",
                          "LineaName": "L043",
                          "LineaId": 26
                      },
                      {
                          "LineaDesc": "L044",
                          "LineaName": "L044",
                          "LineaId": 27
                      },
                      {
                          "LineaDesc": "L045",
                          "LineaName": "L045",
                          "LineaId": 30
                      },
                      {
                          "LineaDesc": "L046",
                          "LineaName": "L046",
                          "LineaId": 31
                      },
                      {
                          "LineaDesc": "L063",
                          "LineaName": "L063",
                          "LineaId": 203
                      },
                      {
                          "LineaDesc": "L065",
                          "LineaName": "L065",
                          "LineaId": 204
                      },
                      {
                          "LineaDesc": "L071",
                          "LineaName": "L071",
                          "LineaId": 67
                      },
                      {
                          "LineaDesc": "L072",
                          "LineaName": "L072",
                          "LineaId": 68
                      }
                  ]
              },
              {
                  "WoId": "000001336229",
                  "OperId": "NETEJA",
                  "SeqNo": 0,
                  "RowId": 266,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 38,
                  "target_EntId": 36,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 2,
                  "StateCdDesc": "Ready",
                  "ItemId": "000000000000311029",
                  "ItemDesc": "MARCONA REP. 14/16 CRUDA 6XB.1K",
                  "QtyReqd": 1,
                  "Duracion": 12,
                  "Personas": 1,
                  "posiblesVelocidades": [],
                  "SchedStartTimeLocal": "2021-07-28T11:42:25",
                  "SchedFinishTimeLocal": "2021-07-28T11:54:25",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-28T12:56:56",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "L024",
                          "LineaName": "L024",
                          "LineaId": 66
                      },
                      {
                          "LineaDesc": "L025",
                          "LineaName": "L025",
                          "LineaId": 29
                      },
                      {
                          "LineaDesc": "L026",
                          "LineaName": "L026",
                          "LineaId": 36
                      },
                      {
                          "LineaDesc": "L027",
                          "LineaName": "L027",
                          "LineaId": 37
                      },
                      {
                          "LineaDesc": "L041",
                          "LineaName": "L041",
                          "LineaId": 24
                      },
                      {
                          "LineaDesc": "L042",
                          "LineaName": "L042",
                          "LineaId": 25
                      },
                      {
                          "LineaDesc": "L043",
                          "LineaName": "L043",
                          "LineaId": 26
                      },
                      {
                          "LineaDesc": "L044",
                          "LineaName": "L044",
                          "LineaId": 27
                      },
                      {
                          "LineaDesc": "L045",
                          "LineaName": "L045",
                          "LineaId": 30
                      },
                      {
                          "LineaDesc": "L046",
                          "LineaName": "L046",
                          "LineaId": 31
                      },
                      {
                          "LineaDesc": "L063",
                          "LineaName": "L063",
                          "LineaId": 203
                      },
                      {
                          "LineaDesc": "L065",
                          "LineaName": "L065",
                          "LineaId": 204
                      },
                      {
                          "LineaDesc": "L071",
                          "LineaName": "L071",
                          "LineaId": 67
                      },
                      {
                          "LineaDesc": "L072",
                          "LineaName": "L072",
                          "LineaId": 68
                      }
                  ]
              },
              {
                  "WoId": "000001336230",
                  "OperId": "FSECENVA",
                  "SeqNo": 0,
                  "RowId": 267,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 38,
                  "target_EntId": 66,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 2,
                  "StateCdDesc": "Ready",
                  "ItemId": "000000000000311029",
                  "ItemDesc": "MARCONA REP. 14/16 CRUDA 6XB.1K",
                  "QtyReqd": 3500,
                  "Duracion": 115.5,
                  "Personas": 2,
                  "posiblesVelocidades": [
                      {
                          "personas": 1,
                          "velocidad": 67
                      },
                      {
                          "personas": 2,
                          "velocidad": 33
                      }
                  ],
                  "SchedStartTimeLocal": "2021-07-28T11:00:00",
                  "SchedFinishTimeLocal": "2021-07-28T13:07:30",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-28T12:56:56",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "L024",
                          "LineaName": "L024",
                          "LineaId": 66
                      },
                      {
                          "LineaDesc": "L025",
                          "LineaName": "L025",
                          "LineaId": 29
                      },
                      {
                          "LineaDesc": "L026",
                          "LineaName": "L026",
                          "LineaId": 36
                      },
                      {
                          "LineaDesc": "L027",
                          "LineaName": "L027",
                          "LineaId": 37
                      },
                      {
                          "LineaDesc": "L041",
                          "LineaName": "L041",
                          "LineaId": 24
                      },
                      {
                          "LineaDesc": "L042",
                          "LineaName": "L042",
                          "LineaId": 25
                      },
                      {
                          "LineaDesc": "L043",
                          "LineaName": "L043",
                          "LineaId": 26
                      },
                      {
                          "LineaDesc": "L044",
                          "LineaName": "L044",
                          "LineaId": 27
                      },
                      {
                          "LineaDesc": "L045",
                          "LineaName": "L045",
                          "LineaId": 30
                      },
                      {
                          "LineaDesc": "L046",
                          "LineaName": "L046",
                          "LineaId": 31
                      },
                      {
                          "LineaDesc": "L063",
                          "LineaName": "L063",
                          "LineaId": 203
                      },
                      {
                          "LineaDesc": "L065",
                          "LineaName": "L065",
                          "LineaId": 204
                      },
                      {
                          "LineaDesc": "L071",
                          "LineaName": "L071",
                          "LineaId": 67
                      },
                      {
                          "LineaDesc": "L072",
                          "LineaName": "L072",
                          "LineaId": 68
                      }
                  ]
              },
              {
                  "WoId": "000001336230",
                  "OperId": "NETEJA",
                  "SeqNo": 0,
                  "RowId": 268,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 38,
                  "target_EntId": 66,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 2,
                  "StateCdDesc": "Ready",
                  "ItemId": "000000000000311029",
                  "ItemDesc": "MARCONA REP. 14/16 CRUDA 6XB.1K",
                  "QtyReqd": 1,
                  "Duracion": 12,
                  "Personas": 1,
                  "posiblesVelocidades": [],
                  "SchedStartTimeLocal": "2021-07-28T13:07:30",
                  "SchedFinishTimeLocal": "2021-07-28T13:19:30",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-28T12:56:56",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "L024",
                          "LineaName": "L024",
                          "LineaId": 66
                      },
                      {
                          "LineaDesc": "L025",
                          "LineaName": "L025",
                          "LineaId": 29
                      },
                      {
                          "LineaDesc": "L026",
                          "LineaName": "L026",
                          "LineaId": 36
                      },
                      {
                          "LineaDesc": "L027",
                          "LineaName": "L027",
                          "LineaId": 37
                      },
                      {
                          "LineaDesc": "L041",
                          "LineaName": "L041",
                          "LineaId": 24
                      },
                      {
                          "LineaDesc": "L042",
                          "LineaName": "L042",
                          "LineaId": 25
                      },
                      {
                          "LineaDesc": "L043",
                          "LineaName": "L043",
                          "LineaId": 26
                      },
                      {
                          "LineaDesc": "L044",
                          "LineaName": "L044",
                          "LineaId": 27
                      },
                      {
                          "LineaDesc": "L045",
                          "LineaName": "L045",
                          "LineaId": 30
                      },
                      {
                          "LineaDesc": "L046",
                          "LineaName": "L046",
                          "LineaId": 31
                      },
                      {
                          "LineaDesc": "L063",
                          "LineaName": "L063",
                          "LineaId": 203
                      },
                      {
                          "LineaDesc": "L065",
                          "LineaName": "L065",
                          "LineaId": 204
                      },
                      {
                          "LineaDesc": "L071",
                          "LineaName": "L071",
                          "LineaId": 67
                      },
                      {
                          "LineaDesc": "L072",
                          "LineaName": "L072",
                          "LineaId": 68
                      }
                  ]
              },
              {
                  "WoId": "000001336231",
                  "OperId": "NETEJA",
                  "SeqNo": 0,
                  "RowId": 270,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 38,
                  "target_EntId": 36,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 3,
                  "StateCdDesc": "Running",
                  "ItemId": "000000000000510206",
                  "ItemDesc": "PIPA TOS 40G-10U",
                  "QtyReqd": 1,
                  "Duracion": 12,
                  "Personas": 0,
                  "posiblesVelocidades": [],
                  "SchedStartTimeLocal": "2021-07-28T10:18:49",
                  "SchedFinishTimeLocal": "2021-07-28T10:30:49",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-28T10:49:12",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "L024",
                          "LineaName": "L024",
                          "LineaId": 66
                      },
                      {
                          "LineaDesc": "L025",
                          "LineaName": "L025",
                          "LineaId": 29
                      },
                      {
                          "LineaDesc": "L026",
                          "LineaName": "L026",
                          "LineaId": 36
                      },
                      {
                          "LineaDesc": "L027",
                          "LineaName": "L027",
                          "LineaId": 37
                      },
                      {
                          "LineaDesc": "L041",
                          "LineaName": "L041",
                          "LineaId": 24
                      },
                      {
                          "LineaDesc": "L042",
                          "LineaName": "L042",
                          "LineaId": 25
                      },
                      {
                          "LineaDesc": "L043",
                          "LineaName": "L043",
                          "LineaId": 26
                      },
                      {
                          "LineaDesc": "L044",
                          "LineaName": "L044",
                          "LineaId": 27
                      },
                      {
                          "LineaDesc": "L045",
                          "LineaName": "L045",
                          "LineaId": 30
                      },
                      {
                          "LineaDesc": "L046",
                          "LineaName": "L046",
                          "LineaId": 31
                      },
                      {
                          "LineaDesc": "L063",
                          "LineaName": "L063",
                          "LineaId": 203
                      },
                      {
                          "LineaDesc": "L065",
                          "LineaName": "L065",
                          "LineaId": 204
                      },
                      {
                          "LineaDesc": "L071",
                          "LineaName": "L071",
                          "LineaId": 67
                      },
                      {
                          "LineaDesc": "L072",
                          "LineaName": "L072",
                          "LineaId": 68
                      }
                  ]
              }
          ],
          "lineas": [
              {
                  "entId": 66,
                  "entName": "L024",
                  "description": "L024",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 29,
                  "entName": "L025",
                  "description": "L025",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 36,
                  "entName": "L026",
                  "description": "L026",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 37,
                  "entName": "L027",
                  "description": "L027",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 24,
                  "entName": "L041",
                  "description": "L041",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 25,
                  "entName": "L042",
                  "description": "L042",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 26,
                  "entName": "L043",
                  "description": "L043",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 27,
                  "entName": "L044",
                  "description": "L044",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 30,
                  "entName": "L045",
                  "description": "L045",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 31,
                  "entName": "L046",
                  "description": "L046",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 203,
                  "entName": "L063",
                  "description": "L063",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 204,
                  "entName": "L065",
                  "description": "L065",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 67,
                  "entName": "L071",
                  "description": "L071",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 68,
                  "entName": "L072",
                  "description": "L072",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 129,
          "entName": "FSECFRCO",
          "entDesc": "Freidora Continua Frutos Secos",
          "ordenes": [
              {
                  "WoId": "000001336210",
                  "OperId": "FSECFRCO",
                  "SeqNo": 0,
                  "RowId": 155,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 2,
                  "StateCdDesc": "Ready",
                  "ItemId": "000000000000075985",
                  "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
                  "QtyReqd": 1000,
                  "Duracion": 66.666,
                  "Personas": 1,
                  "posiblesVelocidades": [
                      {
                          "personas": 1,
                          "velocidad": 66.666
                      }
                  ],
                  "SchedStartTimeLocal": "2021-08-03T10:00:00",
                  "SchedFinishTimeLocal": "2021-08-03T11:18:39",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-23T11:01:17",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
              {
                  "WoId": "000001336210",
                  "OperId": "NETEJA",
                  "SeqNo": 0,
                  "RowId": 156,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 2,
                  "StateCdDesc": "Ready",
                  "ItemId": "000000000000075985",
                  "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
                  "QtyReqd": 1,
                  "Duracion": 15,
                  "Personas": 1,
                  "posiblesVelocidades": [],
                  "SchedStartTimeLocal": "2021-08-03T11:18:39",
                  "SchedFinishTimeLocal": "2021-08-03T11:33:39",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-23T11:01:17",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
              {
                  "WoId": "000001336211",
                  "OperId": "FSECFRCO",
                  "SeqNo": 0,
                  "RowId": 157,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 2,
                  "StateCdDesc": "Ready",
                  "ItemId": "000000000000075985",
                  "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
                  "QtyReqd": 3500,
                  "Duracion": 233.331,
                  "Personas": 1,
                  "posiblesVelocidades": [
                      {
                          "personas": 1,
                          "velocidad": 66.666
                      }
                  ],
                  "SchedStartTimeLocal": "2021-08-03T12:00:00",
                  "SchedFinishTimeLocal": "2021-08-03T16:08:19",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-23T11:01:17",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
              {
                  "WoId": "000001336211",
                  "OperId": "NETEJA",
                  "SeqNo": 0,
                  "RowId": 158,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 2,
                  "StateCdDesc": "Ready",
                  "ItemId": "000000000000075985",
                  "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
                  "QtyReqd": 1,
                  "Duracion": 12,
                  "Personas": 1,
                  "posiblesVelocidades": [],
                  "SchedStartTimeLocal": "2021-08-03T16:08:19",
                  "SchedFinishTimeLocal": "2021-08-03T16:20:19",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-23T11:01:18",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
              {
                  "WoId": "000001336212",
                  "OperId": "FSECFRCO",
                  "SeqNo": 0,
                  "RowId": 159,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 1,
                  "StateCdDesc": "New",
                  "ItemId": "000000000000075987",
                  "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
                  "QtyReqd": 1000,
                  "Duracion": 66.666,
                  "Personas": 1,
                  "posiblesVelocidades": [
                      {
                          "personas": 1,
                          "velocidad": 66.666
                      }
                  ],
                  "SchedStartTimeLocal": "2021-08-03T17:00:00",
                  "SchedFinishTimeLocal": "2021-08-03T18:18:39",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-23T11:01:17",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
              {
                  "WoId": "000001336212",
                  "OperId": "NETEJA",
                  "SeqNo": 0,
                  "RowId": 160,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 1,
                  "StateCdDesc": "New",
                  "ItemId": "000000000000075987",
                  "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
                  "QtyReqd": 1,
                  "Duracion": 15,
                  "Personas": 1,
                  "posiblesVelocidades": [],
                  "SchedStartTimeLocal": "2021-08-03T18:18:39",
                  "SchedFinishTimeLocal": "2021-08-03T18:33:39",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-23T11:01:17",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
              {
                  "WoId": "000001336213",
                  "OperId": "FSECFRCO",
                  "SeqNo": 0,
                  "RowId": 161,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 1,
                  "StateCdDesc": "New",
                  "ItemId": "000000000000075985",
                  "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
                  "QtyReqd": 2500,
                  "Duracion": 166.665,
                  "Personas": 1,
                  "posiblesVelocidades": [
                      {
                          "personas": 1,
                          "velocidad": 66.666
                      }
                  ],
                  "SchedStartTimeLocal": "2021-08-03T19:00:00",
                  "SchedFinishTimeLocal": "2021-08-03T22:01:39",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-23T11:01:18",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
              {
                  "WoId": "000001336213",
                  "OperId": "NETEJA",
                  "SeqNo": 0,
                  "RowId": 162,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 1,
                  "StateCdDesc": "New",
                  "ItemId": "000000000000075985",
                  "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
                  "QtyReqd": 1,
                  "Duracion": 15,
                  "Personas": 1,
                  "posiblesVelocidades": [],
                  "SchedStartTimeLocal": "2021-08-03T22:01:39",
                  "SchedFinishTimeLocal": "2021-08-03T22:16:39",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-23T11:01:17",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
  
   
              /* {
                  "WoId": "000001336221",
                  "OperId": "FSECFRCO",
                  "SeqNo": 0,
                  "RowId": 187,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 30,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 1,
                  "StateCdDesc": "New",
                  "ItemId": "000000000000075985",
                  "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
                  "QtyReqd": 5222,
                  "Duracion": 348.129852,
                  "Personas": 1,
                  "posiblesVelocidades": [
                      {
                          "personas": 1,
                          "velocidad": 66.666
                      }
                  ],
                  "SchedStartTimeLocal": "2021-08-03T09:10:00",
                  "SchedFinishTimeLocal": "2021-08-03T11:12:00",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-08-03T11:01:19",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
              {
                  "WoId": "000001336221",
                  "OperId": "NETEJA",
                  "SeqNo": 0,
                  "RowId": 188,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 30,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 1,
                  "StateCdDesc": "New",
                  "ItemId": "000000000000075985",
                  "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
                  "QtyReqd": 1,
                  "Duracion": 15,
                  "Personas": 1,
                  "posiblesVelocidades": [],
                  "SchedStartTimeLocal": "2021-08-03T11:12:00",
                  "SchedFinishTimeLocal": "2021-08-03T11:27:00",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-08-03T11:01:19",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              }, */
              {
                  "WoId": "000001336222",
                  "OperId": "FSECFRCO",
                  "SeqNo": 0,
                  "RowId": 189,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 1,
                  "StateCdDesc": "New",
                  "ItemId": "000000000000075987",
                  "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
                  "QtyReqd": 1510,
                  "Duracion": 100.66566,
                  "Personas": 1,
                  "posiblesVelocidades": [
                      {
                          "personas": 1,
                          "velocidad": 66.666
                      }
                  ],
                  "SchedStartTimeLocal": "2021-08-03T06:00:00",
                  "SchedFinishTimeLocal": "2021-08-03T07:55:39",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-23T11:01:16",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
              {
                  "WoId": "000001336222",
                  "OperId": "NETEJA",
                  "SeqNo": 0,
                  "RowId": 190,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 1,
                  "StateCdDesc": "New",
                  "ItemId": "000000000000075987",
                  "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
                  "QtyReqd": 1,
                  "Duracion": 12,
                  "Personas": 1,
                  "posiblesVelocidades": [],
                  "SchedStartTimeLocal": "2021-08-03T07:55:39",
                  "SchedFinishTimeLocal": "2021-08-03T08:07:39",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-23T11:01:17",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
              {
                  "WoId": "000001336223",
                  "OperId": "FSECFRCO",
                  "SeqNo": 0,
                  "RowId": 191,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 3,
                  "StateCdDesc": "Running",
                  "ItemId": "000000000000075987",
                  "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
                  "QtyReqd": 11145,
                  "Duracion": 742.99257,
                  "Personas": 1,
                  "posiblesVelocidades": [
                      {
                          "personas": 1,
                          "velocidad": 66.666
                      }
                  ],
                  "SchedStartTimeLocal": "2021-07-21T05:30:00",
                  "SchedFinishTimeLocal": "2021-07-21T17:52:59",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-27T08:12:02",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              },
              {
                  "WoId": "000001336223",
                  "OperId": "NETEJA",
                  "SeqNo": 0,
                  "RowId": 192,
                  "SeqNoRelacionadoSpare3": 0,
                  "debugSpare3": null,
                  "debugSpare4": null,
                  "JobDesc": null,
                  "init_EntId": 129,
                  "target_EntId": 56,
                  "run_EntId": 0,
                  "WoStateCd": 0,
                  "StateCd": 2,
                  "StateCdDesc": "Ready",
                  "ItemId": "000000000000075987",
                  "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
                  "QtyReqd": 1,
                  "Duracion": 12,
                  "Personas": 1,
                  "posiblesVelocidades": [],
                  "SchedStartTimeLocal": "2021-07-21T17:52:59",
                  "SchedFinishTimeLocal": "2021-07-21T18:04:59",
                  "ActStartTimeLocal": "0001-01-01T00:00:00",
                  "ActStartTimeUTC": "0001-01-01T00:00:00",
                  "JobPos": null,
                  "EditTime": "2021-07-27T08:12:02",
                  "posiblesLineas": [
                      {
                          "LineaDesc": "FSF02",
                          "LineaName": "FSF02",
                          "LineaId": 56
                      }
                  ]
              }
          ],
          "lineas": [
              {
                  "entId": 56,
                  "entName": "FSF02",
                  "description": "FSF02",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 128,
          "entName": "FSECFRMA",
          "entDesc": "Freidora Manual Frutos Secos",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 117,
                  "entName": "FSF01",
                  "description": "FSF01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 135,
          "entName": "FSECGRAN",
          "entDesc": "Máquina de Granillo",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 118,
                  "entName": "FSG01",
                  "description": "FSG01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 134,
          "entName": "FSECMOLI",
          "entDesc": "Máquina de Molido",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 119,
                  "entName": "FSM01",
                  "description": "FSM01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 132,
          "entName": "FSECPICA",
          "entDesc": "Picadora de Avellanas",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 120,
                  "entName": "FSP01",
                  "description": "FSP01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 126,
          "entName": "FSECROUR",
          "entDesc": "Tostador Roure 02",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 102,
                  "entName": "FSR01",
                  "description": "FSR01",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 103,
                  "entName": "FSR02",
                  "description": "FSR02",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 60,
          "entName": "FSECSACS",
          "entDesc": "Ensacadora Frutos Secos",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 203,
                  "entName": "L063",
                  "description": "L063",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 123,
          "entName": "FSECSALA",
          "entDesc": "Salador Frutos Secos",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 106,
                  "entName": "FSA01",
                  "description": "FSA01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 130,
          "entName": "FSECSELE",
          "entDesc": "Selectora Frutos Secos",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 104,
                  "entName": "FSS01",
                  "description": "FSS01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 136,
          "entName": "FSECTARI",
          "entDesc": "L75 Envasadora Frutos Secos Tarrinas",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 41,
                  "entName": "L075",
                  "description": "L075",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 133,
          "entName": "FSECVENT",
          "entDesc": "Ventadora Frutos  Secos",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 105,
                  "entName": "FSV01",
                  "description": "FSV01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 139,
          "entName": "MANUALIT",
          "entDesc": "Manualidades 4",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 199,
                  "entName": "L052",
                  "description": "L052",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 200,
                  "entName": "L053",
                  "description": "L053",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 201,
                  "entName": "L054",
                  "description": "L054",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 202,
                  "entName": "L055",
                  "description": "L055",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 21,
          "entName": "PALOENVA",
          "entDesc": "L74 Envasadora Frutos Secos",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 24,
                  "entName": "L041",
                  "description": "L041",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 25,
                  "entName": "L042",
                  "description": "L042",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 34,
                  "entName": "L073",
                  "description": "L073",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 35,
                  "entName": "L074",
                  "description": "L074",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 100,
          "entName": "PALOFREI",
          "entDesc": "Freidora Palomitas 3",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 97,
                  "entName": "PLF01",
                  "description": "PLF01",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 98,
                  "entName": "PLF02",
                  "description": "PLF02",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 99,
                  "entName": "PLF03",
                  "description": "PLF03",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 93,
          "entName": "PEROCRUA",
          "entDesc": "Patata Cruda Perolas",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 90,
                  "entName": "PEC01",
                  "description": "PEC01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 18,
          "entName": "PEROENVA",
          "entDesc": "L23 Envasadora Perolas",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 15,
                  "entName": "L021",
                  "description": "L021",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 16,
                  "entName": "L022",
                  "description": "L022",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 17,
                  "entName": "L023",
                  "description": "L023",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 94,
          "entName": "PEROFREI",
          "entDesc": "Freidora Perolas 2",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 91,
                  "entName": "PEF01",
                  "description": "PEF01",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 92,
                  "entName": "PEF02",
                  "description": "PEF02",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 95,
          "entName": "PEROSALA",
          "entDesc": "Aromatizar Perolas 2",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 88,
                  "entName": "PEA01",
                  "description": "PEA01",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 89,
                  "entName": "PEA02",
                  "description": "PEA02",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 86,
          "entName": "SNCKAROM",
          "entDesc": "Armatizar Snacks",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 83,
                  "entName": "SNA01",
                  "description": "SNA01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 85,
          "entName": "SNCKFREI",
          "entDesc": "Freidora Snacks",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 84,
                  "entName": "SNF01",
                  "description": "SNF01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 81,
          "entName": "TRENAROM",
          "entDesc": "Aromatizar Tren",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 73,
                  "entName": "TRA02",
                  "description": "TRA02",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 77,
          "entName": "TRENCRUA",
          "entDesc": "Patata  Crudda Tren",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 74,
                  "entName": "TRC01",
                  "description": "TRC01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 12,
          "entName": "TRENENVA",
          "entDesc": "L19 Envasadora Granel Snacks",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 6,
                  "entName": "L001",
                  "description": "L001",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 7,
                  "entName": "L002",
                  "description": "L002",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 8,
                  "entName": "L003",
                  "description": "L003",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 9,
                  "entName": "L004",
                  "description": "L004",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 10,
                  "entName": "L005",
                  "description": "L005",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 11,
                  "entName": "L006",
                  "description": "L006",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 205,
                  "entName": "L018",
                  "description": "L018",
                  "operacion": false,
                  "ordenes": []
              },
              {
                  "entId": 206,
                  "entName": "L019",
                  "description": "L019",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 78,
          "entName": "TRENFREI",
          "entDesc": "Freidora Tren",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 75,
                  "entName": "TRF01",
                  "description": "TRF01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 80,
          "entName": "TRENSALA",
          "entDesc": "Salador Tren",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 72,
                  "entName": "TRA01",
                  "description": "TRA01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      },
      {
          "entId": 207,
          "entName": "TRENSELE",
          "entDesc": "Selección Patata Tren",
          "ordenes": [],
          "lineas": [
              {
                  "entId": 76,
                  "entName": "TRS01",
                  "description": "TRS01",
                  "operacion": false,
                  "ordenes": []
              }
          ]
      }
  ]

export const fakeData6 =[
  {
    "entId": 134,
    "entName": "FSECMOLI",
    "entDesc": "Máquina de Molido",
    "ordenes": [],
    "lineas": [
        {
            "entId": 119,
            "entName": "FSM01",
            "description": "FSM01",
            "operacion": false,
            "ordenes": []
        }
    ]
},
  {
      "entId": 131,
      "entName": "FSECDESE",
      "entDesc": "Desembalar Frutos Secos 5",
      "ordenes": [
          {
              "WoId": "000001336227",
              "OperId": "FSECDESE",
              "SeqNo": 0,
              //"RowId": 265,
              //"SeqNoRelacionadoSpare3": 0,
              //"debugSpare3": null,
              //"debugSpare4": null,
              //"JobDesc": null,
              "init_EntId": 131,
              "target_EntId": 112,
              //"run_EntId": 0,
              //"WoStateCd": 0,
              "StateCd": 1,
              "StateCdDesc": "New",
              "ItemId": "000000000000075745",
              "ItemDesc": "MARCONA 14/16 CRU DESEMBALADA",
              "QtyReqd": 2000,
              "Duracion": 30,
              "Personas": 1,
              "posiblesVelocidades": [
                {
                  "personas": 1,
                  "velocidad": 150
                },
                {
                  "personas": 2,
                  "velocidad": 75
                },
                {
                  "personas": 3,
                  "velocidad": 50
                },
                {
                  "personas": 4,
                  "velocidad": 38
                }
              ],
              "SchedStartTimeLocal": "2021-07-28T05:22:11",
              "SchedFinishTimeLocal": "2021-07-28T06:07:11",
              //"ActStartTimeLocal": "0001-01-01T00:00:00",
              //"ActStartTimeUTC": "0001-01-01T00:00:00",
              //"JobPos": null,
              //"EditTime": "2021-07-28T06:54:14",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSD01",
                      "LineaName": "FSD01",
                      "LineaId": 112
                  },
                  {
                      "LineaDesc": "FSD02",
                      "LineaName": "FSD02",
                      "LineaId": 113
                  },
                  {
                      "LineaDesc": "FSD03",
                      "LineaName": "FSD03",
                      "LineaId": 114
                  },
                  {
                      "LineaDesc": "FSD04",
                      "LineaName": "FSD04",
                      "LineaId": 115
                  },
                  {
                      "LineaDesc": "FSD05",
                      "LineaName": "FSD05",
                      "LineaId": 116
                  }
              ]
          },
          /* {
              "WoId": "000001336227",
              "OperId": "NETEJA",
              "SeqNo": 0,
              //"RowId": 263,
              //"SeqNoRelacionadoSpare3": 0,
              //"debugSpare3": null,
              //"debugSpare4": null,
              //"JobDesc": null,
              //"init_EntId": 131,
              //"target_EntId": 112,
              //"run_EntId": 0,
              //"WoStateCd": 0,
              //"StateCd": 1,
              //"StateCdDesc": "New",
              //"ItemId": "000000000000075745",
              //"ItemDesc": "MARCONA 14/16 CRU DESEMBALADA",
              //"QtyReqd": 1,
              "Duracion": 15,
              //"Personas": 1,
              //"posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-28T06:07:11",
              //"SchedFinishTimeLocal": "2021-07-28T06:22:11",
              //"ActStartTimeLocal": "0001-01-01T00:00:00",
              //"ActStartTimeUTC": "0001-01-01T00:00:00",
              //"JobPos": null,
              //"EditTime": "2021-07-28T06:54:14",
              // "posiblesLineas": [
              //    {
              //        "LineaDesc": "FSD01",
              //        "LineaName": "FSD01",
              //        "LineaId": 112
              //    },
              //    {
              //        "LineaDesc": "FSD02",
              //        "LineaName": "FSD02",
              //        "LineaId": 113
              //    },
              //    {
              //        "LineaDesc": "FSD03",
              //        "LineaName": "FSD03",
              //        "LineaId": 114
              //    },
              //    {
              //        "LineaDesc": "FSD04",
              //        "LineaName": "FSD04",
              //        "LineaId": 115
              //    },
              //    {
              //        "LineaDesc": "FSD05",
              //        "LineaName": "FSD05",
              //        "LineaId": 116
              //    }
              //] 
          } */
      ],
      "lineas": [
          {
              "entId": 112,
              "entName": "FSD01",
              "description": "FSD01",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 113,
              "entName": "FSD02",
              "description": "FSD02",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 114,
              "entName": "FSD03",
              "description": "FSD03",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 115,
              "entName": "FSD04",
              "description": "FSD04",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 116,
              "entName": "FSD05",
              "description": "FSD05",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 38,
      "entName": "FSECENVA",
      "entDesc": "L72 Envasadora Frutos Secos",
      "ordenes": [
          {
              "WoId": "000001336229",
              "OperId": "FSECENVA",
              "SeqNo": 0,
              //"RowId": 265,
              //"SeqNoRelacionadoSpare3": 0,
              //"debugSpare3": null,
              //"debugSpare4": null,
              //"JobDesc": null,
              "init_EntId": 38,
              "target_EntId": 36,
              //"run_EntId": 0,
              //"WoStateCd": 0,
              "StateCd": 1,
              "StateCdDesc": "New",
              "ItemId": "000000000000311029",
              "ItemDesc": "MARCONA REP. 14/16 CRUDA 6XB.1K",
              "QtyReqd": 1225,
              "Duracion": 40.425,
              "Personas": 2,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 67
                  },
                  {
                      "personas": 2,
                      "velocidad": 33
                  }
              ],
              "SchedStartTimeLocal": "2021-07-28T10:50:00",
              "SchedFinishTimeLocal": "2021-07-28T11:42:25",
              //"ActStartTimeLocal": "0001-01-01T00:00:00",
              //"ActStartTimeUTC": "0001-01-01T00:00:00",
              //"JobPos": null,
              //"EditTime": "2021-07-28T12:56:56",
              "posiblesLineas": [
                  {
                      "LineaDesc": "L024",
                      "LineaName": "L024",
                      "LineaId": 66
                  },
                  {
                      "LineaDesc": "L025",
                      "LineaName": "L025",
                      "LineaId": 29
                  },
                  {
                      "LineaDesc": "L026",
                      "LineaName": "L026",
                      "LineaId": 36
                  },
                  {
                      "LineaDesc": "L027",
                      "LineaName": "L027",
                      "LineaId": 37
                  },
                  {
                      "LineaDesc": "L041",
                      "LineaName": "L041",
                      "LineaId": 24
                  },
                  {
                      "LineaDesc": "L042",
                      "LineaName": "L042",
                      "LineaId": 25
                  },
                  {
                      "LineaDesc": "L043",
                      "LineaName": "L043",
                      "LineaId": 26
                  },
                  {
                      "LineaDesc": "L044",
                      "LineaName": "L044",
                      "LineaId": 27
                  },
                  {
                      "LineaDesc": "L045",
                      "LineaName": "L045",
                      "LineaId": 30
                  },
                  {
                      "LineaDesc": "L046",
                      "LineaName": "L046",
                      "LineaId": 31
                  },
                  {
                      "LineaDesc": "L063",
                      "LineaName": "L063",
                      "LineaId": 203
                  },
                  {
                      "LineaDesc": "L065",
                      "LineaName": "L065",
                      "LineaId": 204
                  },
                  {
                      "LineaDesc": "L071",
                      "LineaName": "L071",
                      "LineaId": 67
                  },
                  {
                      "LineaDesc": "L072",
                      "LineaName": "L072",
                      "LineaId": 68
                  }
              ]
          },
          {
              "WoId": "000001336229",
              "OperId": "NETEJA",
              "SeqNo": 0,
              //"RowId": 265,
              //"SeqNoRelacionadoSpare3": 0,
              //"debugSpare3": null,
              //"debugSpare4": null,
              //"JobDesc": null,
              //"init_EntId": 38,
              //"target_EntId": 36,
              //"run_EntId": 0,
              //"WoStateCd": 0,
              //"StateCd": 1,
              //"StateCdDesc": "New",
              //"ItemId": "000000000000311029",
              //"ItemDesc": "MARCONA REP. 14/16 CRUDA 6XB.1K",
              //"QtyReqd": 1,
              "Duracion": 12,
              //"Personas": 1,
              //"posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-28T11:42:25",
     
                    //"SchedFinishTimeLocal": "2021-07-28T11:42:25",
              //"ActStartTimeLocal": "0001-01-01T00:00:00",
              //"ActStartTimeUTC": "0001-01-01T00:00:00",
              //"JobPos": null,
              //"EditTime": "2021-07-28T12:56:56",
   
              /* "posiblesLineas": [
                  {
                      "LineaDesc": "L024",
                      "LineaName": "L024",
                      "LineaId": 66
                  },
                  {
                      "LineaDesc": "L025",
                      "LineaName": "L025",
                      "LineaId": 29
                  },
                  {
                      "LineaDesc": "L026",
                      "LineaName": "L026",
                      "LineaId": 36
                  },
                  {
                      "LineaDesc": "L027",
                      "LineaName": "L027",
                      "LineaId": 37
                  },
                  {
                      "LineaDesc": "L041",
                      "LineaName": "L041",
                      "LineaId": 24
                  },
                  {
                      "LineaDesc": "L042",
                      "LineaName": "L042",
                      "LineaId": 25
                  },
                  {
                      "LineaDesc": "L043",
                      "LineaName": "L043",
                      "LineaId": 26
                  },
                  {
                      "LineaDesc": "L044",
                      "LineaName": "L044",
                      "LineaId": 27
                  },
                  {
                      "LineaDesc": "L045",
                      "LineaName": "L045",
                      "LineaId": 30
                  },
                  {
                      "LineaDesc": "L046",
                      "LineaName": "L046",
                      "LineaId": 31
                  },
                  {
                      "LineaDesc": "L063",
                      "LineaName": "L063",
                      "LineaId": 203
                  },
                  {
                      "LineaDesc": "L065",
                      "LineaName": "L065",
                      "LineaId": 204
                  },
                  {
                      "LineaDesc": "L071",
                      "LineaName": "L071",
                      "LineaId": 67
                  },
                  {
                      "LineaDesc": "L072",
                      "LineaName": "L072",
                      "LineaId": 68
                  }
              ] */
          },
          {
              "WoId": "000001336230",
              "OperId": "FSECENVA",
              "SeqNo": 0,
              //"RowId": 267,
              //"SeqNoRelacionadoSpare3": 0,
              //"debugSpare3": null,
              //"debugSpare4": null,
              //"JobDesc": null,
              "init_EntId": 38,
              "target_EntId": 66,
              //"run_EntId": 0,
              //"WoStateCd": 0,
              "StateCd": 1,
              "StateCdDesc": "New",
              "ItemId": "000000000000311029",
              "ItemDesc": "MARCONA REP. 14/16 CRUDA 6XB.1K",
              "QtyReqd": 3500,
              "Duracion": 115.5,
              "Personas": 2,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 67
                  },
                  {
                      "personas": 2,
                      "velocidad": 33
                  }
              ],
              "SchedStartTimeLocal": "2021-07-28T11:00:00",
              "SchedFinishTimeLocal": "2021-07-28T13:07:30",
              //"ActStartTimeLocal": "0001-01-01T00:00:00",
              //"ActStartTimeUTC": "0001-01-01T00:00:00",
              //"JobPos": null,
              //"EditTime": "2021-07-28T12:56:56",
              "posiblesLineas": [
                  {
                      "LineaDesc": "L024",
                      "LineaName": "L024",
                      "LineaId": 66
                  },
                  {
                      "LineaDesc": "L025",
                      "LineaName": "L025",
                      "LineaId": 29
                  },
                  {
                      "LineaDesc": "L026",
                      "LineaName": "L026",
                      "LineaId": 36
                  },
                  {
                      "LineaDesc": "L027",
                      "LineaName": "L027",
                      "LineaId": 37
                  },
                  {
                      "LineaDesc": "L041",
                      "LineaName": "L041",
                      "LineaId": 24
                  },
                  {
                      "LineaDesc": "L042",
                      "LineaName": "L042",
                      "LineaId": 25
                  },
                  {
                      "LineaDesc": "L043",
                      "LineaName": "L043",
                      "LineaId": 26
                  },
                  {
                      "LineaDesc": "L044",
                      "LineaName": "L044",
                      "LineaId": 27
                  },
                  {
                      "LineaDesc": "L045",
                      "LineaName": "L045",
                      "LineaId": 30
                  },
                  {
                      "LineaDesc": "L046",
                      "LineaName": "L046",
                      "LineaId": 31
                  },
                  {
                      "LineaDesc": "L063",
                      "LineaName": "L063",
                      "LineaId": 203
                  },
                  {
                      "LineaDesc": "L065",
                      "LineaName": "L065",
                      "LineaId": 204
                  },
                  {
                      "LineaDesc": "L071",
                      "LineaName": "L071",
                      "LineaId": 67
                  },
                  {
                      "LineaDesc": "L072",
                      "LineaName": "L072",
                      "LineaId": 68
                  }
              ]
          },
          {
              "WoId": "000001336230",
              "OperId": "NETEJA",
              "SeqNo": 0,
              //"RowId": 268,
              //"SeqNoRelacionadoSpare3": 0,
              //"debugSpare3": null,
              //"debugSpare4": null,
              //"JobDesc": null,
              //"init_EntId": 38,
              //"target_EntId": 66,
              //"run_EntId": 0,
              //"WoStateCd": 0,
              //"StateCd": 1,
              //"StateCdDesc": "New",
              //"ItemId": "000000000000311029",
              //"ItemDesc": "MARCONA REP. 14/16 CRUDA 6XB.1K",
              //"QtyReqd": 1,
              "Duracion": 12,
              //"Personas": 1,
              //"posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-28T13:07:30",
              //"SchedFinishTimeLocal": "2021-07-28T13:19:30",
              //"ActStartTimeLocal": "0001-01-01T00:00:00",
              //"ActStartTimeUTC": "0001-01-01T00:00:00",
              //"JobPos": null,
              //"EditTime": "2021-07-28T12:56:56",
              /* "posiblesLineas": [
                  {
                      "LineaDesc": "L024",
                      "LineaName": "L024",
                      "LineaId": 66
                  },
                  {
                      "LineaDesc": "L025",
                      "LineaName": "L025",
                      "LineaId": 29
                  },
                  {
                      "LineaDesc": "L026",
                      "LineaName": "L026",
                      "LineaId": 36
                  },
                  {
                      "LineaDesc": "L027",
                      "LineaName": "L027",
                      "LineaId": 37
                  },
                  {
                      "LineaDesc": "L041",
                      "LineaName": "L041",
                      "LineaId": 24
                  },
                  {
                      "LineaDesc": "L042",
                      "LineaName": "L042",
                      "LineaId": 25
                  },
                  {
                      "LineaDesc": "L043",
                      "LineaName": "L043",
                      "LineaId": 26
                  },
                  {
                      "LineaDesc": "L044",
                      "LineaName": "L044",
                      "LineaId": 27
                  },
                  {
                      "LineaDesc": "L045",
                      "LineaName": "L045",
                      "LineaId": 30
                  },
                  {
                      "LineaDesc": "L046",
                      "LineaName": "L046",
                      "LineaId": 31
                  },
                  {
                      "LineaDesc": "L063",
                      "LineaName": "L063",
                      "LineaId": 203
                  },
                  {
                      "LineaDesc": "L065",
                      "LineaName": "L065",
                      "LineaId": 204
                  },
                  {
                      "LineaDesc": "L071",
                      "LineaName": "L071",
                      "LineaId": 67
                  },
                  {
                      "LineaDesc": "L072",
                      "LineaName": "L072",
                      "LineaId": 68
                  }
              ] */
          },
          {
            "WoId": "000001336231",
            "OperId": "FSECENVA",
            "SeqNo": 0,
            //"RowId": 267,
            //"SeqNoRelacionadoSpare3": 0,
            //"debugSpare3": null,
            //"debugSpare4": null,
            //"JobDesc": null,
            "init_EntId": 38,
            "target_EntId": 66,
            //"run_EntId": 0,
            //"WoStateCd": 0,
            "StateCd": 1,
            "StateCdDesc": "New",
            "ItemId": "000000000000311029",
            "ItemDesc": "MARCONA REP. 14/16 CRUDA 6XB.1K",
            "QtyReqd": 1000,
            "Duracion": 115.5,
            "Personas": 2,
            "posiblesVelocidades": [
                {
                    "personas": 1,
                    "velocidad": 67
                },
                {
                    "personas": 2,
                    "velocidad": 33
                }
            ],
            "SchedStartTimeLocal": "2021-07-29T00:00:00",
            "SchedFinishTimeLocal": "2021-07-29T02:07:30",
            //"ActStartTimeLocal": "0001-01-01T00:00:00",
            //"ActStartTimeUTC": "0001-01-01T00:00:00",
            //"JobPos": null,
            //"EditTime": "2021-07-28T12:56:56",
            "posiblesLineas": [
                {
                    "LineaDesc": "L024",
                    "LineaName": "L024",
                    "LineaId": 66
                },
                {
                    "LineaDesc": "L025",
                    "LineaName": "L025",
                    "LineaId": 29
                },
                {
                    "LineaDesc": "L026",
                    "LineaName": "L026",
                    "LineaId": 36
                },
                {
                    "LineaDesc": "L027",
                    "LineaName": "L027",
                    "LineaId": 37
                },
                {
                    "LineaDesc": "L041",
                    "LineaName": "L041",
                    "LineaId": 24
                },
                {
                    "LineaDesc": "L042",
                    "LineaName": "L042",
                    "LineaId": 25
                },
                {
                    "LineaDesc": "L043",
                    "LineaName": "L043",
                    "LineaId": 26
                },
                {
                    "LineaDesc": "L044",
                    "LineaName": "L044",
                    "LineaId": 27
                },
                {
                    "LineaDesc": "L045",
                    "LineaName": "L045",
                    "LineaId": 30
                },
                {
                    "LineaDesc": "L046",
                    "LineaName": "L046",
                    "LineaId": 31
                },
                {
                    "LineaDesc": "L063",
                    "LineaName": "L063",
                    "LineaId": 203
                },
                {
                    "LineaDesc": "L065",
                    "LineaName": "L065",
                    "LineaId": 204
                },
                {
                    "LineaDesc": "L071",
                    "LineaName": "L071",
                    "LineaId": 67
                },
                {
                    "LineaDesc": "L072",
                    "LineaName": "L072",
                    "LineaId": 68
                }
            ]
        },
      ],
      "lineas": [
          {
              "entId": 66,
              "entName": "L024",
              "description": "L024",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 29,
              "entName": "L025",
              "description": "L025",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 36,
              "entName": "L026",
              "description": "L026",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 37,
              "entName": "L027",
              "description": "L027",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 24,
              "entName": "L041",
              "description": "L041",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 25,
              "entName": "L042",
              "description": "L042",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 26,
              "entName": "L043",
              "description": "L043",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 27,
              "entName": "L044",
              "description": "L044",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 30,
              "entName": "L045",
              "description": "L045",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 31,
              "entName": "L046",
              "description": "L046",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 203,
              "entName": "L063",
              "description": "L063",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 204,
              "entName": "L065",
              "description": "L065",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 67,
              "entName": "L071",
              "description": "L071",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 68,
              "entName": "L072",
              "description": "L072",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  /* {
      "entId": 129,
      "entName": "FSECFRCO",
      "entDesc": "Freidora Continua Frutos Secos",
      "ordenes": [
          {
              "WoId": "000001336210",
              "OperId": "FSECFRCO",
              "SeqNo": 0,
              "RowId": 155,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 1000,
              "Duracion": 66.666,
              "Personas": 1,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 66.666
                  }
              ],
              "SchedStartTimeLocal": "2021-07-21T10:00:00",
              "SchedFinishTimeLocal": "2021-07-21T11:18:39",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:17",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336210",
              "OperId": "NETEJA",
              "SeqNo": 0,
              "RowId": 156,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 1,
              "Duracion": 15,
              "Personas": 1,
              "posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-21T11:18:39",
              "SchedFinishTimeLocal": "2021-07-21T11:33:39",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:17",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336211",
              "OperId": "FSECFRCO",
              "SeqNo": 0,
              "RowId": 157,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 3500,
              "Duracion": 233.331,
              "Personas": 1,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 66.666
                  }
              ],
              "SchedStartTimeLocal": "2021-07-21T12:00:00",
              "SchedFinishTimeLocal": "2021-07-21T16:08:19",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:17",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336211",
              "OperId": "NETEJA",
              "SeqNo": 0,
              "RowId": 158,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 1,
              "Duracion": 12,
              "Personas": 1,
              "posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-21T16:08:19",
              "SchedFinishTimeLocal": "2021-07-21T16:20:19",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:18",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336212",
              "OperId": "FSECFRCO",
              "SeqNo": 0,
              "RowId": 159,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075987",
              "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
              "QtyReqd": 1000,
              "Duracion": 66.666,
              "Personas": 1,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 66.666
                  }
              ],
              "SchedStartTimeLocal": "2021-07-21T17:00:00",
              "SchedFinishTimeLocal": "2021-07-21T18:18:39",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:17",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336212",
              "OperId": "NETEJA",
              "SeqNo": 0,
              "RowId": 160,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075987",
              "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
              "QtyReqd": 1,
              "Duracion": 15,
              "Personas": 1,
              "posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-21T18:18:39",
              "SchedFinishTimeLocal": "2021-07-21T18:33:39",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:17",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336213",
              "OperId": "FSECFRCO",
              "SeqNo": 0,
              "RowId": 161,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 2500,
              "Duracion": 166.665,
              "Personas": 1,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 66.666
                  }
              ],
              "SchedStartTimeLocal": "2021-07-21T19:00:00",
              "SchedFinishTimeLocal": "2021-07-21T22:01:39",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:18",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336213",
              "OperId": "NETEJA",
              "SeqNo": 0,
              "RowId": 162,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 1,
              "Duracion": 15,
              "Personas": 1,
              "posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-21T22:01:39",
              "SchedFinishTimeLocal": "2021-07-21T22:16:39",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:17",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336214",
              "OperId": "FSECFRCO",
              "SeqNo": 0,
              "RowId": 163,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075987",
              "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
              "QtyReqd": 5000,
              "Duracion": 333.33,
              "Personas": 1,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 66.666
                  }
              ],
              "SchedStartTimeLocal": "2021-07-22T00:00:00",
              "SchedFinishTimeLocal": "2021-07-22T05:48:19",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:18",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336214",
              "OperId": "NETEJA",
              "SeqNo": 0,
              "RowId": 164,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075987",
              "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
              "QtyReqd": 1,
              "Duracion": 15,
              "Personas": 1,
              "posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-22T05:48:19",
              "SchedFinishTimeLocal": "2021-07-22T06:03:19",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:18",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336217",
              "OperId": "FSECFRCO",
              "SeqNo": 0,
              "RowId": 181,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 30,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 2400,
              "Duracion": 159.9984,
              "Personas": 1,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 66.666
                  }
              ],
              "SchedStartTimeLocal": "2021-07-21T23:00:00",
              "SchedFinishTimeLocal": "2021-07-22T00:01:00",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:18",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336217",
              "OperId": "NETEJA",
              "SeqNo": 0,
              "RowId": 182,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 30,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 1,
              "Duracion": 0,
              "Personas": 1,
              "posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-22T00:01:00",
              "SchedFinishTimeLocal": "2021-07-22T00:01:00",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:19",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336218",
              "OperId": "FSECFRCO",
              "SeqNo": 0,
              "RowId": 183,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 30,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 1000,
              "Duracion": 66.666,
              "Personas": 1,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 66.666
                  }
              ],
              "SchedStartTimeLocal": "2021-07-21T23:00:00",
              "SchedFinishTimeLocal": "2021-07-22T00:38:00",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:18",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336218",
              "OperId": "NETEJA",
              "SeqNo": 0,
              "RowId": 184,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 30,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 1,
              "Duracion": 15,
              "Personas": 1,
              "posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-22T00:38:00",
              "SchedFinishTimeLocal": "2021-07-22T00:53:00",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:18",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336220",
              "OperId": "FSECFRCO",
              "SeqNo": 0,
              "RowId": 185,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 30,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 1000,
              "Duracion": 66.666,
              "Personas": 1,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 66.666
                  }
              ],
              "SchedStartTimeLocal": "2021-07-22T16:17:00",
              "SchedFinishTimeLocal": "2021-07-22T18:19:00",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:19",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336220",
              "OperId": "NETEJA",
              "SeqNo": 0,
              "RowId": 186,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 30,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 1,
              "Duracion": 15,
              "Personas": 1,
              "posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-22T18:19:00",
              "SchedFinishTimeLocal": "2021-07-22T18:34:00",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:19",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336221",
              "OperId": "FSECFRCO",
              "SeqNo": 0,
              "RowId": 187,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 30,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 5222,
              "Duracion": 348.129852,
              "Personas": 1,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 66.666
                  }
              ],
              "SchedStartTimeLocal": "2021-07-23T09:10:00",
              "SchedFinishTimeLocal": "2021-07-23T11:12:00",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:19",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336221",
              "OperId": "NETEJA",
              "SeqNo": 0,
              "RowId": 188,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 30,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075985",
              "ItemDesc": "CACAHUETE REP 25/29 CHINA FRITO CONT.",
              "QtyReqd": 1,
              "Duracion": 15,
              "Personas": 1,
              "posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-23T11:12:00",
              "SchedFinishTimeLocal": "2021-07-23T11:27:00",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:19",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336222",
              "OperId": "FSECFRCO",
              "SeqNo": 0,
              "RowId": 189,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075987",
              "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
              "QtyReqd": 1510,
              "Duracion": 100.66566,
              "Personas": 1,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 66.666
                  }
              ],
              "SchedStartTimeLocal": "2021-07-21T06:00:00",
              "SchedFinishTimeLocal": "2021-07-21T07:55:39",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:16",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336222",
              "OperId": "NETEJA",
              "SeqNo": 0,
              "RowId": 190,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075987",
              "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
              "QtyReqd": 1,
              "Duracion": 12,
              "Personas": 1,
              "posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-21T07:55:39",
              "SchedFinishTimeLocal": "2021-07-21T08:07:39",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-23T11:01:17",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336223",
              "OperId": "FSECFRCO",
              "SeqNo": 0,
              "RowId": 191,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 3,
              "StateCdDesc": "Running",
              "ItemId": "000000000000075987",
              "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
              "QtyReqd": 11145,
              "Duracion": 742.99257,
              "Personas": 1,
              "posiblesVelocidades": [
                  {
                      "personas": 1,
                      "velocidad": 66.666
                  }
              ],
              "SchedStartTimeLocal": "2021-07-21T05:30:00",
              "SchedFinishTimeLocal": "2021-07-21T17:52:59",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-27T08:12:02",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          },
          {
              "WoId": "000001336223",
              "OperId": "NETEJA",
              "SeqNo": 0,
              "RowId": 192,
              "SeqNoRelacionadoSpare3": 0,
              "debugSpare3": null,
              "debugSpare4": null,
              "JobDesc": null,
              "init_EntId": 129,
              "target_EntId": 56,
              "run_EntId": 0,
              "WoStateCd": 0,
              "StateCd": 2,
              "StateCdDesc": "Ready",
              "ItemId": "000000000000075987",
              "ItemDesc": "CACAHUETE PIEL 38/42 FRITO.",
              "QtyReqd": 1,
              "Duracion": 12,
              "Personas": 1,
              "posiblesVelocidades": [],
              "SchedStartTimeLocal": "2021-07-21T17:52:59",
              "SchedFinishTimeLocal": "2021-07-21T18:04:59",
              "ActStartTimeLocal": "0001-01-01T00:00:00",
              "ActStartTimeUTC": "0001-01-01T00:00:00",
              "JobPos": null,
              "EditTime": "2021-07-27T08:12:02",
              "posiblesLineas": [
                  {
                      "LineaDesc": "FSF02",
                      "LineaName": "FSF02",
                      "LineaId": 56
                  }
              ]
          }
      ],
      "lineas": [
          {
              "entId": 56,
              "entName": "FSF02",
              "description": "FSF02",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 128,
      "entName": "FSECFRMA",
      "entDesc": "Freidora Manual Frutos Secos",
      "ordenes": [],
      "lineas": [
          {
              "entId": 117,
              "entName": "FSF01",
              "description": "FSF01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 135,
      "entName": "FSECGRAN",
      "entDesc": "Máquina de Granillo",
      "ordenes": [],
      "lineas": [
          {
              "entId": 118,
              "entName": "FSG01",
              "description": "FSG01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  
  {
      "entId": 132,
      "entName": "FSECPICA",
      "entDesc": "Picadora de Avellanas",
      "ordenes": [],
      "lineas": [
          {
              "entId": 120,
              "entName": "FSP01",
              "description": "FSP01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 126,
      "entName": "FSECROUR",
      "entDesc": "Tostador Roure 02",
      "ordenes": [],
      "lineas": [
          {
              "entId": 102,
              "entName": "FSR01",
              "description": "FSR01",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 103,
              "entName": "FSR02",
              "description": "FSR02",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 60,
      "entName": "FSECSACS",
      "entDesc": "Ensacadora Frutos Secos",
      "ordenes": [],
      "lineas": [
          {
              "entId": 203,
              "entName": "L063",
              "description": "L063",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 123,
      "entName": "FSECSALA",
      "entDesc": "Salador Frutos Secos",
      "ordenes": [],
      "lineas": [
          {
              "entId": 106,
              "entName": "FSA01",
              "description": "FSA01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 130,
      "entName": "FSECSELE",
      "entDesc": "Selectora Frutos Secos",
      "ordenes": [],
      "lineas": [
          {
              "entId": 104,
              "entName": "FSS01",
              "description": "FSS01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 136,
      "entName": "FSECTARI",
      "entDesc": "L75 Envasadora Frutos Secos Tarrinas",
      "ordenes": [],
      "lineas": [
          {
              "entId": 41,
              "entName": "L075",
              "description": "L075",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 133,
      "entName": "FSECVENT",
      "entDesc": "Ventadora Frutos  Secos",
      "ordenes": [],
      "lineas": [
          {
              "entId": 105,
              "entName": "FSV01",
              "description": "FSV01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 139,
      "entName": "MANUALIT",
      "entDesc": "Manualidades 4",
      "ordenes": [],
      "lineas": [
          {
              "entId": 199,
              "entName": "L052",
              "description": "L052",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 200,
              "entName": "L053",
              "description": "L053",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 201,
              "entName": "L054",
              "description": "L054",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 202,
              "entName": "L055",
              "description": "L055",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 21,
      "entName": "PALOENVA",
      "entDesc": "L74 Envasadora Frutos Secos",
      "ordenes": [],
      "lineas": [
          {
              "entId": 24,
              "entName": "L041",
              "description": "L041",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 25,
              "entName": "L042",
              "description": "L042",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 34,
              "entName": "L073",
              "description": "L073",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 35,
              "entName": "L074",
              "description": "L074",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 100,
      "entName": "PALOFREI",
      "entDesc": "Freidora Palomitas 3",
      "ordenes": [],
      "lineas": [
          {
              "entId": 97,
              "entName": "PLF01",
              "description": "PLF01",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 98,
              "entName": "PLF02",
              "description": "PLF02",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 99,
              "entName": "PLF03",
              "description": "PLF03",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 93,
      "entName": "PEROCRUA",
      "entDesc": "Patata Cruda Perolas",
      "ordenes": [],
      "lineas": [
          {
              "entId": 90,
              "entName": "PEC01",
              "description": "PEC01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 18,
      "entName": "PEROENVA",
      "entDesc": "L23 Envasadora Perolas",
      "ordenes": [],
      "lineas": [
          {
              "entId": 15,
              "entName": "L021",
              "description": "L021",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 16,
              "entName": "L022",
              "description": "L022",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 17,
              "entName": "L023",
              "description": "L023",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 94,
      "entName": "PEROFREI",
      "entDesc": "Freidora Perolas 2",
      "ordenes": [],
      "lineas": [
          {
              "entId": 91,
              "entName": "PEF01",
              "description": "PEF01",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 92,
              "entName": "PEF02",
              "description": "PEF02",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 95,
      "entName": "PEROSALA",
      "entDesc": "Aromatizar Perolas 2",
      "ordenes": [],
      "lineas": [
          {
              "entId": 88,
              "entName": "PEA01",
              "description": "PEA01",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 89,
              "entName": "PEA02",
              "description": "PEA02",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 86,
      "entName": "SNCKAROM",
      "entDesc": "Armatizar Snacks",
      "ordenes": [],
      "lineas": [
          {
              "entId": 83,
              "entName": "SNA01",
              "description": "SNA01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 85,
      "entName": "SNCKFREI",
      "entDesc": "Freidora Snacks",
      "ordenes": [],
      "lineas": [
          {
              "entId": 84,
              "entName": "SNF01",
              "description": "SNF01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 81,
      "entName": "TRENAROM",
      "entDesc": "Aromatizar Tren",
      "ordenes": [],
      "lineas": [
          {
              "entId": 73,
              "entName": "TRA02",
              "description": "TRA02",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 77,
      "entName": "TRENCRUA",
      "entDesc": "Patata  Crudda Tren",
      "ordenes": [],
      "lineas": [
          {
              "entId": 74,
              "entName": "TRC01",
              "description": "TRC01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 12,
      "entName": "TRENENVA",
      "entDesc": "L19 Envasadora Granel Snacks",
      "ordenes": [],
      "lineas": [
          {
              "entId": 6,
              "entName": "L001",
              "description": "L001",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 7,
              "entName": "L002",
              "description": "L002",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 8,
              "entName": "L003",
              "description": "L003",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 9,
              "entName": "L004",
              "description": "L004",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 10,
              "entName": "L005",
              "description": "L005",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 11,
              "entName": "L006",
              "description": "L006",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 205,
              "entName": "L018",
              "description": "L018",
              "operacion": false,
              "ordenes": []
          },
          {
              "entId": 206,
              "entName": "L019",
              "description": "L019",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 78,
      "entName": "TRENFREI",
      "entDesc": "Freidora Tren",
      "ordenes": [],
      "lineas": [
          {
              "entId": 75,
              "entName": "TRF01",
              "description": "TRF01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 80,
      "entName": "TRENSALA",
      "entDesc": "Salador Tren",
      "ordenes": [],
      "lineas": [
          {
              "entId": 72,
              "entName": "TRA01",
              "description": "TRA01",
              "operacion": false,
              "ordenes": []
          }
      ]
  },
  {
      "entId": 207,
      "entName": "TRENSELE",
      "entDesc": "Selección Patata Tren",
      "ordenes": [],
      "lineas": [
          {
              "entId": 76,
              "entName": "TRS01",
              "description": "TRS01",
              "operacion": false,
              "ordenes": []
          }
      ]
  } */
]


export 
const fakeData2 = [
  {
    entId: 70,
    entName: "FSECENVA",
    entDesc: "LOGÍSTICA FRITO/SALADO PATATAS",
    ordenes: [],
    lineas: [
      {
        entId: 23,
        entName: "L024",
        description: "L024",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 24,
        entName: "L025",
        description: "L025",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 31,
        entName: "L026",
        description: "L026",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 32,
        entName: "L027",
        description: "L027",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 19,
        entName: "L041",
        description: "L041",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 20,
        entName: "L042",
        description: "L042",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 21,
        entName: "L043",
        description: "L043",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 22,
        entName: "L044",
        description: "L044",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 25,
        entName: "L045",
        description: "L045",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 26,
        entName: "L046",
        description: "L046",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 27,
        entName: "L071",
        description: "L071",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 28,
        entName: "L072",
        description: "L072",
        operacion: false,
        ordenes: [],
      },
    ],
  },
  {
    entId: 78,
    entName: "FSECFRCO",
    entDesc: "TOSTADO CINTA S/SAL",
    ordenes: [],
    lineas: [
      {
        entId: 98,
        entName: "FSF02",
        description: "FSF02",
        operacion: false,
        ordenes: [],
      },
    ],
  },
  {
    entId: 85,
    entName: "FSECTARI",
    entDesc: "ENVASADORA TARRINAS",
    ordenes: [],
    lineas: [
      {
        entId: 35,
        entName: "L075",
        description: "L075",
        operacion: false,
        ordenes: [],
      },
    ],
  },
  {
    entId: 67,
    entName: "PALOENVA",
    entDesc: "ENVASADO PALOMITAS",
    ordenes: [],
    lineas: [
      {
        entId: 19,
        entName: "L041",
        description: "L041",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 20,
        entName: "L042",
        description: "L042",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 29,
        entName: "L073",
        description: "L073",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 30,
        entName: "L074",
        description: "L074",
        operacion: false,
        ordenes: [],
      },
    ],
  },
  {
    entId: 60,
    entName: "PEROENVA",
    entDesc: "ENVASADO PEROLAS",
    ordenes: [],
    lineas: [
      {
        entId: 14,
        entName: "L021",
        description: "L021",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 15,
        entName: "L022",
        description: "L022",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 16,
        entName: "L023",
        description: "L023",
        operacion: false,
        ordenes: [],
      },
    ],
  },
  {
    entId: 38,
    entName: "TRENENVA",
    entDesc: "ENVASADO TREN",
    ordenes: [
      {
        WoId: "OF010001c",
        OperId: "NETEJA",
        SeqNo: 0,
        RowId: 257,
        SeqNoRelacionadoSpare3: 0,
        JobDesc: null,
        init_EntId: 38,
        target_EntId: 6,
        run_EntId: 0,
        WoStateCd: 0,
        StateCd: 2,
        StateCdDesc: "Ready",
        ItemId: "01_itemProd",
        ItemDesc: "01_itemProd",
        QtyReqd: 1,
        Duracion: 15,
        Personas: 1,
        posiblesVelocidades: [],
        SchedStartTimeLocal: "2021-06-15T17:09:11",
        SchedFinishTimeLocal: "2021-06-15T17:24:11",
        ActStartTimeLocal: "0001-01-01T00:00:00",
        JobPos: -1,
        EditTime: "2021-06-15T11:25:31",
        posiblesLineas: [
          {
            LineaDesc: "L001",
            LineaName: "L001",
            LineaId: 6,
          },
          {
            LineaDesc: "L002",
            LineaName: "L002",
            LineaId: 7,
          },
          {
            LineaDesc: "L003",
            LineaName: "L003",
            LineaId: 8,
          },
          {
            LineaDesc: "L004",
            LineaName: "L004",
            LineaId: 9,
          },
          {
            LineaDesc: "L005",
            LineaName: "L005",
            LineaId: 10,
          },
          {
            LineaDesc: "L006",
            LineaName: "L006",
            LineaId: 11,
          },
        ],
      },
      {
        WoId: "OF010002d",
        OperId: "NETEJA",
        SeqNo: 0,
        RowId: 259,
        SeqNoRelacionadoSpare3: 0,
        JobDesc: null,
        init_EntId: 38,
        target_EntId: 6,
        run_EntId: 0,
        WoStateCd: 0,
        StateCd: 2,
        StateCdDesc: "Ready",
        ItemId: "01_itemProd",
        ItemDesc: "01_itemProd",
        QtyReqd: 1,
        Duracion: 15,
        Personas: 1,
        posiblesVelocidades: [],
        SchedStartTimeLocal: "2021-06-15T15:29:11",
        SchedFinishTimeLocal: "2021-06-15T15:44:11",
        ActStartTimeLocal: "0001-01-01T00:00:00",
        JobPos: -1,
        EditTime: "2021-06-15T11:23:48",
        posiblesLineas: [
          {
            LineaDesc: "L001",
            LineaName: "L001",
            LineaId: 6,
          },
          {
            LineaDesc: "L002",
            LineaName: "L002",
            LineaId: 7,
          },
          {
            LineaDesc: "L003",
            LineaName: "L003",
            LineaId: 8,
          },
          {
            LineaDesc: "L004",
            LineaName: "L004",
            LineaId: 9,
          },
          {
            LineaDesc: "L005",
            LineaName: "L005",
            LineaId: 10,
          },
          {
            LineaDesc: "L006",
            LineaName: "L006",
            LineaId: 11,
          },
        ],
      },
      {
        WoId: "OF010002d",
        OperId: "OF010002d-1",
        SeqNo: 0,
        RowId: 258,
        SeqNoRelacionadoSpare3: 0,
        JobDesc: null,
        init_EntId: 38,
        target_EntId: 6,
        run_EntId: 0,
        WoStateCd: 0,
        StateCd: 2,
        StateCdDesc: "Ready",
        ItemId: "01_itemProd",
        ItemDesc: "01_itemProd",
        QtyReqd: 1000,
        Duracion: 50,
        Personas: 3,
        posiblesVelocidades: [
          {
            personas: 1,
            velocidad: 150,
          },
          {
            personas: 2,
            velocidad: 75,
          },
          {
            personas: 3,
            velocidad: 50,
          },
          {
            personas: 4,
            velocidad: 38,
          },
        ],
        SchedStartTimeLocal: "2021-06-15T14:39:11",
        SchedFinishTimeLocal: "2021-06-15T15:29:11",
        ActStartTimeLocal: "0001-01-01T00:00:00",
        JobPos: -1,
        EditTime: "2021-06-15T11:23:49",
        posiblesLineas: [
          {
            LineaDesc: "L001",
            LineaName: "L001",
            LineaId: 6,
          },
          {
            LineaDesc: "L002",
            LineaName: "L002",
            LineaId: 7,
          },
          {
            LineaDesc: "L003",
            LineaName: "L003",
            LineaId: 8,
          },
          {
            LineaDesc: "L004",
            LineaName: "L004",
            LineaId: 9,
          },
          {
            LineaDesc: "L005",
            LineaName: "L005",
            LineaId: 10,
          },
          {
            LineaDesc: "L006",
            LineaName: "L006",
            LineaId: 11,
          },
        ],
      },
    ],
    lineas: [
      {
        entId: 6,
        entName: "L001",
        description: "L001",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 7,
        entName: "L002",
        description: "L002",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 8,
        entName: "L003",
        description: "L003",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 9,
        entName: "L004",
        description: "L004",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 10,
        entName: "L005",
        description: "L005",
        operacion: false,
        ordenes: [],
      },
      {
        entId: 11,
        entName: "L006",
        description: "L006",
        operacion: false,
        ordenes: [],
      },
    ],
  },
];

export const fakeData = [
    {
      "entId": 70,
      "entName": "FSECENVA",
      "entDesc": "LOGÍSTICA FRITO/SALADO PATATAS",
      "ordenes": [],
      "lineas": [
        {
          "entId": 23,
          "entName": "L024",
          "description": "L024",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 24,
          "entName": "L025",
          "description": "L025",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 31,
          "entName": "L026",
          "description": "L026",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 32,
          "entName": "L027",
          "description": "L027",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 19,
          "entName": "L041",
          "description": "L041",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 20,
          "entName": "L042",
          "description": "L042",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 21,
          "entName": "L043",
          "description": "L043",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 22,
          "entName": "L044",
          "description": "L044",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 25,
          "entName": "L045",
          "description": "L045",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 26,
          "entName": "L046",
          "description": "L046",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 27,
          "entName": "L071",
          "description": "L071",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 28,
          "entName": "L072",
          "description": "L072",
          "operacion": false,
          "ordenes": []
        }
      ]
    },
    {
      "entId": 78,
      "entName": "FSECFRCO",
      "entDesc": "TOSTADO CINTA S/SAL",
      "ordenes": [],
      "lineas": [
        {
          "entId": 98,
          "entName": "FSF02",
          "description": "FSF02",
          "operacion": false,
          "ordenes": []
        }
      ]
    },
    {
      "entId": 85,
      "entName": "FSECTARI",
      "entDesc": "ENVASADORA TARRINAS",
      "ordenes": [],
      "lineas": [
        {
          "entId": 35,
          "entName": "L075",
          "description": "L075",
          "operacion": false,
          "ordenes": []
        }
      ]
    },
    {
      "entId": 67,
      "entName": "PALOENVA",
      "entDesc": "ENVASADO PALOMITAS",
      "ordenes": [],
      "lineas": [
        {
          "entId": 19,
          "entName": "L041",
          "description": "L041",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 20,
          "entName": "L042",
          "description": "L042",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 29,
          "entName": "L073",
          "description": "L073",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 30,
          "entName": "L074",
          "description": "L074",
          "operacion": false,
          "ordenes": []
        }
      ]
    },
    {
      "entId": 60,
      "entName": "PEROENVA",
      "entDesc": "ENVASADO PEROLAS",
      "ordenes": [],
      "lineas": [
        {
          "entId": 14,
          "entName": "L021",
          "description": "L021",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 15,
          "entName": "L022",
          "description": "L022",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 16,
          "entName": "L023",
          "description": "L023",
          "operacion": false,
          "ordenes": []
        }
      ]
    },
    {
      "entId": 38,
      "entName": "TRENENVA",
      "entDesc": "ENVASADO TREN",
      "ordenes": [
        {
          "WoId": "OF010001c",
          "OperId": "NETEJA",
          "SeqNo": 0,
          "RowId": 257,
          "SeqNoRelacionadoSpare3": 0,
          "JobDesc": null,
          "init_EntId": 38,
          "target_EntId": 6,
          "run_EntId": 0,
          "WoStateCd": 0,
          "StateCd": 2,
          "StateCdDesc": "Ready",
          "ItemId": "01_itemProd",
          "ItemDesc": "01_itemProd",
          "QtyReqd": 1,
          "Duracion": 15,
          "Personas": 1,
          "posiblesVelocidades": [],
          "SchedStartTimeLocal": "2021-06-15T12:00:00",
          "SchedFinishTimeLocal": "2021-06-15T12:15:00",
          "ActStartTimeLocal": "0001-01-01T00:00:00",
          "JobPos": -1,
          "EditTime": "2021-06-15T11:25:31",
          "posiblesLineas": [
            {
              "LineaDesc": "L001",
              "LineaName": "L001",
              "LineaId": 6
            },
            {
              "LineaDesc": "L002",
              "LineaName": "L002",
              "LineaId": 7
            },
            {
              "LineaDesc": "L003",
              "LineaName": "L003",
              "LineaId": 8
            },
            {
              "LineaDesc": "L004",
              "LineaName": "L004",
              "LineaId": 9
            },
            {
              "LineaDesc": "L005",
              "LineaName": "L005",
              "LineaId": 10
            },
            {
              "LineaDesc": "L006",
              "LineaName": "L006",
              "LineaId": 11
            }
          ]
        },
        {
            "WoId": "OF010001d",
            "OperId": "NETEJA",
            "SeqNo": 0,
            "RowId": 259,
            "SeqNoRelacionadoSpare3": 0,
            "JobDesc": null,
            "init_EntId": 38,
            "target_EntId": 6,
            "run_EntId": 0,
            "WoStateCd": 0,
            "StateCd": 2,
            "StateCdDesc": "Ready",
            "ItemId": "01_itemProd",
            "ItemDesc": "01_itemProd",
            "QtyReqd": 1,
            "Duracion": 15,
            "Personas": 1,
            "posiblesVelocidades": [],
            "SchedStartTimeLocal": "2021-06-15T11:00:00",
            "SchedFinishTimeLocal": "2021-06-15T11:15:00",
            "ActStartTimeLocal": "0001-01-01T00:00:00",
            "JobPos": -1,
            "EditTime": "2021-06-15T11:23:48",
            "posiblesLineas": [
              {
                "LineaDesc": "L001",
                "LineaName": "L001",
                "LineaId": 6
              },
              {
                "LineaDesc": "L002",
                "LineaName": "L002",
                "LineaId": 7
              },
              {
                "LineaDesc": "L003",
                "LineaName": "L003",
                "LineaId": 8
              },
              {
                "LineaDesc": "L004",
                "LineaName": "L004",
                "LineaId": 9
              },
              {
                "LineaDesc": "L005",
                "LineaName": "L005",
                "LineaId": 10
              },
              {
                "LineaDesc": "L006",
                "LineaName": "L006",
                "LineaId": 11
              }
            ]
          },
          {
            "WoId": "OF010001d",
            "OperId": "OF010001d-1",
            "SeqNo": 0,
            "RowId": 258,
            "SeqNoRelacionadoSpare3": 0,
            "JobDesc": null,
            "init_EntId": 38,
            "target_EntId": 6,
            "run_EntId": 0,
            "WoStateCd": 0,
            "StateCd": 1,
            "StateCdDesc": "New",
            "ItemId": "01_itemProd",
            "ItemDesc": "01_itemProd",
            "QtyReqd": 5000,
            "Duracion": 50,
            "Personas": 3,
            "posiblesVelocidades": [
              {
                "personas": 1,
                "velocidad": 150
              },
              {
                "personas": 2,
                "velocidad": 75
              },
              {
                "personas": 3,
                "velocidad": 50
              },
              {
                "personas": 4,
                "velocidad": 38
              }
            ],
            "SchedStartTimeLocal": "2021-06-15T06:15:00",
            "SchedFinishTimeLocal": "2021-06-15T11:00:00",
            "ActStartTimeLocal": "0001-01-01T00:00:00",
            "JobPos": -1,
            "EditTime": "2021-06-15T11:23:49",
            "posiblesLineas": [
              {
                "LineaDesc": "L001",
                "LineaName": "L001",
                "LineaId": 6
              },
              {
                "LineaDesc": "L002",
                "LineaName": "L002",
                "LineaId": 7
              },
              {
                "LineaDesc": "L003",
                "LineaName": "L003",
                "LineaId": 8
              },
              {
                "LineaDesc": "L004",
                "LineaName": "L004",
                "LineaId": 9
              },
              {
                "LineaDesc": "L005",
                "LineaName": "L005",
                "LineaId": 10
              },
              {
                "LineaDesc": "L006",
                "LineaName": "L006",
                "LineaId": 11
              }
            ]
          },
        {
          "WoId": "OF010002d",
          "OperId": "NETEJA",
          "SeqNo": 0,
          "RowId": 259,
          "SeqNoRelacionadoSpare3": 0,
          "JobDesc": null,
          "init_EntId": 38,
          "target_EntId": 7,
          "run_EntId": 0,
          "WoStateCd": 0,
          "StateCd": 2,
          "StateCdDesc": "Ready",
          "ItemId": "01_itemProd",
          "ItemDesc": "01_itemProd",
          "QtyReqd": 1,
          "Duracion": 15,
          "Personas": 1,
          "posiblesVelocidades": [],
          "SchedStartTimeLocal": "2021-06-15T11:00:00",
          "SchedFinishTimeLocal": "2021-06-15T11:15:00",
          "ActStartTimeLocal": "0001-01-01T00:00:00",
          "JobPos": -1,
          "EditTime": "2021-06-15T11:23:48",
          "posiblesLineas": [
            {
              "LineaDesc": "L001",
              "LineaName": "L001",
              "LineaId": 6
            },
            {
              "LineaDesc": "L002",
              "LineaName": "L002",
              "LineaId": 7
            },
            {
              "LineaDesc": "L003",
              "LineaName": "L003",
              "LineaId": 8
            },
            {
              "LineaDesc": "L004",
              "LineaName": "L004",
              "LineaId": 9
            },
            {
              "LineaDesc": "L005",
              "LineaName": "L005",
              "LineaId": 10
            },
            {
              "LineaDesc": "L006",
              "LineaName": "L006",
              "LineaId": 11
            }
          ]
        },
        {
          "WoId": "OF010002d",
          "OperId": "OF010002d-1",
          "SeqNo": 0,
          "RowId": 258,
          "SeqNoRelacionadoSpare3": 0,
          "JobDesc": null,
          "init_EntId": 38,
          "target_EntId": 7,
          "run_EntId": 0,
          "WoStateCd": 0,
          "StateCd": 2,
          "StateCdDesc": "Ready",
          "ItemId": "01_itemProd",
          "ItemDesc": "01_itemProd",
          "QtyReqd": 5000,
          "Duracion": 50,
          "Personas": 3,
          "posiblesVelocidades": [
            {
              "personas": 1,
              "velocidad": 150
            },
            {
              "personas": 2,
              "velocidad": 75
            },
            {
              "personas": 3,
              "velocidad": 50
            },
            {
              "personas": 4,
              "velocidad": 38
            }
          ],
          "SchedStartTimeLocal": "2021-06-15T10:15:00",
          "SchedFinishTimeLocal": "2021-06-15T14:05:00",
          "ActStartTimeLocal": "0001-01-01T00:00:00",
          "JobPos": -1,
          "EditTime": "2021-06-15T11:23:49",
          "posiblesLineas": [
            {
              "LineaDesc": "L001",
              "LineaName": "L001",
              "LineaId": 6
            },
            {
              "LineaDesc": "L002",
              "LineaName": "L002",
              "LineaId": 7
            },
            {
              "LineaDesc": "L003",
              "LineaName": "L003",
              "LineaId": 8
            },
            {
              "LineaDesc": "L004",
              "LineaName": "L004",
              "LineaId": 9
            },
            {
              "LineaDesc": "L005",
              "LineaName": "L005",
              "LineaId": 10
            },
            {
              "LineaDesc": "L006",
              "LineaName": "L006",
              "LineaId": 11
            }
          ]
        },
        {
            "WoId": "OF010004d",
            "OperId": "NETEJA",
            "SeqNo": 0,
            "RowId": 259,
            "SeqNoRelacionadoSpare3": 0,
            "JobDesc": null,
            "init_EntId": 38,
            "target_EntId": 6,
            "run_EntId": 0,
            "WoStateCd": 0,
            "StateCd": 2,
            "StateCdDesc": "Ready",
            "ItemId": "01_itemProd",
            "ItemDesc": "01_itemProd",
            "QtyReqd": 1,
            "Duracion": 15,
            "Personas": 1,
            "posiblesVelocidades": [],
            "SchedStartTimeLocal": "2021-06-15T13:00:00",
            "SchedFinishTimeLocal": "2021-06-15T13:15:00",
            "ActStartTimeLocal": "0001-01-01T00:00:00",
            "JobPos": -1,
            "EditTime": "2021-06-15T11:23:48",
            "posiblesLineas": [
              {
                "LineaDesc": "L001",
                "LineaName": "L001",
                "LineaId": 6
              },
              {
                "LineaDesc": "L002",
                "LineaName": "L002",
                "LineaId": 7
              },
              {
                "LineaDesc": "L003",
                "LineaName": "L003",
                "LineaId": 8
              },
              {
                "LineaDesc": "L004",
                "LineaName": "L004",
                "LineaId": 9
              },
              {
                "LineaDesc": "L005",
                "LineaName": "L005",
                "LineaId": 10
              },
              {
                "LineaDesc": "L006",
                "LineaName": "L006",
                "LineaId": 11
              }
            ]
          },
        {
            "WoId": "OF010004d",
            "OperId": "OF010004d-1",
            "SeqNo": 0,
            "RowId": 258,
            "SeqNoRelacionadoSpare3": 0,
            "JobDesc": null,
            "init_EntId": 38,
            "target_EntId": 8,
            "run_EntId": 0,
            "WoStateCd": 0,
            "StateCd": 3,
            "StateCdDesc": "Running",
            "ItemId": "01_itemProd",
            "ItemDesc": "01_itemProd",
            "QtyReqd": 8000,
            "Duracion": 50,
            "Personas": 3,
            "posiblesVelocidades": [
              {
                "personas": 1,
                "velocidad": 150
              },
              {
                "personas": 2,
                "velocidad": 75
              },
              {
                "personas": 3,
                "velocidad": 50
              },
              {
                "personas": 4,
                "velocidad": 38
              }
            ],
            "SchedStartTimeLocal": "2021-06-15T16:00:00",
            "SchedFinishTimeLocal": "2021-06-15T22:20:00",
            "ActStartTimeLocal": "0001-01-01T00:00:00",
            "JobPos": -1,
            "EditTime": "2021-06-15T11:23:49",
            "posiblesLineas": [
              {
                "LineaDesc": "L001",
                "LineaName": "L001",
                "LineaId": 6
              },
              {
                "LineaDesc": "L002",
                "LineaName": "L002",
                "LineaId": 7
              },
              {
                "LineaDesc": "L003",
                "LineaName": "L003",
                "LineaId": 8
              },
              {
                "LineaDesc": "L004",
                "LineaName": "L004",
                "LineaId": 9
              },
              {
                "LineaDesc": "L005",
                "LineaName": "L005",
                "LineaId": 10
              },
              {
                "LineaDesc": "L006",
                "LineaName": "L006",
                "LineaId": 11
              }
            ]
          },
        {
            "WoId": "OF010005d",
            "OperId": "NETEJA",
            "SeqNo": 0,
            "RowId": 259,
            "SeqNoRelacionadoSpare3": 0,
            "JobDesc": null,
            "init_EntId": 38,
            "target_EntId": 9,
            "run_EntId": 0,
            "WoStateCd": 0,
            "StateCd": 5,
            "StateCdDesc": "Ready",
            "ItemId": "01_itemProd",
            "ItemDesc": "01_itemProd",
            "QtyReqd": 1,
            "Duracion": 15,
            "Personas": 1,
            "posiblesVelocidades": [],
            "SchedStartTimeLocal": "2021-06-15T13:00:00",
            "SchedFinishTimeLocal": "2021-06-15T13:15:00",
            "ActStartTimeLocal": "0001-01-01T00:00:00",
            "JobPos": -1,
            "EditTime": "2021-06-15T11:23:48",
            "posiblesLineas": [
              {
                "LineaDesc": "L001",
                "LineaName": "L001",
                "LineaId": 6
              },
              {
                "LineaDesc": "L002",
                "LineaName": "L002",
                "LineaId": 7
              },
              {
                "LineaDesc": "L003",
                "LineaName": "L003",
                "LineaId": 8
              },
              {
                "LineaDesc": "L004",
                "LineaName": "L004",
                "LineaId": 9
              },
              {
                "LineaDesc": "L005",
                "LineaName": "L005",
                "LineaId": 10
              },
              {
                "LineaDesc": "L006",
                "LineaName": "L006",
                "LineaId": 11
              }
            ]
          },
        {
            "WoId": "OF010005d",
            "OperId": "OF010004d-1",
            "SeqNo": 0,
            "RowId": 258,
            "SeqNoRelacionadoSpare3": 0,
            "JobDesc": null,
            "init_EntId": 38,
            "target_EntId": 10,
            "run_EntId": 0,
            "WoStateCd": 0,
            "StateCd": 5,
            "StateCdDesc": "Suspended",
            "ItemId": "01_itemProd",
            "ItemDesc": "01_itemProd",
            "QtyReqd": 3000,
            "Duracion": 50,
            "Personas": 3,
            "posiblesVelocidades": [
              {
                "personas": 1,
                "velocidad": 150
              },
              {
                "personas": 2,
                "velocidad": 75
              },
              {
                "personas": 3,
                "velocidad": 50
              },
              {
                "personas": 4,
                "velocidad": 38
              }
            ],
            "SchedStartTimeLocal": "2021-06-15T11:00:00",
            "SchedFinishTimeLocal": "2021-06-15T13:20:00",
            "ActStartTimeLocal": "0001-01-01T00:00:00",
            "JobPos": -1,
            "EditTime": "2021-06-15T11:23:49",
            "posiblesLineas": [
              {
                "LineaDesc": "L001",
                "LineaName": "L001",
                "LineaId": 6
              },
              {
                "LineaDesc": "L002",
                "LineaName": "L002",
                "LineaId": 7
              },
              {
                "LineaDesc": "L003",
                "LineaName": "L003",
                "LineaId": 8
              },
              {
                "LineaDesc": "L004",
                "LineaName": "L004",
                "LineaId": 9
              },
              {
                "LineaDesc": "L005",
                "LineaName": "L005",
                "LineaId": 10
              },
              {
                "LineaDesc": "L006",
                "LineaName": "L006",
                "LineaId": 11
              }
            ]
          }
      ],
      "lineas": [
        {
          "entId": 6,
          "entName": "L001",
          "description": "L001",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 7,
          "entName": "L002",
          "description": "L002",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 8,
          "entName": "L003",
          "description": "L003",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 9,
          "entName": "L004",
          "description": "L004",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 10,
          "entName": "L005",
          "description": "L005",
          "operacion": false,
          "ordenes": []
        },
        {
          "entId": 11,
          "entName": "L006",
          "description": "L006",
          "operacion": false,
          "ordenes": []
        }
      ]
    }
  ]