import React, { useContext, useState, useEffect } from "react";
import uuid from "react-uuid";
import {
  loginContext,
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../../context/ContextProvider";
import { MemoryDatabaseCall } from "../../../services/Service";
import { tab_productions, tavil_send } from "../../../services/OFservices";
import { Box, LinearProgress, Grid } from "@mui/material";
import TableWidget from "./../../../widgets/TableWidget/TableWidget";
import ButtonGroupWidget from "./../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "../../../languages/Text";
import ProductionsModal from "./ProductionsModal";
import UserAlert from "./../../alerts/UserAlert";

const Productions = () => {
  const columns = [
    {
      field: "material",
      headerName: `${Text({ tid: "material" })}`,
      flex: 1,
    },
    {
      field: "lot_no",
      headerName: `${Text({ tid: "lot" })}`,
      flex: 1,
    },
    {
      field: "reas_desc",
      headerName: `${Text({ tid: "reason" })}`,
      flex: 1,
    },
    {
      field: "qty_prod",
      headerName: `${Text({ tid: "quantity" })}`,
      flex: 1,
      type: "number",
    },
  ];

  //useContext
  const { loggedUser, setLoggedUser } = useContext(loginContext);
  const { globalData } = useContext(globalDataContext);
  const { woId, operId, seqNo } = globalData.orderData;
  const { entId, entName } = globalData.lineData;
  const { formWidget, setformWidget } = useContext(formContext);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);
  //useState
  const [tableData, setTableData] = useState(false);
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAlert, setUserAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const [productionCorrectionPermission, setProductionCorrectionPermission] =
    useState(false);
  const [disableManualProductionButton, setDisableManualProductionButton] =
    useState(false);

  useEffect(() => {
    !loggedUser &&
      sessionStorage.getItem("userInfo") &&
      setLoggedUser(JSON.parse(sessionStorage.getItem("userInfo")));

    return () => {
      setSelectedRows([]);
      setSelectedRowsIds([]);
    };
  }, []);

  useEffect(() => {
    if (loggedUser) {
      if (
        loggedUser.permissions.find(
          (item) => item.desc === "CorregirProduccion.Edicion" // HARDCODED Edicion o Escritura, o lo que sea.
        )
      ) {
        setProductionCorrectionPermission(true);
      }
    }
  }, [loggedUser]);

  useEffect(() => {
    let clearTimeoutKey;

    const fetchData = async (showLoader) => {
      showLoader && setLoading(true);
      const response = await MemoryDatabaseCall({
        params: tab_productions({
          entId: entId,
          woId: woId,
          operId: operId,
          seqNo: seqNo,
        }),
        url: "queryDataAsync",
      });
      if (response) {
        setLoading(false);

        setTableData(
          response.map((item, i) => ({
            ...item,
            id: uuid(),
            index: i + 1,
            material: item.item_id + " (" + item.item_desc + ")",
            color: !item.good_prod ? "d11f1f33" : "e6f7ff",
          }))
        );
      } else {
        setLoading(false);
      }
      clearTimeoutKey = setTimeout(fetchData, 30000);
    };

    fetchData(true);
    refreshData && setRefreshData(false);
    return () => {
      clearTimeout(clearTimeoutKey);
      setTableData([]);
    };
  }, [refreshData]);

  useEffect(() => {
    if (globalData.orderData && globalData.lineData) {
      setData({
        woId: woId,
        operId: operId,
        entName: entName,
        seqNo: seqNo,
      });
      fetchSendTavilData();
    }
  }, [globalData.orderData, globalData.lineData]);

  useEffect(() => {
    tableData && tableData.length < 1
      ? setUserAlert({
          show: true,
          message: "No hay producciones actualmente",
          severity: "info",
        })
      : setUserAlert({
          show: false,
          message: "",
          severity: "",
        });
  }, [tableData]);

  const fetchSendTavilData = async () => {
    const response = await MemoryDatabaseCall({
      params: tavil_send(entId),
      url: "queryDataAsync",
    });
    if (response) {
      if (response) {
        if (response.length > 0) {
          response[0].EnvioTAVIL
            ? setDisableManualProductionButton(false)
            : setDisableManualProductionButton(true);
        }
      }
    }
  };

  //useEffect on change selected row
  useEffect(() => {
    if (
      selectedRowsIds["productions"] &&
      selectedRowsIds["productions"].length > 0
    ) {
      let tempRow = tableData.filter((production) => {
        return production.id === selectedRowsIds["productions"][0];
      });
      setSelectedRows(tempRow);
    }
  }, [selectedRowsIds]);

  // MANUAL PRODUCTION
  const handleManualProduction = () => {
    setformWidget({
      ...formWidget,
      manualProductionForm: {},
    });
    setModalContent("manualProduction");
    setShowModal(true);
  };
  // PRODUCTION CORRECTION
  const handleProductionCorrection = () => {
    setformWidget({
      ...formWidget,
      productionCorrectionForm: {
        material:
          selectedRows[0].item_id + " (" + selectedRows[0].item_desc + ")",
        lot: selectedRows[0].lot_no,
        quantity: selectedRows[0].qty_prod,
      },
    });
    setModalContent("productionCorrection");
    setShowModal(true);
  };
  // PRODUCTION DECREASE
  const handleDecreaseProduction = () => {
    setformWidget({
      ...formWidget,
      addDecreaseForm: {},
    });
    setModalContent("decreaseProduction");
    setShowModal(true);
  };

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <>
      <Grid container sx={{ mt: 4, paddingRight: 3 }}>
        {/* Productions Table */}
        {tableData?.length > 0 ? (
          <Grid item xs={12}>
            <TableWidget
              data={tableData}
              columns={columns}
              multipleSelection={false}
              tableName="productions"
            />
          </Grid>
        ) : (
          userAlert.show && (
            <UserAlert
              severity={userAlert.severity}
              message={userAlert.message}
            />
          )
        )}

        <Grid item xs={12}>
          <ButtonGroupWidget
            position="left"
            buttons={[
              {
                text: "manualProduction",
                color: "primary",
                onClick: handleManualProduction,
                disabled: false,
              },
              {
                text: "productionCorrection",
                color: "secondary",
                onClick: handleProductionCorrection,
                disabled:
                  !productionCorrectionPermission || !selectedRows[0]
                    ? true
                    : false,
              },
              {
                text: "addDecrease",
                color: "primary",
                onClick: handleDecreaseProduction,
                disabled: false,
              },
            ]}
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Others */}
      <ProductionsModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalContent={modalContent}
        setRefreshData={setRefreshData}
        data={data}
      />
    </>
  );
};

export default Productions;
