import React, { useContext, useState, useEffect } from "react";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../context/ContextProvider";
import UseFetchMemory from "./../customHooks/UseFetchMemory";
import { Box, LinearProgress, Grid } from "@mui/material";
import TableWidget from "./../../widgets/TableWidget/TableWidget";
import ButtonGroupWidget from "./../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "./../../languages/Text";
import ProductionsModal from "./../modals/ProductionsModal";

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

  //useContext
  const { globalData } = useContext(globalDataContext);
  const { woId, operId, seqNo } = globalData.orderData;
  const { formWidget, setformWidget } = useContext(formContext);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);
  //useState
  const [prodData, setProdData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [refreshData, setRefreshData] = useState(false);

  //fetch data
  let { loading, data } = UseFetchMemory({
    request: "productions",
    customParams: {
      operId,
      entId: globalData.lineData.entId,
      woId,
      seqNo,
    },
  });

  useEffect(() => {
    //TODO
  }, [refreshData]);

  useEffect(() => {
    if (data?.length > 0) {
      setProdData(
        data.map((el) => {
          return { ...el, material: el.item_id + " (" + el.item_desc + ")" };
        })
      );
    }
  }, [data]);

  //useEffect on change selected row
  useEffect(() => {
    if (
      selectedRowsIds["productions"] &&
      selectedRowsIds["productions"].length > 0
    ) {
      let tempRow = data.filter((production) => {
        return production.id === selectedRowsIds["productions"][0];
      });
      setSelectedRows(tempRow);
    }
  }, [selectedRowsIds]);

  // MANUAL PRODUCTION
  const handleManualProduction = () => {
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
    setModalContent("decreaseProduction");
    setShowModal(true);
  };

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      {/* Productions Table */}
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <TableWidget
            data={prodData}
            columns={columns}
            multipleSelection={false}
            tableName="productions"
          />
        </Grid>

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
                disabled: selectedRows?.[0] ? false : true,
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
      />
    </>
  );
};

export default Productions;
