import { Grid, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect, useContext } from "react";
import uuid from "react-uuid";
import {
  loginContext,
  globalDataContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../context/ContextProvider";
import Text from "../../languages/Text";
import { tab_of_planification } from "../../services/OFservices";
import { MemoryDatabaseCall } from "../../services/Service";
import ButtonGroupWidget from "../../widgets/buttonGroup/ButtonGroupWidget";
import TableWidget from "../../widgets/TableWidget/TableWidget";
import { dateFormater } from "../common/helpers/helper";
import useWindowSize from "../customHooks/UseWindowsSize";
import { operation_states } from "../fritdashboardComps/orderDetail/helper";
import { handleOperationAction } from "./General/helper";

const Planification = () => {
  const windowSize = useWindowSize();
  const { loggedUser, setLoggedUser } = useContext(loginContext);
  const { globalData } = useContext(globalDataContext);
  const { lineData } = globalData;
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);

  const [apiData, setApiData] = useState(undefined);
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [refreshMain, setRefreshMain] = useState(false);
  const [createOrderPermission, setCreateOrderPermission] = useState(false);
  const [createOrderModal, setCreateOrderModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(undefined);
  const [loadingPlay, setLoadingPlay] = useState(undefined);

  const orderColumns = [
    {
      field: "EstadoDesc",
      headerName: `${Text({ tid: "state" })}`,
      flex: 1,
    },
    {
      field: "wo_id",
      headerName: `${Text({ tid: "order" })}`,
      flex: 1,
    },

    {
      field: "material",
      headerName: "Material",
      flex: 1,
    },

    {
      field: "customSchedStart",
      headerName: `${Text({ tid: "initSchedDate" })}`,
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
    if (loggedUser.isLogged) {
      if (
        loggedUser.permissions.find(
          (item) => item.desc === "CrearOrden.Edicion" // HARDCODED Edicion o Escritura, o lo que sea.
        )
      ) {
        setCreateOrderPermission(true);
      }
    }
    return () => {
      setSelectedRowsIds({ ...selectedRowsIds, planification: [] });
      setSelectedRows([]);
    };
    //eslint-disable-next-line
  }, [loggedUser]);

  useEffect(() => {
    fetchData(true);
    if (refreshMain) {
      setRefreshMain(false);
    }
    return () => {
      setApiData(undefined);
    };
    //eslint-disable-next-line
  }, [refreshMain]);
  //useEffect on change selected row
  useEffect(() => {
    if (
      selectedRowsIds["planification"] &&
      selectedRowsIds["planification"].length > 0
    ) {
      let tempRow = apiData.filter((order) => {
        return order.id === selectedRowsIds["planification"][0];
      });
      setSelectedRows(tempRow);
    }
  }, [selectedRowsIds]);
  const fetchData = async (showLoader) => {
    showLoader && setLoadingInitialData(true);

    const response = await MemoryDatabaseCall({
      params: tab_of_planification({ entId: lineData.entId }),
      url: "queryDataAsync",
    });
    if (response) {
      if (response.length > 0) {
        const indexedResponse = response.map((item) => ({
          ...item,
          id: uuid(),
          material: item.item_id + " (" + item.item_desc + ")",
          customSchedStart: dateFormater({
            date: item.sched_start_time_local,
            type: "hora-fecha",
          }),
        }));

        setApiData(indexedResponse);
      }
    }
    showLoader && setLoadingInitialData(false);
  };
  const isPlayDisabled = (stateCd) => {
    const test = operation_states({ stateCd, type: "prod" }).play;
    return test;
  };
  const handleStartOrder = async () => {
    setLoadingPlay(true);
    console.log("selectedRows", selectedRows);
    if (selectedRows && selectedRows.length > 0) {
      await handleOperationAction({
        type: "start",
        woId: selectedRows[0].wo_id,
        operId: selectedRows[0].oper_id,
        seqNo: selectedRows[0].seq_no,
      });
    }
    setLoadingPlay(false);
    resetComp();
  };
  const resetComp = () => {
    setRefreshMain(true);
    setSelectedRows([]);
    setSelectedRowsIds({ ...selectedRowsIds, planification: [] });
  };

  const handleCreateOrderClick = () => {
    setCreateOrderModal(true);
  };

  return loadingInitialData ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" />
    </Box>
  ) : (
    <>
      <Grid container>
        <Grid item xs={12}>
          {apiData && apiData.length > 0 && (
            <>
              <TableWidget
                data={apiData}
                columns={orderColumns}
                tableName="planification"
              />
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <ButtonGroupWidget
            position="center"
            loading={loadingPlay}
            buttons={[
              {
                text: "startOrder",
                color: "primary",
                onClick: handleStartOrder,

                disabled: !selectedRows
                  ? true
                  : isPlayDisabled(selectedRows[0]?.state_cd),
              },
              {
                text: "createOrder",
                color: "primary",
                onClick: handleCreateOrderClick,
                disable: !createOrderPermission,
              },
            ]}
          />
        </Grid>
      </Grid>

      {/* <Grid.Row textAlign="center">
          <Grid.Column width={16}>
            <Button
              onClick={() => setCreateOrderModal(true)}
              disable={!createOrderPermission}
            >
              Crear Orden
            </Button>
          </Grid.Column>
        </Grid.Row> */}

      {/* <ModalCreateOrder
        open={createOrderModal}
        close={setCreateOrderModal}
        line={line.entId}
        setRefreshMain={setRefreshMain}
      /> */}
    </>
  );
};

/* const ModalCreateOrder = ({ open, close, line, setRefreshMain }) => {
  const [material, setMaterial] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [cleaningOperId, setCleaningOperId] = useState("");

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async () => {
    setLoadingSubmit(true);

    setLoadingSubmit(false);
    handleClose();
    setRefreshMain(true);
  };

  const handleClose = () => {
    setMaterial("");
    setCantidad("");
    setCleaningOperId("");
    close(false);
  };
  return (
    <>
      <Modal onClose={() => handleClose()} open={open} centered closeIcon>
        <Modal.Header>Crear Orden</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group>
                <Form.Input
                  label="Material"
                  width={16}
                  value={material}
                  type={"text"}
                  onChange={(e, d) => setMaterial(d.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Cantidad"
                  width={8}
                  type={"number"}
                  min="0"
                  value={cantidad}
                  onChange={(e, d) => setCantidad(d.value)}
                />
                <Form.Input
                  label="Operación de Limpieza"
                  width={8}
                  type={"text"}
                  value={cleaningOperId}
                  onChange={(e, d) => setCleaningOperId(d.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={handleSubmit}
            disabled={
              !material || !cantidad || !cleaningOperId || loadingSubmit
            }
            loading={loadingSubmit}
          >
            Crear
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}; */

export default Planification;
