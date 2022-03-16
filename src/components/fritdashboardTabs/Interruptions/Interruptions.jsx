import React, { useContext, useState, useEffect } from "react";
import uuid from "react-uuid";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../../context/ContextProvider";
import { MemoryDatabaseCall } from "../../../services/Service";
import { all_interruptions } from "../../../services/Interruptions";
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
  const [tableData, setTableData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAlert, setUserAlert] = useState({
    show: true,
    message: "No hay paros actualmente", //TODO
    severity: "info",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const [onlyPendings, setOnlyPendings] = useState(true);

  useEffect(() => {
    return () => {
      setTableData([]);
    };
  }, []);

  useEffect(() => {
    if (pendingInterruptions && onlyPendings) {
      setApiData(pendingInterruptions);
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
    const { res, err } = await fetchAllData(entId);
    if (err) {
      createNotification(err);
    }
    if (res) {
      setTableData(res);
    }
    setLoading(false);
  };

  const fetchAllData = async (entId) => {
    let err = null;
    let res = [];

    const response = await MemoryDatabaseCall({
      params: all_interruptions(entId),
      url: "queryDataAsync",
    });

    if (response) {
      if (response.responseError) {
        err = {
          status: "error",
          code: response.responseError,
          msg: response.responseError,
          hide: 1,
        };
      } else {
        if (response.length > 0) {
          const newArr = response.map((item, i) => {
            return {
              index: i + 1,
              Duration: timeFormating(item.Duration),
              customStartDateTime: dateFormater({
                date: item.StartDateTime,
                type: "hora-fecha",
              }),
              EndDateTime: dateFormater({
                date: item.EndDateTime,
                type: "hora-fecha",
              }),
              Prompt: item.Prompt,
              ID: item.ID,
              ReasonDesc: item.ReasonDesc,
              Comment: item.Comment,
              UtilStateDesc: item.UtilStateDesc,
              ReasonGrpId: item.ReasonGrpId,
              ReasonCd: item.ReasonCd,
              RawReasCd: item.RawReasCd,
              EntId: item.EntId,
              StartDateTime: item.StartDateTime,
            };
          });

          res = newArr;
        }
      }
    }
    return { res, err };
  };

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
      justifyInterruptionForm: {},
    });
    setModalContent("justifyInterruption");
    setShowModal(true);
  };

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      <Grid container sx={{ mt: 2 }}>
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
            <span>&nbsp;&nbsp;</span>({tableData && tableData.length})
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
                color: "primary",
                onClick: handleJustifyInterruption,
                disabled: !selectedRows[0] ? true : false,
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
      />
    </>
  );
};

export default Interruptions;
