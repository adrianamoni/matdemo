import React, { useContext, useState, useEffect } from "react";
import uuid from "react-uuid";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../../context/ContextProvider";
import { fetchAllData } from "./helper";
import { Box, LinearProgress, Grid, Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TableWidget from "./../../../widgets/TableWidget/TableWidget";
import ButtonGroupWidget from "../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "./../../../languages/Text";
import InterruptionsModal from "./InterruptionsModal";
import UserAlert from "./../../alerts/UserAlert";

const Interruptions = () => {
  const columns = [
    {
      field: "ReasonDesc",
      headerName: `${Text({ tid: "interruption" })}`,
      flex: 1,
    },
    {
      field: "Duration",
      headerName: `${Text({ tid: "duration" })}`,
      flex: 1,
    },
    {
      field: "customStartDateTime",
      headerName: `${Text({ tid: "startDate" })}`,
      flex: 1,
    },
    {
      field: "EndDateTime",
      headerName: `${Text({ tid: "endDate" })}`,
      flex: 1,
    },
    {
      field: "Comment",
      headerName: `${Text({ tid: "comment" })}`,
      flex: 1,
    },
  ];

  //useContext
  const { globalData } = useContext(globalDataContext);
  const { woId, operId, seqNo } = globalData.orderData;
  const { entId, entName } = globalData.lineData;
  const { pendingInterruptions } = globalData;
  const { formWidget, setformWidget } = useContext(formContext);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);
  //useState
  const [originalData, setOriginalData] = useState(false);
  const [tableData, setTableData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAlert, setUserAlert] = useState({
    show: true,
    message: Text({ tid: "noInterruptions" }), //TODO
    severity: "info",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const [onlyPendings, setOnlyPendings] = useState(true);

  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    return () => {
      setTableData([]);
      setSelectedRows([]);
      setSelectedRowsIds([]);
    };
  }, []);

  useEffect(() => {
    if (pendingInterruptions && onlyPendings) {
      setTableData(pendingInterruptions.data);
      setOriginalData(pendingInterruptions.data);
    }
  }, [pendingInterruptions, onlyPendings]);

  useEffect(() => {
    setSelectedRowsIds({});
    setSelectedRows([]);
    if (!onlyPendings) {
      getAllData();
    }
    if (refreshData) {
      setRefreshData(false);
    }
  }, [onlyPendings, refreshData]);

  const getAllData = async () => {
    setLoading(true);
    const { orginalRes, res, err } = await fetchAllData(entId);
    if (err) {
      createNotification(err);
    }
    if (res) {
      setOriginalData(orginalRes);
      setTableData(res);
    }
    setLoading(false);
  };

  //useEffect on change selected row
  useEffect(() => {
    if (
      selectedRowsIds["interruptions"] &&
      selectedRowsIds["interruptions"].length > 0
    ) {
      let tempRow = tableData.filter((interruption) => {
        return interruption.id === selectedRowsIds["interruptions"][0];
      });
      setSelectedRows(tempRow);
      setSelectedNode("reas" + tempRow[0]?.ReasonCd);
    }
  }, [selectedRowsIds]);

  const handleFilter = () => {
    setOnlyPendings(!onlyPendings);
  };

  const handleCreateInterruption = () => {
    setformWidget({
      ...formWidget,
      createInterruptionForm: {},
    });
    setModalContent("createInterruption");
    setShowModal(true);
  };

  const handleJustifyInterruption = () => {
    setformWidget({
      ...formWidget,
      justifyInterruptionForm: {
        comment: selectedRows[0].Comment,
      },
    });
    setModalContent("justifyInterruption");
    setShowModal(true);
  };

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <>
      <Grid container spacing={1} sx={{ mt: 0, paddingRight: 3 }}>
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            startIcon={<FilterAltIcon />}
            onClick={handleFilter}
            // disabled={!onlyPendings ? true : false}
            style={{
              backgroundColor: "#c0c1c2",
              color: "#000000",
            }}
          >
            {onlyPendings ? <Text tid="pendings" /> : <Text tid="historical" />}
            <span>&nbsp;&nbsp;</span>(
            {onlyPendings
              ? pendingInterruptions.data.length
              : tableData && tableData.length}
            )
          </Button>
        </Grid>
        {/* Interruptions Table */}
        {tableData?.length > 0 ? (
          <Grid item xs={12}>
            <TableWidget
              data={tableData}
              columns={columns}
              multipleSelection={false}
              tableName="interruptions"
              pagination={10}
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
                text: "createInterruption",
                color: "primary",
                onClick: handleCreateInterruption,
                disabled: false,
              },
              {
                text: "justifyInterruption",
                color: "secondary",
                onClick: handleJustifyInterruption,
                disabled: selectedRows && selectedRows[0] ? false : true,
              },
            ]}
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Others */}
      <InterruptionsModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalContent={modalContent}
        setRefreshData={setRefreshData}
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        originalData={originalData}
      />
    </>
  );
};

export default Interruptions;
