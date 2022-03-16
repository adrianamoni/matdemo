import React, { useContext, useState, useEffect } from "react";
import uuid from "react-uuid";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../../context/ContextProvider";
import { MemoryDatabaseCall } from "../../../services/Service";
import { tab_consumptions } from "../../../services/OFservices";
import { Box, LinearProgress, Grid } from "@mui/material";
import TableWidget from "./../../../widgets/TableWidget/TableWidget";
import ButtonGroupWidget from "./../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "../../../languages/Text";
import ConsumptionsModal from "./ConsumptionsModal";
import UserAlert from "./../../alerts/UserAlert";

const Consumptions = () => {
  const columns = [
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

  //useContext
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
  const [loading, setLoading] = useState(false);
  const [userAlert, setUserAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    return () => {
      setSelectedRows([]);
      setSelectedRowsIds([]);
    };
  }, []);

  useEffect(() => {
    let clearTimeoutKey;

    const fetchData = async (showLoader) => {
      showLoader && setLoading(true);

      const response = await MemoryDatabaseCall({
        params: tab_consumptions({
          entId: entId,
          woId: woId,
          operId: operId,
          seqNo: seqNo,
        }),
        url: "queryDataAsync",
      });
      if (response) {
        const res = response.map((item, i) => ({
          ...item,
          index: i + 1,
          id: uuid(),
          material: item.item_id + " (" + item.item_desc + ")",
        }));
        setTableData(res);
      }
      setLoading(false);
      clearTimeoutKey = setTimeout(fetchData, 30000);
    };

    fetchData(true);
    refreshData && setRefreshData(false);
    return () => {
      clearTimeout(clearTimeoutKey);
      // setTableVariables({ ...tableVariables, ConsumptionsTable: false });
      setTableData([]);
    };
  }, [refreshData]);

  useEffect(() => {
    tableData && tableData.length < 1
      ? setUserAlert({
          show: true,
          message: "No hay consumos actualmente", //TODO
          severity: "info",
        })
      : setUserAlert({
          show: false,
          message: "",
          severity: "",
        });
  }, [tableData]);

  //useEffect on change selected row
  useEffect(() => {
    if (
      selectedRowsIds["consumptions"] &&
      selectedRowsIds["consumptions"].length > 0
    ) {
      let tempRow = tableData.filter((consumption) => {
        return consumption.id === selectedRowsIds["consumptions"][0];
      });
      setSelectedRows(tempRow);
    }
  }, [selectedRowsIds]);

  // CONSUMPTION CORRECTION
  const handleConsumptionCorrection = () => {
    setformWidget({
      ...formWidget,
      consumptionCorrectionForm: {
        material:
          selectedRows[0].item_id + " (" + selectedRows[0].item_desc + ")",
        lot: selectedRows[0].lot_no,
        quantity: selectedRows[0].qty_cons,
      },
    });
    setModalContent("consumptionCorrection");
    setShowModal(true);
  };

  // CONSUME
  const handleConsume = () => {
    setformWidget({
      ...formWidget,
      consumeForm: {},
    });
    setModalContent("consume");
    setShowModal(true);
  };

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      <Grid container sx={{ mt: 2 }}>
        {/* Consumpions Table */}
        {tableData?.length > 0 ? (
          <Grid item xs={12}>
            <TableWidget
              data={tableData}
              columns={columns}
              multipleSelection={false}
              tableName="consumptions"
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
                text: "consumptionCorrection",
                color: "primary",
                onClick: handleConsumptionCorrection,
                disabled: !selectedRows[0] ? true : false,
              },
              {
                text: "consume",
                color: "secondary",
                onClick: handleConsume,
                disabled: false,
              },
            ]}
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Others */}
      <ConsumptionsModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalContent={modalContent}
        setRefreshData={setRefreshData}
      />
    </>
  );
};

export default Consumptions;
