import React, { useContext, useState, useEffect } from "react";
import uuid from "react-uuid";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../../context/ContextProvider";
import { ApiCall, MemoryDatabaseCall } from "../../../services/Service";
import {
  line_assignment,
  screen_operatorAssignment_assign,
} from "../../../services/serviceHelper";
import { Box, LinearProgress, Grid } from "@mui/material";
import InputWidget from "../../../widgets/forms/InputWidget";
import TableWidget from "./../../../widgets/TableWidget/TableWidget";
import ButtonGroupWidget from "./../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "./../../../languages/Text";
import { createNotification } from "./../../alerts/NotificationAlert";
import UserAlert from "./../../alerts/UserAlert";
import { LoadingButton } from "@mui/lab";

const OperatorAssignment = ({ line, modal, close }) => {
  const columns = [
    {
      field: "ent_name",
      headerName: `${Text({ tid: "section" })}`,
      flex: 1,
    },
    {
      field: "entDescription",
      headerName: `${Text({ tid: "description" })}`,
      flex: 1,
    },
  ];

  //useContext
  const { globalData } = useContext(globalDataContext);
  const { terminal, extras } = globalData;
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
      params: line_assignment({
        name: "terminal",
        dataType: "String",
        value: "1",
      }),
      url: "queryDataAsync",
    });
    if (response) {
      if (response.length > 0) {
        response = response.map((el) => {
          return { ...el, id: uuid() };
        });
        const newResponse = linkData(response);
        setTableData(newResponse);
      }
    }
    setLoading(false);
  };

  const linkData = (response) => {
    let newResponse;
    let localExtras;

    if (extras) {
      if (typeof extras === "string") {
        localExtras = extras.split("-");
      } else {
        localExtras = extras;
      }
      const findInExtras = localExtras.find((el) => el === "limpieza");
      if (findInExtras) {
        newResponse = [...response];
      } else {
        newResponse = response.filter((el) => el.ent_name !== "LIM01");
      }
    } else {
      newResponse = response.filter((el) => el.ent_name !== "LIM01");
    }
    return newResponse;
  };

  useEffect(() => {
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
      selectedRowsIds["assignOperators"] &&
      selectedRowsIds["assignOperators"].length > 0
    ) {
      let tempRow = tableData.filter((line) => {
        return line.id === selectedRowsIds["assignOperators"][0];
      });
      setSelectedRows(tempRow);
    }
  }, [selectedRowsIds]);

  const handleAssign = async () => {
    setLoading(true);

    const param = tableData.find(
      (e) => e.ent_name === selectedRows[0].ent_name
    );
    if (param) {
      const response = await ApiCall({
        params: screen_operatorAssignment_assign({
          userId: formWidget.operatorForm.operator,
          entId: param.entId,
        }),
      });

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
          msg: "operatorAssignSuccess",
          hide: 1,
        });
      }
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
                tableName="assignOperators"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <LoadingButton
                variant="contained"
                sx={{ maxWidth: 200 }}
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
                onClick={handleAssign}
              >
                {Text({ tid: "assign" })}
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
OperatorAssignment.defaultProps = {
  close: () => {},
};

export default OperatorAssignment;
