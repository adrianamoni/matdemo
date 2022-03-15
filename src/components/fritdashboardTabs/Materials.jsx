import React, { useEffect, useContext } from "react";
import { Grid, Paper, LinearProgress, ButtonGroup } from "@mui/material";
import { dataTableMat } from "../../widgets/TableWidget/fakedata";
import TableWidget from "../../widgets/TableWidget/TableWidget";
import Text from "./../../languages/Text";
import { Box } from "@mui/system";
import { globalDataContext } from "../../context/ContextProvider";
import UseFetchMemory from "../customHooks/UseFetchMemory";
import ButtonGroupWidget from "../../widgets/buttonGroup/ButtonGroupWidget";

const Materials = () => {
  const { globalData } = useContext(globalDataContext);
  const { woId, operId, seqNo } = globalData.orderData;

  const columns = [
    {
      field: "item_desc",
      headerName: `${Text({ tid: "material" })}`,
      flex: 1,
    },
    {
      field: "bom_pos",
      headerName: `${Text({ tid: "alternative" })}`,
      width: 70,
    },
    {
      field: "BackFlush",
      headerName: `${Text({ tid: "entityBatch" })}`,
      width: 70,
    },
    {
      field: "UnidadMedida",
      headerName: `${Text({ tid: "unitMeasurement" })}`,
      flex: 1,
    },
    {
      field: "CantidadAprov",
      headerName: `${Text({ tid: "provisioning" })}`,
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "CantidadTotal",
      headerName: `${Text({ tid: "total" })}`,
      type: "number",
      flex: 1,
    },
  ];

  const { loading, data } = UseFetchMemory({
    request: "material-list",
    customParams: {
      operId,
      entId: globalData.lineData.entId,
      woId,
      seqNo,
    },
  });
  const handleTestClick = () => {};
  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <TableWidget data={data} columns={columns} tableName="materials" />
      </Grid>

      <Grid item xs={12}>
        <ButtonGroupWidget
          position={"center"}
          buttons={[
            {
              text: "provisioningRequest",
              color: "primary",
              onClick: handleTestClick,
            },
            {
              text: "emptyContainerRequest",
              color: "secondary" /* disabled: true */,
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default Materials;
