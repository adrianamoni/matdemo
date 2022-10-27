import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
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
import ConsAndProds from "./ConsAndProds";
// import { DatePicker, LocalizationProvider } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import frLocale from "date-fns/locale/fr";
import DatePickerWidget from "./../../../widgets/forms/DatePickerWidget";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ModalCreateOrder from "../../fritdashboardTabs/Planification/ModalCreateOrder";

const OrderManager = () => {
  const { loggedUser, setLoggedUser } = useContext(loginContext);
  const navigateTo = useNavigate();
  const [entIdSelected, setEntIdSelected] = useState();
  const [itemIdSelected, setItemIdSelected] = useState();
  const [initDateSelected, setInitDateSelected] = useState(
    moment().startOf("week").format("MM/DD/YYYY")
  );
  const [refreshMain, setRefreshMain] = useState(false);
  const [createOrderModal, setCreateOrderModal] = useState(false);
  const [endDateSelected, setEndDateSelected] = useState(
    moment().format("MM/DD/YYYY")
  );
  const [ordersData, setOrdersData] = useState();
  const [consumptionData, setConsumptionData] = useState();
  const [productionData, setProductionData] = useState();
  const [loadingData, setLoadingData] = useState(false);
  const [loadingFromSelected, setLoadingFromSelected] = useState(false);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const [submitedSearch, setSubmitedSearch] = useState(false);
  const [possibleStates, setPossibleStates] = useState([
    "NEW",
    "READY",
    "RUNNING",
    "COMPLETE",
    "SUSPENDED",
    "ONHOLD",
    "CANCELED",
    "BYPASSED",
    "SUPERSEDED",
  ]);
  const [selectedState, setSelectedState] = useState(undefined);
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);

  if (loggedUser.isLogged) {
    if (
      !loggedUser.permissions.find((el) => el.desc.includes("GestorOrdenes"))
    ) {
      navigateTo("/");
    }
  } else {
    navigateTo("/");
  }

  const orderColumns = [
    {
      field: "wo_id",
      headerName: `${Text({ tid: "order" })}`,
      flex: 2,
    },
    {
      field: "target_sched_ent_name",
      headerName: `${Text({ tid: "line" })}`,
      flex: 1,
    },
    {
      field: "state_desc",
      headerName: `${Text({ tid: "status" })}`,
      flex: 1,
    },
    {
      field: "material",
      headerName: "Material",
      flex: 3,
    },
    {
      field: "customSchedStart",
      headerName: `${Text({ tid: "initSchedDate" })}`,
      flex: 2,
    },
    {
      field: "customSchedEnd",
      headerName: `${Text({ tid: "endSchedDate" })}`,
      flex: 2,
    },
    {
      field: "customActStart",
      headerName: `${Text({ tid: "initDate" })}`,
      flex: 2,
    },
    {
      field: "customActEnd",
      headerName: `${Text({ tid: "endDate" })}`,
      flex: 2,
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

  const applyFilters = async () => {
    setLoadingData(true);

    let initDateFormatted, endDateFormatted;
    if (initDateSelected) {
      initDateFormatted = moment(
        initDateSelected /* , "DD-MM-YYYY" */
      ); /* .format(); */
    }
    if (endDateSelected) {
      endDateFormatted = moment(
        endDateSelected /* , "DD-MM-YYYY" */
      ); /* .format(); */
    }
    console.log("endDateFormatted", endDateFormatted);

    let response = await getOrdersData({
      entId: entIdSelected,
      itemId: itemIdSelected,
      initDate: initDateFormatted,
      endDate: endDateFormatted,
    });
    setSelectedRows([]);
    setSelectedRowsIds([]);
    //WARNING - HARDCODED FILTER
    //if state (top filter) selected, hardcode a filter before updating ordersData
    if (selectedState && response?.length > 0) {
      response = response.filter((order) => order.state_desc === selectedState);
    }
    setOrdersData(response);
    setLoadingData(false);
    setSubmitedSearch(true);
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

  const handleCreateOrderClick = () => {
    setCreateOrderModal(true);
  };
  useEffect(() => {
    if (refreshMain) {
      setRefreshMain(false);
    }
    return () => {
      setApiData(undefined);
    };
  }, [refreshMain]);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <Grid container spacing={2}>
            {entFilter && (
              <Grid item xs={12} sm={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>{Text({ tid: "line" })}</InputLabel>
                  <Select
                    value={entIdSelected}
                    label={Text({ tid: "line" })}
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
              <Grid item xs={12} sm={12} md={2}>
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
            <Grid item xs={12} sm={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>{Text({ tid: "status" })}</InputLabel>
                <Select
                  value={selectedState}
                  label={Text({ tid: "status" })}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  {possibleStates.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  inputFormat="DD/MM/yyyy"
                  label={Text({ tid: "startDate" })}
                  value={initDateSelected}
                  onChange={(newValue) => {
                    setInitDateSelected(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  inputFormat="DD/MM/yyyy"
                  label={Text({ tid: "endDate" })}
                  value={endDateSelected}
                  onChange={(newValue) => {
                    setEndDateSelected(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2}>
          <Button /* fullWidth */ variant="contained" onClick={applyFilters}>
            {Text({ tid: "apply" })}
          </Button>
          <Button
            /* fullWidth */ variant="contained"
            onClick={handleCreateOrderClick}
          >
            {Text({ tid: "createOrder" })}
          </Button>
        </Grid>
        <Divider />
        {loadingData ? (
          <Grid item xs={12}>
            <LinearProgress variant="indeterminate" color="secondary" />
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
          submitedSearch && (
            <Grid item xs={12}>
              <Alert variant="filled" severity="info">
                {Text({ tid: "noOrdersMatchingFilter" })}
              </Alert>
            </Grid>
          )
        )}
        <Grid item xs={12}>
          <ConsAndProds
            loading={loadingFromSelected}
            consumptionData={consumptionData}
            selectedRows={selectedRows}
            productionData={productionData}
          />
        </Grid>
      </Grid>
      <ModalCreateOrder
        open={createOrderModal}
        close={setCreateOrderModal}
        setRefreshMain={setRefreshMain}
      />
    </>
  );
};

export default OrderManager;
