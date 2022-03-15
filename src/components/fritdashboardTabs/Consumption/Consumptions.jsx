import React, { useContext, useState, useEffect } from "react";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../../context/ContextProvider";
import UseFetchMemory from "./../../customHooks/UseFetchMemory";
import { Box, LinearProgress, Grid } from "@mui/material";
import TableWidget from "./../../../widgets/TableWidget/TableWidget";
import ButtonGroupWidget from "./../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "../../../languages/Text";
import ConsumptionsModal from "./ConsumptionsModal";

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
  const { formWidget, setformWidget } = useContext(formContext);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);
  //useState
  const [consData, setConsData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [refreshData, setRefreshData] = useState(false);

  //fetch data
  let { loading, data } = UseFetchMemory({
    request: "consumptions",
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
      setConsData(
        data.map((el) => {
          return { ...el, material: el.item_id + " (" + el.item_desc + ")" };
        })
      );
    }
  }, [data]);

  //useEffect on change selected row
  useEffect(() => {
    if (
      selectedRowsIds["consumptions"] &&
      selectedRowsIds["consumptions"].length > 0
    ) {
      let tempRow = data.filter((consumption) => {
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
      {/* Consumpions Table */}
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <TableWidget
            data={consData}
            columns={columns}
            multipleSelection={false}
            tableName="consumptions"
          />
        </Grid>

        <Grid item xs={12}>
          <ButtonGroupWidget
            position="left"
            buttons={[
              {
                text: "consumptionCorrection",
                color: "primary",
                onClick: handleConsumptionCorrection,
                disabled: selectedRows?.[0] ? false : true,
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
