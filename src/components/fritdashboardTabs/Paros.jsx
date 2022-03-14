import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TableWidget from "../../widgets/TableWidget/TableWidget";
import Text from "./../../languages/Text";
import { fakeParos, seccionFake } from "../../widgets/TableWidget/fakedata";
import ButtonGroupWidget from "../../widgets/buttonGroup/ButtonGroupWidget";
import ModalWidget from "./../../widgets/modalWidget/ModalWidget";
import SelectWidget from "../../widgets/forms/SelectWidget";
import InputWidget from "../../widgets/forms/InputWidget";
import TreeViewWidget from "../../widgets/treeView/TreeViewWidget";
import SelectChipWidget from "../../widgets/forms/SelectChipWidget";
import useWindowSize from "./../customHooks/UseWindowsSize";
// import { getAllowableUtilReasons } from "../services/Interruptions";
// import { MemoryDatabaseCall } from "../services/Service";

const Paros = () => {
  const windowsSize = useWindowSize();
  const [modalCreateInterruption, setmodalCreateInterruption] = useState(false);
  const columns = [
    {
      field: "name",
      headerName: `${Text({ tid: "interruption" })}`,
      flex: 1,
    },
    {
      field: "duracion",
      headerName: `${Text({ tid: "duration" })}`,
      flex: 1,
    },
    {
      field: "fechaInicio",
      headerName: `${Text({ tid: "startDate" })}`,
      flex: 1,
    },
    {
      field: "fechaFin",
      headerName: `${Text({ tid: "endDate" })}`,
      flex: 1,
    },
    {
      field: "comentario",
      headerName: `${Text({ tid: "comment" })}`,
      flex: 1,
    },
  ];
  const backDataLines = {
    DataReader: [
      {
        ent_id: 6,
        ent_name: "L001",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 7,
        ent_name: "L002",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 8,
        ent_name: "L003",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 9,
        ent_name: "L004",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 10,
        ent_name: "L005",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 11,
        ent_name: "L006",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 14,
        ent_name: "L021",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 15,
        ent_name: "L022",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 16,
        ent_name: "L023",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 23,
        ent_name: "L024",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 98,
        ent_name: "FSF02",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 116,
        ent_name: "LIM01",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 184,
        ent_name: "PEF02",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 185,
        ent_name: "PEF01",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 186,
        ent_name: "PEC01",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 187,
        ent_name: "PEA02",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 188,
        ent_name: "PEA01",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 191,
        ent_name: "TRS01",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 192,
        ent_name: "TRF01",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 193,
        ent_name: "TRC01",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 194,
        ent_name: "TRA02",
        attr_desc: "Linea",
        attr_value: "SI",
      },
      {
        ent_id: 195,
        ent_name: "TRA01",
        attr_desc: "Linea",
        attr_value: "SI",
      },
    ],
  };

  let linesData = backDataLines.DataReader.map((obj) => {
    return {
      key: obj.ent_id,
      value: obj.ent_name,
      text: obj.ent_name,
    };
  });

  //////////
  const backDataGroups = {
    DataReader: [
      {
        GrpId: 4,
        GrpDesc: "Limpieza",
        ParentGrpId: "1",
      },
      {
        GrpId: 6,
        GrpDesc: "Cambios",
        ParentGrpId: "2",
      },
      {
        GrpId: 7,
        GrpDesc: "Mantenimiento",
        ParentGrpId: "2",
      },
      {
        GrpId: 8,
        GrpDesc: "Otros",
        ParentGrpId: "2",
      },
      {
        GrpId: 9,
        GrpDesc: "Mantenimiento",
        ParentGrpId: "1",
      },
      {
        GrpId: 10,
        GrpDesc: "Formacion",
        ParentGrpId: "1",
      },
      {
        GrpId: 14,
        GrpDesc: "test",
        ParentGrpId: "4",
      },
      {
        GrpId: 94,
        GrpDesc: "test1",
        ParentGrpId: "14",
      },
      {
        GrpId: 1,
        GrpDesc: "Planificados",
        ParentGrpId: null,
      },
      {
        GrpId: 2,
        GrpDesc: "No Planificados",
        ParentGrpId: null,
      },
    ],
    DataTimestamp: "2022-03-11T09:51:51.2416496Z",
  };

  let firstLevel = backDataGroups.DataReader.filter((grp) => {
    return grp.ParentGrpId == null;
  });
  // console.log("firstLevel", firstLevel);

  let grandParentGrps = firstLevel.map((grp) => {
    return { id: grp.GrpId, name: grp.GrpDesc, children: [] };
  });
  // console.log("grandParentGrps", grandParentGrps);

  let intermediateLevels = backDataGroups.DataReader.filter((grp) => {
    return grp.ParentGrpId != null;
  });
  // console.log("intermediateLevels", intermediateLevels);

  let intermediateGrps = grandParentGrps.map((GPgrp) => {
    intermediateLevels.map((grp) => {
      if (GPgrp.id == grp.ParentGrpId) {
        return (GPgrp.children = [
          ...GPgrp.children,
          { id: grp.GrpId, name: grp.GrpDesc, children: [] },
        ]);
      }
    });
    return GPgrp;
  });
  console.log("intermediateGrps", intermediateGrps);

  let intermediateGrps1 = intermediateGrps.map((item) => {
    item.children.map((obj) => {
      intermediateLevels.map((el) => {
        if (obj.id == el.ParentGrpId) {
          return (obj.children = [
            ...obj.children,
            { id: el.GrpId, name: el.GrpDesc, children: [] },
          ]);
        }
      });
    });
    return item;
  });
  console.log("intermediateGrps1", intermediateGrps1);

  let intermediateGrps2 = intermediateGrps1.map((item) => {
    item.children.map((obj) => {
      obj.children.map((obj1) => {
        intermediateLevels.map((el) => {
          if (obj1.id == el.ParentGrpId) {
            return (obj1.children = [
              ...obj1.children,
              { id: el.GrpId, name: el.GrpDesc },
            ]);
          }
        });
      });
    });
    return item;
  });
  console.log("intermediateGrps2", intermediateGrps2);

  // const fetchReasons = async () => {
  //   const response = await MemoryDatabaseCall({
  //     params: getAllowableUtilReasons({
  //       entId: "6", //TODO
  //     }),
  //     url: "queryDataAsync",
  //   });
  //   if (response) {
  //     console.log("response", response);
  //     //setReasons(response);
  //   }
  // };

  const backDataReasons = {
    DataReader: [
      {
        ent_id: 6,
        reas_cd: 14,
        reas_desc: "Ajustes",
        reas_grp_id: 6,
      },
      {
        ent_id: 6,
        reas_cd: 28,
        reas_desc: "Espera Laboratorio",
        reas_grp_id: 8,
      },
      {
        ent_id: 6,
        reas_cd: 25,
        reas_desc: "Falta Material",
        reas_grp_id: 8,
      },
      {
        ent_id: 6,
        reas_cd: 26,
        reas_desc: "Falta Personal",
        reas_grp_id: 8,
      },
      {
        ent_id: 6,
        reas_cd: 6,
        reas_desc: "Formacion",
        reas_grp_id: 10,
      },
      {
        ent_id: 6,
        reas_cd: 13,
        reas_desc: "Limpieza",
        reas_grp_id: 6,
      },
      {
        ent_id: 6,
        reas_cd: 15,
        reas_desc: "Mantenimiento Correctivo",
        reas_grp_id: 7,
      },
      {
        ent_id: 6,
        reas_cd: 7,
        reas_desc: "Mantenimiento Preventivo",
        reas_grp_id: 9,
      },
      {
        ent_id: 6,
        reas_cd: 5,
        reas_desc: "Mensual",
        reas_grp_id: 4,
      },
      {
        ent_id: 6,
        reas_cd: 27,
        reas_desc: "Paro Comida",
        reas_grp_id: 8,
      },
      {
        ent_id: 6,
        reas_cd: 4,
        reas_desc: "Semanal",
        reas_grp_id: 4,
      },
      {
        ent_id: 6,
        reas_cd: 3,
        reas_desc: "Turno",
        reas_grp_id: 4,
      },
    ],
  };

  let childReasons = intermediateGrps.map((grp) => {
    grp.children.map((obj) => {
      backDataReasons.DataReader.map((reas) => {
        if (obj.id == reas.reas_grp_id) {
          return (obj.children = [
            ...obj.children,
            { id: "reas" + reas.reas_cd, name: reas.reas_desc },
          ]);
        }
      });
    });
    return grp;
  });
  console.log("childReasons", childReasons);

  ///////////

  let treeData = {
    id: "root",
    name: <Text tid={"sectionReason"} />,
    children: childReasons,
  };
  console.log(treeData);

  const handleSelectNode = (event, tempNodeId) => {
    try {
      let nodeId = tempNodeId.replace("reas", "");
      let selectedNode = backDataReasons.DataReader.find((el) => {
        return el.reas_cd == nodeId;
      });
      console.log("selectedNode", selectedNode);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleTestClick = () => {
    setmodalCreateInterruption(true);
    fetchReasons();
  };
  const modalContent = (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <SelectChipWidget
            formId={"generateInterruption"}
            id={"generateInterruptionLine"}
            label={<Text tid={"line"} />}
            multiple={false}
            options={linesData}
            required={true}
            placeholder={""}
            disabled={false}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputWidget
            formId={"generateInterruption"}
            id={"generateInterruptionComment"}
            label={<Text tid={"comment"} />}
            required={false}
            multiline={true}
            type={"text"}
            maxLength={100}
            disabled={false}
            placeholder={""}
            min={null}
            max={null}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TreeViewWidget
            treeData={treeData}
            handleSelectNode={handleSelectNode}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <ButtonGroupWidget
            position={"right"}
            buttons={[
              {
                text: "save",
                color: "primary",
                onClick: handleTestClick,
                //disabled: selectedNode ? true : false,
              },
            ]}
            loading={false}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <Grid container>
        <Paper sx={{ width: "100%", marginTop: "1rem" }}>
          <TableWidget data={fakeParos} columns={columns} />
        </Paper>
        <ButtonGroupWidget
          buttons={[
            {
              text: "createInterruption",
              color: "primary",
              onClick: handleTestClick,
            },
            { text: "justifyInterruption", color: "success", disabled: true },
          ]}
        />
      </Grid>
      <ModalWidget
        open={modalCreateInterruption}
        close={() => setmodalCreateInterruption(false)}
        content={modalContent}
        customWidth={windowsSize.width > 767 ? 700 : 350}
      />
    </>
  );
};

export default Paros;
