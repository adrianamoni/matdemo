import React, { useState } from "react";
import {
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
import { getOrdersData } from "./helper";
import TableWidget from "../../../widgets/TableWidget/TableWidget";
import Text from "../../../languages/Text";

const OrderManagement = () => {
  const [entIdSelected, setEntIdSelected] = useState();
  const [itemIdSelected, setItemIdSelected] = useState();
  const [dateSelected, setDateSelected] = useState();
  const [ordersData, setOrdersData] = useState();
  const [loadingData, setLoadingData] = useState(false);

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
      field: "act_start_time_local",
      headerName: `${Text({ tid: "initDate" })}`,
      flex: 1,
    },
    {
      field: "act_finish_time_local",
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
    const response = await getOrdersData({
      entId: entIdSelected,
      itemId: itemIdSelected,
      date: dateSelected,
    });

    setOrdersData(response);
    setLoadingData(false);
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
        <Button variant="contained" onClick={() => applyFilters()}>
          Aplicar
        </Button>
      </Grid>
      <Divider />
      {loadingData ? (
        <Grid item xs={12}>
          <LinearProgress variant="indeterminate" />
        </Grid>
      ) : (
        ordersData && (
          <Grid item xs={12}>
            <TableWidget
              data={ordersData}
              columns={orderColumns}
              tableName="order-management"
            />
          </Grid>
        )
      )}

      <Grid item xs={12} sm={12} md={12} lg={6}>
        <Typography variant="h6">{Text({ tid: "consumptions" })}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <Typography variant="h6">{Text({ tid: "productions" })}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderManagement;
