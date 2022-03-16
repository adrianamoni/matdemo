import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import UseFetchMemory from "../../customHooks/UseFetchMemory";
import { getConsumptionData, getOrdersData, getProductionData } from "./helper";
import TableWidget from "../../../widgets/TableWidget/TableWidget";
import Text from "../../../languages/Text";
import {
  loginContext,
  selectedRowsContext,
  selectedRowsIdsContext,
} from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const OrderManager = () => {
  const { loggedUser, setLoggedUser } = useContext(loginContext);
  const navigateTo = useNavigate();
  const [entIdSelected, setEntIdSelected] = useState();
  const [itemIdSelected, setItemIdSelected] = useState();
  const [dateSelected, setDateSelected] = useState();
  const [ordersData, setOrdersData] = useState();
  const [consumptionData, setConsumptionData] = useState();
  const [productionData, setProductionData] = useState();
  const [loadingData, setLoadingData] = useState(false);
  const [loadingFromSelected, setLoadingFromSelected] = useState(false);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);

  if (loggedUser.isLogged) {
    /* //!UNDO
    if (
      !loggedUser.permissions.find((el) => el.desc.includes("GestionOrden")) 
    ) {
     
      navigateTo("/");
    } */
  } else {
    navigateTo("/");
  }

  const orderColumns = [
    {
      field: "wo_id",
      headerName: `${Text({ tid: "order" })}`,
      flex: 1,
    },
    {
      field: "run_ent_name",
      headerName: `${Text({ tid: "line" })}`,
      flex: 1,
    },
    {
      field: "material",
      headerName: "Material",
      flex: 1,
    },
    {
      field: "customSchedStart",
      headerName: `${Text({ tid: "initSchedDate" })}`,
      flex: 1,
    },
    {
      field: "customSchedEnd",
      headerName: `${Text({ tid: "endSchedDate" })}`,
      flex: 1,
    },
    {
      field: "customActStart",
      headerName: `${Text({ tid: "initDate" })}`,
      flex: 1,
    },
    {
      field: "customActEnd",
      headerName: `${Text({ tid: "endDate" })}`,
      flex: 1,
    },
    {
      field: "qty_prod",
      headerName: `${Text({ tid: "quantityProduced" })}`,
      type: "number",
      flex: 1,
    },
    {
      field: "qty_reqd",
      headerName: `${Text({ tid: "quantityRequired" })}`,
      type: "number",
      flex: 1,
    },
  ];

  const consColumns = [
    {
      field: "material",
      headerName: `${Text({ tid: "material" })}`,
      flex: 1,
    },
    {
      field: "lot_no",
      headerName: `${Text({ tid: "lot" })}`,
      width: 200,
    },
    {
      field: "qty_cons",
      headerName: `${Text({ tid: "quantity" })}`,
      width: 200,
    },
  ];

  const prodColumns = [
    {
      field: "material",
      headerName: `${Text({ tid: "material" })}`,
      flex: 1,
    },
    {
      field: "lot_no",
      headerName: `${Text({ tid: "lot" })}`,
      width: 200,
    },
    {
      field: "qty_prod",
      headerName: `${Text({ tid: "quantity" })}`,
      width: 200,
    },
    {
      field: "reas_desc",
      headerName: `${Text({ tid: "reason" })}`,
      width: 200,
    },
  ];
  useEffect(() => {
    return () => {
      setOrdersData([]);
    };
  }, []);

  //useEffect on change selected row
  useEffect(() => {
    if (
      selectedRowsIds["order-management"] &&
      selectedRowsIds["order-management"].length > 0
    ) {
      let tempRow = ordersData.filter((order) => {
        return order.id === selectedRowsIds["order-management"][0];
      });
      if (tempRow.length > 0) {
        getSelectedData(tempRow[0]);
        setSelectedRows(tempRow);
      }
    }
  }, [selectedRowsIds]);

  const { data: entFilter } = UseFetchMemory({
    request: "order-manager-ent",
  });
  const { data: itemFilter } = UseFetchMemory({
    request: "order-manager-item",
  });
  const { data: dateFilter } = UseFetchMemory({
    request: "order-manager-date",
  });

  const applyFilters = async () => {
    setLoadingData(true);

    let formattedDate;
    if (dateSelected) {
      formattedDate = moment(dateSelected, "DD-MM-YYYY").format();
    }
    console.log("dateSelected", dateSelected, formattedDate);
    const response = await getOrdersData({
      entId: entIdSelected,
      itemId: itemIdSelected,
      date: formattedDate,
    });

    setOrdersData(response);
    setLoadingData(false);
  };

  const getSelectedData = async (selectedRows) => {
    setLoadingFromSelected(true);
    const { wo_id, oper_id, seq_no, run_ent_id } = selectedRows;
    const consData = await getConsumptionData({
      operId: oper_id,
      entId: run_ent_id,
      woId: wo_id,
      seqNo: seq_no,
    });
    const prodData = await getProductionData({
      operId: oper_id,
      entId: run_ent_id,
      woId: wo_id,
      seqNo: seq_no,
    });

    if (consData) {
      setConsumptionData(consData);
    } else {
      setConsumptionData(null);
    }
    if (prodData) {
      setProductionData(prodData);
    } else {
      setProductionData(null);
    }

    setLoadingFromSelected(false);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={12} md={11}>
        <Grid container spacing={2}>
          {entFilter && (
            <Grid item xs={12} sm={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Línea</InputLabel>
                <Select
                  value={entIdSelected}
                  label="Línea"
                  onChange={(e) => setEntIdSelected(e.target.value)}
                >
                  {entFilter.map((ent) => (
                    <MenuItem value={ent.ent_id}>{ent.ent_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          {itemFilter && (
            <Grid item xs={12} sm={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Material</InputLabel>
                <Select
                  value={itemIdSelected}
                  label="Material"
                  onChange={(e) => setItemIdSelected(e.target.value)}
                >
                  {itemFilter.map((item) => (
                    <MenuItem value={item.item_id}>{item.item_desc}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          {dateFilter && (
            <Grid item xs={12} sm={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Fecha</InputLabel>
                <Select
                  value={dateSelected}
                  label="Fecha"
                  onChange={(e) => setDateSelected(e.target.value)}
                >
                  {dateFilter.map((date) => (
                    <MenuItem value={date[""]}>{date[""]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={1}>
        <Button fullWidth variant="contained" onClick={() => applyFilters()}>
          Aplicar
        </Button>
      </Grid>
      <Divider />
      {loadingData ? (
        <Grid item xs={12}>
          <LinearProgress variant="indeterminate" />
        </Grid>
      ) : ordersData && ordersData.length > 0 ? (
        <Grid item xs={12}>
          <TableWidget
            data={ordersData}
            columns={orderColumns}
            tableName="order-management"
          />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Alert variant="outlined" severity="info">
            No hay órdenes que coincidan con los filtros aplicados
          </Alert>
        </Grid>
      )}

      {loadingFromSelected ? (
        <Grid item xs={12}>
          <LinearProgress variant="indeterminate" />
        </Grid>
      ) : consumptionData ? (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6">
                {Text({ tid: "consumptions" })}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TableWidget
                data={consumptionData}
                columns={consColumns}
                tableName="cons-order-management"
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        selectedRows.length > 0 && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
            <Alert variant="outlined" severity="info">
              No hay consumos en esta orden
            </Alert>
          </Grid>
        )
      )}
      {console.log("productionData", productionData)}
      {loadingFromSelected ? (
        <></>
      ) : productionData ? (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6">
                {Text({ tid: "productions" })}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TableWidget
                data={productionData}
                columns={prodColumns}
                tableName="prod-order-management"
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        !loadingFromSelected &&
        selectedRows.length > 0 && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
            <Alert variant="outlined" severity="info">
              No hay producciones en esta orden
            </Alert>
          </Grid>
        )
      )}
    </Grid>
  );
};

export default OrderManager;
