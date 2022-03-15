import React, { useContext, useState, useEffect } from "react";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../../context/ContextProvider";
import UseFetchMemory from "./../../customHooks/UseFetchMemory";
import { ApiCall } from "../../../services/Service";
import { screen_operatorAssignment_assign } from "../../../services/serviceHelper";
import { Box, LinearProgress, Grid } from "@mui/material";
import InputWidget from "../../../widgets/forms/InputWidget";
import TableWidget from "./../../../widgets/TableWidget/TableWidget";
import ButtonGroupWidget from "./../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "./../../../languages/Text";
import { createNotification } from "./../../alerts/NotificationAlert";

const OperatorAssignment = ({ line, modal, close }) => {
  const columns = [
    {
      field: "ent_name",
      headerName: `${Text({ tid: "section" })}`,
      width: 250,
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
  const [renderData, setRenderData] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const localTerminal = terminal
    ? terminal
    : localStorage.getItem("FritTerminal");

  //fetch data
  let { loading, data } = UseFetchMemory({
    request: "operatorsAssignment",
    customParams: {
      name: "terminal",
      dataType: "String",
      value: localTerminal === "asignacion" ? null : localTerminal,
    },
  });

  useEffect(() => {
    //TODO
  }, [refreshData]);

  useEffect(() => {
    if (data?.length > 0) {
      linkData(data);
    }
  }, [data]);

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
    setRenderData(newResponse);
    return newResponse;
  };

  //useEffect on change selected row
  useEffect(() => {
    if (
      selectedRowsIds["assignOperators"] &&
      selectedRowsIds["assignOperators"].length > 0
    ) {
      let tempRow = data.filter((operator) => {
        return operator.id === selectedRowsIds["assignOperators"][0];
      });
      setSelectedRows(tempRow);
    }
  }, [selectedRowsIds]);

  const handleAssign = async () => {
    setLocalLoading(true);

    const param_entId = data.find(
      (e) => e.ent_name === selectedRows[0].ent_name
    ).entId;

    const response = await ApiCall({
      params: screen_operatorAssignment_assign({
        userId: formWidget.operatorForm.operator,
        entId: param_entId,
      }),
    });

    if (response.responseError) {
      setLocalLoading(false);
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
    } else {
      setLocalLoading(false);
      createNotification({
        status: "success",
        msg: "¡Operario asignado a línea correctamente!",
        hide: response.responseHide,
      });
    }
    setformWidget({ ...formWidget, operatorForm: [] });
    setRefreshData(true);
    close(false);
  };

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      {/* Consumpions Table */}
      <Grid container sx={{ mt: 2 }}>
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
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <TableWidget
            data={renderData}
            columns={columns}
            multipleSelection={false}
            tableName="assignOperators"
          />
        </Grid>

        <Grid item xs={12}>
          <ButtonGroupWidget
            position="left"
            buttons={[
              {
                text: "save",
                color: "primary",
                onClick: handleAssign,
                disabled:
                  formWidget &&
                  formWidget.operatorForm &&
                  formWidget.operatorForm.operator &&
                  formWidget.operatorForm.operator.length > 0 &&
                  selectedRows &&
                  selectedRows &&
                  selectedRows.length > 0
                    ? false
                    : true,
              },
            ]}
            loading={localLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default OperatorAssignment;
