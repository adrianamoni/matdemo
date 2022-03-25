import React, { useContext, useState, useEffect } from "react";
import uuid from "react-uuid";
import {
  loginContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../../context/ContextProvider";
import { ApiCall, MemoryDatabaseCall } from "../../../services/Service";
import {
  deassignment,
  screen_operatorAssignment_deassign,
} from "../../../services/serviceHelper";
import { Box, LinearProgress, Grid } from "@mui/material";
import InputWidget from "../../../widgets/forms/InputWidget";
import TableWidget from "./../../../widgets/TableWidget/TableWidget";
import ButtonGroupWidget from "./../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "./../../../languages/Text";
import { createNotification } from "./../../alerts/NotificationAlert";
import UserAlert from "./../../alerts/UserAlert";
import { LoadingButton } from "@mui/lab";

const OperatorDeAssignment = ({ line, modal, close }) => {
  const columns = [
    {
      field: "lab_cd",
      headerName:
        line && line.type
          ? `${Text({ tid: "line" })}`
          : `${Text({ tid: "section" })}`,
      flex: 1,
    },
  ];
  //useContext
  const { loggedUser, setLoggedUser } = useContext(loginContext);
  const { formWidget, setformWidget } = useContext(formContext);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);
  //useState
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [userAlert, setUserAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });

  //fetch data
  const fetchData = async () => {
    setLoading(true);
    let response = await MemoryDatabaseCall({
      params: deassignment(),
      url: "queryDataAsync",
    });
    if (response) {
      response = response.map((el) => {
        return {
          id: uuid(),
          unusedColor: el.color,
          fixedtime: el.fixedtime,
          lab_cd: el.lab_cd,
          lab_desc: el.lab_desc,
          last_edit_at: el.last_edit_at,
          last_edit_by: el.last_edit_by,
          last_edit_comment: el.last_edit_comment,
          std_crew: el.std_crew,
          vartime: el.vartime,
        };
      });
      setTableData(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    !loggedUser &&
      sessionStorage.getItem("userInfo") &&
      setLoggedUser(JSON.parse(sessionStorage.getItem("userInfo")));

    fetchData();
  }, []);

  useEffect(() => {
    tableData && tableData.length < 1
      ? setUserAlert({
          show: true,
          message: "No hay datos actualmente", //TODO
          severity: "info",
        })
      : setUserAlert({
          show: false,
          message: "",
          severity: "",
        });
  }, [tableData]);

  useEffect(() => {
    if (refreshData) {
      fetchData();
      setRefreshData(false);
    }
  }, [refreshData]);

  //useEffect on change selected row
  useEffect(() => {
    if (
      selectedRowsIds["deassignOperators"] &&
      selectedRowsIds["deassignOperators"].length > 0
    ) {
      let tempRow = tableData.filter((line) => {
        return line.id === selectedRowsIds["deassignOperators"][0];
      });
      setSelectedRows(tempRow);
    }
  }, [selectedRowsIds]);

  const handleDeAssign = async () => {
    setLoading(true);
    const params = screen_operatorAssignment_deassign({
      operario: formWidget.operatorForm.operator,
      labCd: selectedRows[0].lab_cd,
    });

    const response = await ApiCall({ params });

    if (response.responseError) {
      setLoading(false);
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
    } else {
      setLoading(false);
      createNotification({
        status: "success",
        msg: "operatorDeassignSuccess",
        hide: response.responseHide,
      });
    }
    setformWidget({ ...formWidget, operatorForm: [] });
    setRefreshData(true);
    close(false);
  };

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <>
      {/* Consumpions Table */}
      {tableData?.length > 0 ? (
        <>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item md={4} xs={12}>
              <InputWidget
                formId={"operatorForm"}
                id={"operator"}
                label={<Text tid={"operator"} />}
                required={true}
                multiline={false}
                type="text"
                maxLength={100}
                disabled={false}
                placeholder={""}
                min={null}
                max={null}
              />
            </Grid>

            <Grid item xs={12}>
              <TableWidget
                data={tableData}
                columns={columns}
                multipleSelection={false}
                tableName="deassignOperators"
              />
            </Grid>

            <Grid item xs={12}>
              <LoadingButton
                variant="contained"
                sx={{ maxWidth: 250 }}
                loading={loading}
                fullWidth
                disabled={
                  formWidget &&
                  formWidget.operatorForm &&
                  formWidget.operatorForm.operator &&
                  formWidget.operatorForm.operator.length > 0 &&
                  selectedRows &&
                  selectedRows &&
                  selectedRows.length > 0
                    ? false
                    : true
                }
                color="primary"
                onClick={handleDeAssign}
              >
                {Text({ tid: "deassign" })}
              </LoadingButton>
            </Grid>
          </Grid>
        </>
      ) : (
        userAlert.show && (
          <UserAlert
            severity={userAlert.severity}
            message={userAlert.message}
          />
        )
      )}
    </>
  );
};
OperatorDeAssignment.defaultProps = {
  close: () => {},
};

export default OperatorDeAssignment;
