import React, { useEffect, useContext, useState } from "react";
import { Grid, Paper, LinearProgress, ButtonGroup } from "@mui/material";
import { dataTableMat } from "../../widgets/TableWidget/fakedata";
import TableWidget from "../../widgets/TableWidget/TableWidget";
import Text from "./../../languages/Text";
import { Box } from "@mui/system";
import {
  globalDataContext,
  selectedRowsIdsContext,
  formContext,
} from "../../context/ContextProvider";
import UseFetchMemory from "../customHooks/UseFetchMemory";
import ButtonGroupWidget from "../../widgets/buttonGroup/ButtonGroupWidget";
import { ApiCall } from "../../services/Service";
import { emptyContainerRequest } from "./helper";
import { DataGrid } from "@mui/x-data-grid";

const Materials = () => {
  const { globalData } = useContext(globalDataContext);
  const { orderData, lineData } = globalData;
  const { woId, operId, seqNo } = orderData;
  const { formWidget, setformWidget } = useContext(formContext);
  const { selectedRowsIds } = useContext(selectedRowsIdsContext);
  const { materials } = selectedRowsIds;
  const [loadingEmptyContainer, setLoadingEmptyContainer] = useState();
  const [loadingProvisioning, setLoadingProvisioning] = useState();
  const columns = [
    {
      field: "material",
      headerName: `${Text({ tid: "material" })}`,
      flex: 1,
    },
    /*  {
      field: "bom_pos",
      headerName: `${Text({ tid: "alternative" })}`,
      width: 70,
    },
    {
      field: "BackFlush",
      headerName: `${Text({ tid: "entityBatch" })}`,
      width: 70,
    }, */
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
  useEffect(() => {
    if (formWidget.materials) {
      if (formWidget.materials) {
      }
    }
  }, [formWidget]);

  const { loading, data } = UseFetchMemory({
    request: "material-list",
    customParams: {
      operId,
      entId: globalData.lineData.entId,
      woId,
      seqNo,
    },
  });
  let processedData;
  if (data) {
    processedData = data.map((el) => ({
      ...el,
      material: `${el.item_id} (${el.item_desc})`,
    }));
  }

  const handleProvisioningRequest = async () => {
    setLoadingProvisioning(true);
    let cantidades;
    if (materials && materials.length > 0) {
      cantidades = data
        .filter((el) => materials.find((el2) => el.id === el2))
        .map((item) => ({
          itemId: item.item_id,
          CantidadAprov: item.qtyAprov, //cantidad del input
        }));
    }

    /* await provisionRequestRequest({
      lineaName: lineData.entName,
      woId,
      operId,
      items: cantidades,
    }); */

    setLoadingProvisioning(false);
  };

  /* 

const handleProvisioning = async () => {
  let arr = [...apiData];
  const cantidades = arr
    .filter((el) => el.selected === true)
    .map((item) => ({ itemId: item.item_id, CantidadAprov: item.qtyAprov }));

  setLoadingProvisioning(true);
  const response = await ApiCall({
    params: tab_materials_provisioning_request({
      lineaName: line.entName,
      woId: order.woId,
      operId: order.operId,
      items: cantidades,
    }),
  });
  if (response.responseError) {
    setLoadingProvisioning(false);
    createNotification({
      status: "error",
      code: response.responseError,
      msg: response.responseMsg,
      hide: response.responseHide,
    });
  } else {
    setLoadingProvisioning(false);
    createNotification({
      status: "success",
      msg: "!Solicitud de Aprovisionamiento con éxito!",
      hide: response.responseHide,
    });
  }
  fetchData();
}; */

  const handleEmptyContainerRequest = async () => {
    setLoadingEmptyContainer(true);
    await emptyContainerRequest({ lineaName: lineData.entName, woId, operId });
    setLoadingEmptyContainer(false);
  };

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <Grid container sx={{ mt: 4 }}>
      <Grid item xs={12}>
        <TableWidget
          multipleSelection={true}
          data={processedData}
          columns={columns}
          tableName="materials"
          pagination={6}
        />
      </Grid>

      <Grid item xs={12}>
        <ButtonGroupWidget
          position={"center"}
          buttons={[
            {
              text: "provisioningRequest",
              color: "primary",
              onClick: handleProvisioningRequest,
              loading: loadingProvisioning,
            },
            {
              text: "emptyContainerRequest",
              color: "secondary" /* disabled: true */,
              onClick: handleEmptyContainerRequest /* disabled: true */,
              loading: loadingEmptyContainer,
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default Materials;
