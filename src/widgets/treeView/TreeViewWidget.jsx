import React from "react";
import _ from "lodash";
import { TreeView, TreeItem } from "@mui/lab";
import { Checkbox, SvgIcon } from "@mui/material";

const backData = {
  DataReader: [
    {
      reas_grp_desc: "PAROSPENDIENTES",
      reas_desc: "Paro Pendiente de Justificar No Planificado",
      state_desc: "Paros no programados",
      reas_grp_id: 1,
      reas_cd: 38,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PAROSPENDIENTES",
      reas_desc: "Paro Pendiente de Justificar Planificado",
      state_desc: "Paros programados",
      reas_grp_id: 1,
      reas_cd: 40,
      downtime: false,
      runtime: false,
    },
    {
      reas_grp_desc: "PRODUCTIVO",
      reas_desc: "Produccion",
      state_desc: "Tiempo productivo",
      reas_grp_id: 2,
      reas_cd: 5,
      downtime: false,
      runtime: true,
    },
    {
      reas_grp_desc: "PRODUCTIVO",
      reas_desc: "Cambio",
      state_desc: "Paros no programados",
      reas_grp_id: 2,
      reas_cd: 6,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PRODUCTIVO",
      reas_desc: "Inactividad",
      state_desc: "Paros programados",
      reas_grp_id: 2,
      reas_cd: 8,
      downtime: false,
      runtime: false,
    },
    {
      reas_grp_desc: "PRODUCTIVO",
      reas_desc: "Muestras",
      state_desc: "Paros no programados",
      reas_grp_id: 2,
      reas_cd: 9,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PRODUCTIVO",
      reas_desc: "Ready",
      state_desc: "Paros no programados",
      reas_grp_id: 2,
      reas_cd: 12,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PRODUCTIVO",
      reas_desc: "Autocontrol",
      state_desc: "Paros no programados",
      reas_grp_id: 2,
      reas_cd: 22,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "MANTENIMIENTO",
      reas_desc: "Mantenimiento Preventivo",
      state_desc: "Paros programados",
      reas_grp_id: 3,
      reas_cd: 10,
      downtime: false,
      runtime: false,
    },
    {
      reas_grp_desc: "MANTENIMIENTO",
      reas_desc: "Mantenimiento Correctivo",
      state_desc: "Paros no programados",
      reas_grp_id: 3,
      reas_cd: 11,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PAROS",
      reas_desc: "Falta Material",
      state_desc: "Paros no programados",
      reas_grp_id: 4,
      reas_cd: 7,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PAROS",
      reas_desc: "Falta de Personal",
      state_desc: "Paros no programados",
      reas_grp_id: 4,
      reas_cd: 13,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PAROS",
      reas_desc: "Falta OF",
      state_desc: "Paros no programados",
      reas_grp_id: 4,
      reas_cd: 14,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PAROS",
      reas_desc: "Paro Comida",
      state_desc: "Paros no programados",
      reas_grp_id: 4,
      reas_cd: 15,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PAROS",
      reas_desc: "Espera Laboratorio",
      state_desc: "Paros no programados",
      reas_grp_id: 4,
      reas_cd: 16,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PAROS",
      reas_desc: "Cambio de Camion",
      state_desc: "Paros no programados",
      reas_grp_id: 4,
      reas_cd: 17,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PAROS",
      reas_desc: "Formacion",
      state_desc: "Paros programados",
      reas_grp_id: 4,
      reas_cd: 18,
      downtime: false,
      runtime: false,
    },
    {
      reas_grp_desc: "PAROS",
      reas_desc: "Averia Robot",
      state_desc: "Paros no programados",
      reas_grp_id: 4,
      reas_cd: 19,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PAROS",
      reas_desc: "Drenaje",
      state_desc: "Paros no programados",
      reas_grp_id: 4,
      reas_cd: 20,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "PAROS",
      reas_desc: "TOP 5",
      state_desc: "Paros no programados",
      reas_grp_id: 4,
      reas_cd: 21,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "AVERIAS",
      reas_desc: "Averia / Ajuste",
      state_desc: "Paros no programados",
      reas_grp_id: 5,
      reas_cd: 23,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "AVERIAS",
      reas_desc: "Averia Semielaborado",
      state_desc: "Paros no programados",
      reas_grp_id: 5,
      reas_cd: 24,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "AVERIAS",
      reas_desc: "Averia Vibradores",
      state_desc: "Paros no programados",
      reas_grp_id: 5,
      reas_cd: 25,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "AVERIAS",
      reas_desc: "Averia Pesadora",
      state_desc: "Paros no programados",
      reas_grp_id: 5,
      reas_cd: 26,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "AVERIAS",
      reas_desc: "Averia Env. Markem",
      state_desc: "Paros no programados",
      reas_grp_id: 5,
      reas_cd: 27,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "AVERIAS",
      reas_desc: "Averia Env. Mordazas",
      state_desc: "Paros no programados",
      reas_grp_id: 5,
      reas_cd: 28,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "AVERIAS",
      reas_desc: "Averia Env. Vertical",
      state_desc: "Paros no programados",
      reas_grp_id: 5,
      reas_cd: 29,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "AVERIAS",
      reas_desc: "Averia Env. Otros",
      state_desc: "Paros no programados",
      reas_grp_id: 5,
      reas_cd: 30,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "AVERIAS",
      reas_desc: "Averia Cintas",
      state_desc: "Paros no programados",
      reas_grp_id: 5,
      reas_cd: 31,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "AVERIAS",
      reas_desc: "Averia Precintadora/aplicadora",
      state_desc: "Paros no programados",
      reas_grp_id: 5,
      reas_cd: 32,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "AVERIAS",
      reas_desc: "Averia Detector Metales",
      state_desc: "Paros no programados",
      reas_grp_id: 5,
      reas_cd: 33,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "LIMPIEZA",
      reas_desc: "CIL - Clean Turno",
      state_desc: "Paros no programados",
      reas_grp_id: 6,
      reas_cd: 34,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "LIMPIEZA",
      reas_desc: "CIL - Clean Semanal",
      state_desc: "Paros no programados",
      reas_grp_id: 6,
      reas_cd: 35,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "LIMPIEZA",
      reas_desc: "CIL - Inspeccion",
      state_desc: "Paros no programados",
      reas_grp_id: 6,
      reas_cd: 36,
      downtime: true,
      runtime: false,
    },
    {
      reas_grp_desc: "LIMPIEZA",
      reas_desc: "Limpieza",
      state_desc: "Paros no programados",
      reas_grp_id: 6,
      reas_cd: 37,
      downtime: true,
      runtime: false,
    },
  ],
  DataTimestamp: "2022-03-10T10:57:31.6680799Z",
};

const tempGrps = backData.DataReader.reduce(
  (acc, x) =>
    acc.concat(acc.find((y) => y.reas_grp_desc === x.reas_grp_desc) ? [] : [x]),
  []
);

let uniquesGrps = tempGrps.map((item) => {
  backData.DataReader.filter((el) => {
    return el.reas_grp_desc === item.reas_grp_desc;
  });
  return { id: item.reas_grp_id, name: item.reas_grp_desc, children: [] };
});

let treeChildData = uniquesGrps.map((item) => {
  backData.DataReader.map((el) => {
    if (item.name === el.reas_grp_desc) {
      return (item.children = [
        ...item.children,
        { id: el.reas_cd, name: el.reas_desc },
      ]);
    }
  });
  return item;
});

let treeData = {
  id: "root",
  name: "Sección / Motivo",
  children: treeChildData,
};
console.log(treeData);

const TreeViewWidget = () => {
  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  function MinusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
      </SvgIcon>
    );
  }

  function PlusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
      </SvgIcon>
    );
  }

  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["root"]}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<Checkbox inputProps={{ "aria-label": "Checkbox " }} />}
      sx={{ height: 600, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {renderTree(treeData)}
    </TreeView>
  );
};

export default TreeViewWidget;
