import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../../context/ContextProvider";
import ButtonGroupWidget from "../../../widgets/buttonGroup/ButtonGroupWidget";
import { createNotification } from "../../alerts/NotificationAlert";
import { formatForDropdown } from "../../common/helpers/helper";
import {
  filterArray,
  formatForSave,
  getData,
  getGroups,
  getSections,
  saveOrders,
} from "./helper";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import TimelineView from "./TimelineView";
import SeqTable from "./SeqTable";
import SplitModal from "./SplitModal";
import useWindowSize from "../../customHooks/UseWindowsSize";
import ConfirmationDialog from "../../alerts/ConfirmationDialog";
import { ApiCall } from "../../../services/Service";
import { screen_sequencing_onLiberate } from "../../../services/serviceHelper";
import Text from "../../../languages/Text";

const SequencingGateway = () => {
  const navigateTo = useNavigate();
  const { width } = useWindowSize();
  const { loggedUser, setLoggedUser } = useContext(loginContext);
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [userWritePermissions, setUserWritePermissions] = useState(undefined);
  const [refreshMain, setRefreshMain] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(undefined);
  const [apiData, setApiData] = useState(undefined);
  const [originalData, setOriginalData] = useState(undefined);
  const [operationDropdown, setOperationDropdown] = useState(undefined);
  const [operations, setOperations] = useState(undefined);
  const [linesDropdown, setLinesDropdown] = useState(undefined);
  const [isModified, setIsModified] = useState(false);
  const [selectedLine, setSelectedLine] = useState(undefined);
  const [operationObj, setOperationObj] = useState(undefined);
  const [lines, setLines] = useState(undefined);
  const [teams, setTeams] = useState(undefined);
  const [notificationModal, setNotificationModal] = useState({});
  const [loadingTimeline, setLoadingTimeline] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingLiberate, setLoadingLiberate] = useState(false);
  const [timelineHours, setTimelineHours] = useState(24);
  const [selected, setSelected] = useState(undefined);
  const [openSplitModal, setOpenSplitModal] = useState(undefined);
  const [splitOf, setSplitOf] = useState(undefined);
  const [confirmLiberate, setConfirmLiberate] = useState(false);
  const [confirmRefresh, setConfirmRefresh] = useState(false);

  if (loggedUser.isLogged) {
    if (
      !loggedUser.permissions.find((el) => el.desc.includes("Secuenciacion"))
    ) {
      navigateTo("/");
    }
  } else {
    navigateTo("/");
  }

  useEffect(() => {
    if (loggedUser) {
      fetchSections();

      if (
        loggedUser.permissions.find(
          (item) => item.desc === "Secuenciacion.Edicion"
        )
      ) {
        setUserWritePermissions(true);
      }
    }
    //eslint-disable-next-line
  }, [loggedUser]);

  useEffect(() => {
    if (selectedOperation) {
      fetchData(selectedOperation);
    }
    if (refreshMain) {
      setRefreshMain(false);
    }

    //eslint-disable-next-line
  }, [selectedOperation, refreshMain]);
  useEffect(() => {
    if (apiData && originalData) {
      const originalFiltered = originalData.filter(
        (el) => el.OperId !== "NETEJA"
      );
      const apiDataFiltered = apiData[0].ordenes.filter(
        (el) => el.OperId !== "NETEJA"
      );
      const mod = _.isEqual(apiDataFiltered, originalFiltered);
      setIsModified(!mod);
    }
    //eslint-disable-next-line
  }, [apiData]);
  useEffect(() => {
    if (apiData && apiData.length > 0) {
      let currentLines = apiData[0].lineas;
      let currentOperation = apiData[0];
      setLines(currentLines);
      const tempLinesForDropDown = formatForDropdown(
        apiData[0].lineas.map((line) => ({
          name: line.description,
          id: line.entId,
        }))
      );

      setLinesDropdown(tempLinesForDropDown);

      setOperationObj(currentOperation);
      const orders = apiData[0].ordenes;
      const productionOrders = orders.filter(
        (el) => el.OperId !== "NETEJA" && el.OperId !== "LIMPIEZA"
      );

      if (orders.length === 0) {
        setNotificationModal({
          status: "info",
          msg: Text({ tid: "noOrdersInSection" }),
          hide: 0,
          size: "huge",
        });
      } else {
        if (productionOrders.length === 0) {
          setNotificationModal({
            status: "info",
            msg: Text({ tid: "noOrdersInSection" }),
            hide: 0,
            size: "huge",
          });
        } else {
          setNotificationModal({});
        }
      }
    }
  }, [apiData]);

  useEffect(() => {
    if (selectedLine) {
      let currentLine = apiData[0].lineas.find(
        (line) => line.entId === selectedLine.id
      );

      if (currentLine) {
        const test = getGroups([currentLine], apiData);
        setTeams(test);
      }
    } else {
      if (operationObj) {
        //setSelectedOperation({ id: operationDropdown });
        const tempTeams = getGroups(lines, [operationObj]);
        setTeams(tempTeams);
      }
    }
    //eslint-disable-next-line
  }, [selectedLine, operationObj]);

  useEffect(() => {
    if (lines) {
      const tempTeams = getGroups(lines, [operationObj]);
      setTeams(tempTeams);
    }
    //eslint-disable-next-line
  }, [lines]);
  const fetchData = async (sectionId) => {
    setLoadingInitialData(true);
    const res = await getData({
      userId: loggedUser.userId,
      operId: sectionId.id,
    });
    if (res) {
      const original = JSON.parse(JSON.stringify(res));
      console.log("res", res);
      setApiData(res);
      setOriginalData(original[0].ordenes);
    }
    setLoadingInitialData(false);
  };

  const fetchSections = async () => {
    setLoadingInitialData(true);
    const res = await getSections();
    if (res) {
      setOperations(res);
    }
    setLoadingInitialData(false);
  };

  const handleSave = async () => {
    setTimelineHours(24);
    setLoadingSave(true);
    console.log("111", apiData[0].ordenes);
    console.log("1112", apiData[0].ordenes);
    const arr_seq_table = filterArray(apiData[0].ordenes, originalData);
    console.log("1113", arr_seq_table);
    const allOperations_filtered = formatForSave(arr_seq_table);
    console.log("1114", allOperations_filtered);
    if (allOperations_filtered.length > 0) {
      const res = await saveOrders(allOperations_filtered);
      if (res) {
        fetchData(selectedOperation);
      }
    } else {
      createNotification({
        status: "info",
        msg: Text({ tid: "noOrdersToSave" }),
        hide: 1,
      });
    }

    setSelectedLine(null);
    setLoadingSave(false);
    //setLoadingTable(true);
    //setRefreshMain(true);
  };

  const handleLiberate = async (e) => {
    e.preventDefault();
    setConfirmLiberate(false);
    setLoadingLiberate(true);

    let orders = apiData[0].ordenes;

    // FILTRO1 -> que no sean limpieza
    const notCleaningOrders = orders.filter(
      (el) => el.OperId !== "NETEJA" && el.OperId !== "limpieza"
    );

    const notLiberatedOrders = notCleaningOrders.filter(
      (el) => el.StateCd === 1
    );
    const liberateOrders = notLiberatedOrders.map((item) => ({
      WoId: item.WoId,
      OperId: item.OperId,
      SeqNo: item.SeqNo,
    }));

    if (liberateOrders.length > 0) {
      let orderWord = "ordenes";
      if (liberateOrders.length === 1) {
        orderWord = "orden";
      }
      createNotification({
        status: "info",
        msg: `${Text({ tid: "releasing" })} ${
          liberateOrders.length
        } ${orderWord}...`,
        hide: 1,
      });
      const response = await ApiCall({
        params: screen_sequencing_onLiberate({
          liberateOrders_arr: liberateOrders,
        }),
      });
      if (response.responseError) {
        createNotification({
          status: "error",
          code: response.responseError,
          msg: response.responseMsg,
          hide: response.responseHide,
        });
      } else {
        setRefreshMain(true);
        createNotification({
          status: "success",
          msg: `${Text({ tid: "ordersReleasedSucessfully" })} ${
            apiData[0].entName
          }!`,
          hide: response.responseHide,
        });
      }
    } else {
      createNotification({
        status: "warning",
        msg: Text({ tid: "noOrdersToRelease" }),
        hide: 1,
      });
    }
    setLoadingLiberate(false);
    fetchData(selectedOperation);
  };

  const handleOperationSelect = (value) => {
    setApiData(null);
    setOperationDropdown(value);
    setSelectedOperation({ id: value });
  };

  const handleLineSelection = (value) => {
    if (!value) {
      setSelectedLine(null);
    } else {
      setSelectedLine({ id: value });
    }
  };

  const splitOF = (of) => {
    setSplitOf(of);
    setOpenSplitModal(true);
  };

  const handleRefresh = ({ save }) => {
    setConfirmRefresh(false);
    if (save) {
      handleSave();
    } else {
      fetchData(selectedOperation);
    }
  };

  const handleTimelineDisplayHours = (hours) => {
    setTimelineHours(hours);
    setLoadingTimeline(true);
  };
  useEffect(() => {
    if (loadingTimeline) {
      let timer1 = setTimeout(() => setLoadingTimeline(false), 50);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [loadingTimeline]);
  console.log("linesDropdown", linesDropdown);
  return (
    <>
      {/* <Container maxWidth="xl"> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              {operations && (
                <FormControl fullWidth>
                  <InputLabel>{Text({ tid: "operation" })}</InputLabel>
                  <Select
                    label={Text({ tid: "operation" })}
                    onChange={(e) => handleOperationSelect(e.target.value)}
                    value={operationDropdown}
                  >
                    {operations.map((op) => (
                      <MenuItem value={op.value}>{op.text}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              {linesDropdown && (
                <FormControl fullWidth>
                  <InputLabel>{Text({ tid: "lines" })}</InputLabel>
                  <Select
                    label={Text({ tid: "lines" })}
                    onChange={(e) => handleLineSelection(e.target.value)}
                    value={selectedLine && selectedLine.id}
                    disabled={!operationDropdown}
                  >
                    {linesDropdown.map((line) => (
                      <MenuItem value={line.value}>{line.text}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
          </Grid>
        </Grid>

        {loadingInitialData && (
          <Grid item xs={12}>
            <LinearProgress variant="indeterminate" color="secondary" />
          </Grid>
        )}
        {notificationModal && notificationModal.status && (
          <Grid item xs={12}>
            <Alert variant="outlined" severity="info">
              {notificationModal.msg}
            </Alert>
          </Grid>
        )}
        {apiData &&
          apiData.length > 0 &&
          apiData[0].ordenes &&
          apiData[0].ordenes.length > 0 &&
          teams && (
            <>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={3} textAlign="left">
                    <ButtonGroup fullWidth>
                      <Button
                        variant={timelineHours === 8 ? "contained" : "outlined"}
                        onClick={() => handleTimelineDisplayHours(8)}
                      >
                        8hrs
                      </Button>
                      <Button
                        variant={
                          timelineHours === 12 ? "contained" : "outlined"
                        }
                        onClick={() => handleTimelineDisplayHours(12)}
                      >
                        12hrs
                      </Button>
                      <Button
                        variant={
                          timelineHours === 24 ? "contained" : "outlined"
                        }
                        onClick={() => handleTimelineDisplayHours(24)}
                      >
                        24hrs
                      </Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={9} textAlign="right">
                    <ButtonGroup
                      fullWidth
                      orientation={width < 680 ? "vertical" : "horizontal"}
                      sx={{ maxWidth: 1000 }}
                    >
                      <LoadingButton variant="contained" disabled>
                        <InsertDriveFileIcon />
                        {Text({ tid: "generateNeeds" })}
                      </LoadingButton>
                      <LoadingButton
                        variant="contained"
                        onClick={() => setConfirmRefresh(true)}
                      >
                        <RefreshIcon />
                        {Text({ tid: "refresh" })}
                      </LoadingButton>
                      <LoadingButton
                        variant="contained"
                        onClick={handleSave}
                        disabled={!userWritePermissions || !isModified}
                        loading={loadingSave}
                      >
                        <SaveIcon />
                        {Text({ tid: "save" })}
                      </LoadingButton>
                      <LoadingButton
                        variant="contained"
                        onClick={() => setConfirmLiberate(true)}
                        loading={loadingLiberate}
                        disabled={!userWritePermissions}
                      >
                        <ContentPasteGoIcon />
                        {Text({ tid: "release" })}
                      </LoadingButton>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Grid>

              {!loadingTimeline && (
                <Grid item xs={12}>
                  <TimelineView
                    apiData={apiData[0]}
                    teams={teams}
                    timelineHours={timelineHours}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Grid>
              )}
              {selectedOperation && (
                <Grid item xs={12}>
                  <Paper elevation={16} sx={{ overflowX: "auto" }}>
                    <SeqTable
                      apiData={apiData[0]}
                      setApiData={setApiData}
                      selectedOperation={selectedOperation}
                      splitOF={splitOF}
                      selected={selected}
                      setSelected={setSelected}
                      lines={lines}
                      selectedLine={selectedLine}
                    />
                  </Paper>
                </Grid>
              )}
            </>
          )}
      </Grid>
      {/*  </Container> */}

      <ConfirmationDialog
        title="Liberar Órdenes"
        msg="Se liberaran las ordenes asignadas a línea, que actualmente estan en estado 'New'"
        open={confirmLiberate}
        close={() => setConfirmLiberate(false)}
        handleConfirm={handleLiberate}
      />
      <ConfirmationDialog
        title="Liberar Órdenes"
        open={confirmRefresh}
        close={() => setConfirmRefresh(false)}
        msg="¿Quieres guardar los cambios?"
        handleCancel={() => handleRefresh({ save: false })}
        handleConfirm={() => handleRefresh({ save: true })}
      />

      <SplitModal
        open={openSplitModal}
        close={setOpenSplitModal}
        ofSelected={splitOf && splitOf}
        setRefreshMain={setRefreshMain}
      />
    </>
  );
};

export default SequencingGateway;
