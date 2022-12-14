import React, { useEffect, useContext, useState } from "react";
import { Grid, Paper, LinearProgress, ButtonGroup } from "@mui/material";
import { dataTableMat } from "../../widgets/TableWidget/fakedata";
import TableWidget from "../../widgets/TableWidget/TableWidget";
import Text from "./../../languages/Text";
import { Box } from "@mui/system";
import {
  globalDataContext,
  selectedRowsIdsContext,
  selectedRowsContext,
  formContext,
} from "../../context/ContextProvider";
import UseFetchMemory from "../customHooks/UseFetchMemory";
import ButtonGroupWidget from "../../widgets/buttonGroup/ButtonGroupWidget";
import { ApiCall } from "../../services/Service";
import { emptyContainerRequest, provisionRequestRequest } from "./helper";
import { DataGrid } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";

const Materials = () => {
  const { globalData } = useContext(globalDataContext);
  const { orderData, lineData } = globalData;
  const { woId, operId, seqNo } = orderData;
  const { formWidget, setformWidget } = useContext(formContext);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);
  const { materials } = selectedRowsIds;
  const [loadingEmptyContainer, setLoadingEmptyContainer] = useState(false);
  const [loadingProvisioning, setLoadingProvisioning] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [cantidades, setCantidades] = useState([]);
  const columns = [
    {
      field: "material",
      headerName: `${Text({ tid: "material" })}`,
      flex: 1,
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

  useEffect(() => {
    return () => {
      setSelectedRowsIds([]);
      setSelectedRows([]);
    };
  }, []);
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

  useEffect(() => {
    if (data) {
      let temp = data
        .filter((el) => el.bom_pos !== 0)
        .map((el) => ({
          ...el,
          material: `${el.item_id} (${el.item_desc})`,
        }));
      setTableData(temp);
    }
  }, [data]);

  //useEffect on change selected row
  useEffect(() => {
    if (
      selectedRowsIds["materials"] &&
      selectedRowsIds["materials"].length > 0
    ) {
      let tempRows = selectedRowsIds["materials"].map((rowId) => {
        return tableData.filter((material) => {
          return material.id === rowId;
        });
      });
      setSelectedRows(tempRows);
    }
  }, [selectedRowsIds]);

  useEffect(() => {
    if (selectedRows && selectedRows.length > 0) {
      let tempQtys = selectedRows.map((row) => {
        if (row[0]) {
          return {
            itemId: row[0].item_id,
            CantidadAprov: row[0].CantidadAprov,
          };
        }
      });

      setCantidades(tempQtys);
    }
  }, [selectedRows]);

  const handleProvisioningRequest = async () => {
    setLoadingProvisioning(true);
    const submitObj = {
      lineaName: lineData.entId,
      woId,
      operId,
      items: cantidades,
    };
    await provisionRequestRequest(submitObj);

    setLoadingProvisioning(false);
  };

  /*   const handleEmptyContainerRequest = async () => {
    setLoadingEmptyContainer(true);
    await emptyContainerRequest({ lineaName: lineData.entName, woId, operId });
    setLoadingEmptyContainer(false);
  };
 */

  const disabledButton =
    selectedRowsIds && selectedRowsIds["materials"]?.length > 0 ? false : true;

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <TableWidget
          multipleSelection={true}
          data={tableData}
          setData={setTableData}
          columns={columns}
          tableName="materials"
          pagination={6}
        />
      </Grid>

      <Grid item xs={12} textAlign="center">
        <LoadingButton
          variant="contained"
          sx={{ maxWidth: 400 }}
          loading={loadingProvisioning}
          fullWidth
          disabled={disabledButton}
          color="primary"
          onClick={handleProvisioningRequest}
        >
          {Text({ tid: "provisioningRequest" })}
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default Materials;
