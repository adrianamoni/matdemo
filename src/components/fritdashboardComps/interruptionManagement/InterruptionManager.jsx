import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import _ from "lodash";
import {
  formContext,
  loginContext,
  selectedRowsContext,
  selectedRowsIdsContext,
} from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import DatePickerWidget from "../../../widgets/forms/DatePickerWidget";
import Text from "../../../languages/Text";
import TableWidget from "../../../widgets/TableWidget/TableWidget";
import ButtonGroupWidget from "../../../widgets/buttonGroup/ButtonGroupWidget";
import InterruptionsModal from "../../fritdashboardTabs/Interruptions/InterruptionsModal";
import { MemoryDatabaseCall } from "../../../services/Service";
import { all_entities } from "../../../services/serviceHelper";
import { customDropdown, fetchAllManagerData } from "./helper";
import { screen_interruptions_reasons } from "../../../services/Interruptions";
/* import { fetchAllManagerData } from "./helper";
import { createNotification } from "../../alerts/NotificationAlert";
import { MemoryDatabaseCall } from "../../../services/Service";
import { all_entities } from "../../../services/serviceHelper";
import { customDropdown } from "../../common/helpers/helper"; */
const InterruptionManager = () => {
  const navigateTo = useNavigate();
  //CONTEXT
  const { loggedUser } = useContext(loginContext);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);
  const { formWidget, setformWidget } = useContext(formContext);
  /**
   * useState declarations
   */
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [apiData, setApiData] = useState(undefined);
  const [originalData, setOriginalData] = useState(undefined);
  const [reasons, setReasons] = useState(undefined);
  const [lineOptions, setLineOptions] = useState(undefined);
  /*   const [interruptionSelected, setInterruptionSelected] = useState(undefined);
  const [modalJustify, setModalJustify] = useState(false);
  const [modalGenerate, setModalGenerate] = useState(false); */
  const [showModal, setShowModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState();

  const [generalReasons, setGeneralReasons] = useState(undefined);
  const [specificDropdown, setSpecificDropdown] = useState(undefined);
  const [selectedReason, setSelectedReason] = useState(undefined);
  const [specificReason, setSpecificReason] = useState(undefined);
  const [pendingsFilter, setPendingsFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState(moment().format("YYYY-MM-DD"));
  const [lineFilter, setLineFilter] = useState(null);
  const [notificationModal, setNotificationModal] = useState(undefined);
  const [refreshMain, setRefreshMain] = useState(false);
  const [userWritePermissions, setUserWritePermissions] = useState(undefined);
  const [modalContent, setModalContent] = useState("");

  if (loggedUser.isLogged) {
    if (
      !loggedUser.permissions.find((el) => el.desc.includes("GestionParos"))
    ) {
      navigateTo("/");
    }
  } else {
    navigateTo("/");
  }

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
      field: "Producto",
      headerName: `${Text({ tid: "product" })}`,
      flex: 1,
    },
    {
      field: "EntityName",
      headerName: `${Text({ tid: "line" })}`,
      flex: 1,
    },
    {
      field: "WOID",
      headerName: `${Text({ tid: "order" })}`,
      flex: 1,
    },
    {
      field: "Comment",
      headerName: `${Text({ tid: "comment" })}`,
      flex: 1,
    },
  ];

  useEffect(() => {
    if (loggedUser) {
      if (
        loggedUser.permissions.find(
          (item) => item.desc === "GestionParos.Edicion" // HARDCODED Edicion o Escritura, o lo que sea.
        )
      ) {
        setUserWritePermissions(true);
      } else {
        setUserWritePermissions(false);
      }
    } else {
      setUserWritePermissions(false);
    }
  }, [loggedUser]);

  useEffect(() => {
    let clearTimeoutKey;

    fetchLinesAndReasons();

    if (refreshMain) {
      setRefreshMain(false);
    }

    return () => {
      setApiData(undefined);
      clearTimeout(clearTimeoutKey);
      /* setTableVariables({ ...tableVariables, InterruptionsTable: false }); */
    };
    //eslint-disable-next-line
  }, [refreshMain]);

  useEffect(() => {
    if (
      selectedRowsIds["InterruptionsManagerTable"] &&
      selectedRowsIds["InterruptionsManagerTable"].length > 0
    ) {
      let tempRow = apiData.filter((interruption) => {
        return (
          interruption.id === selectedRowsIds["InterruptionsManagerTable"][0]
        );
      });
      setSelectedRows(tempRow);
      setSelectedNode("reas" + tempRow[0]?.ReasonCd);
    }
  }, [selectedRowsIds]);
  /* 
  useEffect(() => {
    tableVariables &&
      tableVariables.InterruptionsTable &&
      tableVariables.InterruptionsTable !== undefined &&
      setInterruptionSelected(tableVariables.InterruptionsTable);
  }, [tableVariables]);
*/
  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [
    generalReasons,
    specificDropdown,
    pendingsFilter,
    formWidget.interruptionManager,
    selectedReason,
    specificReason,
    lineFilter,
  ]);
  useEffect(() => {
    if (reasons) {
      let reasonsDropDown = _.uniqBy(reasons, "reas_grp_id");
      reasonsDropDown = customDropdown({
        data: reasonsDropDown,
        text: "reas_grp_desc",
        value: "reas_grp_id",
      });
      setGeneralReasons(reasonsDropDown);
    }
  }, [reasons]);

  useEffect(() => {
    if (selectedReason) {
      let specificReasonsDropDown = reasons.filter(
        (d) => d.reas_grp_id === selectedReason
      );
      let dataForDropdown = customDropdown({
        data: specificReasonsDropDown,
        text: "reas_desc",
        value: "reas_cd",
      });
      setSpecificDropdown(dataForDropdown);
    }
    //eslint-disable-next-line
  }, [selectedReason]);

  const fetchData = async () => {
    setLoadingData(true);

    //DATASET

    let section, reason, formattedDate;
    if (generalReasons) {
      section =
        generalReasons.find((el) => el.value === selectedReason)?.text || null;
    }
    if (specificDropdown) {
      reason =
        specificDropdown.find((el) => el.value === specificReason)?.text ||
        null;
    }

    formattedDate = moment(
      formWidget.interruptionManager.dateFilter,
      "DD-MM-YYYY"
    ).format();

    const { originalRes, res, err } = await fetchAllManagerData({
      entId: lineFilter,
      section: section,
      reason,
      date: formattedDate,
    });
    if (err) {
      /* createNotification(err); */
    }
    if (res) {
      let newArr = [...res];
      if (pendingsFilter) {
        newArr = newArr.filter((el) => el.Prompt === pendingsFilter);
      } //NOT NECESSARY IF THE DATASET FILTER WORKS FINE

      setApiData(newArr);
      setOriginalData(originalRes);
    }

    setLoadingData(false);
  };

  const fetchLinesAndReasons = async () => {
    setLoadingInitialData(true);
    const response = await MemoryDatabaseCall({
      params: screen_interruptions_reasons(),
      url: "queryDataAsync",
    });
    if (response) {
      setReasons(response);
    }
    const response2 = await MemoryDatabaseCall({
      params: all_entities(),
      url: "queryDataAsync",
    });
    if (response2) {
      if (response2.length > 0) {
        setLineOptions(
          customDropdown({ data: response2, text: "ent_name", value: "ent_id" })
        );
      }
    }
    setLoadingInitialData(false);
  };
  const handleDateChange = (e) => {
    e.preventDefault();
    setDateFilter(e.target.value);
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

  return loadingInitialData ? (
    <Grid item xs={12}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Grid>
  ) : (
    <>
      <Grid container spacing={2} alignItems="center">
        {notificationModal && notificationModal.status && (
          <Grid item xs={12}>
            <Alert variant="outlined" severity={notificationModal.status}>
              {notificationModal.msg}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
          <Typography variant="h5">
            {Text({ tid: "interruptionManager" })}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={10}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={12} md={12} lg={2}>
              <FormControl fullWidth>
                <Button
                  variant="outlined"
                  onClick={() => setPendingsFilter(!pendingsFilter)}
                >
                  {pendingsFilter
                    ? Text({ tid: "pendings" })
                    : Text({ tid: "historical" })}
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <FormControl fullWidth>
                <InputLabel>{Text({ tid: "section" })}</InputLabel>
                <Select
                  label={Text({ tid: "section" })}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  value={selectedReason}
                >
                  {generalReasons &&
                    generalReasons.map((item) => (
                      <MenuItem value={item.value}>{item.text}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <FormControl fullWidth>
                <InputLabel> {Text({ tid: "reason" })}</InputLabel>
                <Select
                  disabled={!selectedReason}
                  value={specificReason}
                  onChange={(e) => setSpecificReason(e.target.value)}
                  label={Text({ tid: "reason" })}
                >
                  {specificDropdown &&
                    specificDropdown.map((item) => (
                      <MenuItem value={item.value}>{item.text}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}>
              <FormControl fullWidth>
                <InputLabel>{Text({ tid: "line" })}</InputLabel>
                <Select
                  label={Text({ tid: "line" })}
                  value={lineFilter}
                  onChange={(e) => setLineFilter(e.target.value)}
                >
                  {lineOptions &&
                    lineOptions.map((item) => (
                      <MenuItem value={item.value}>{item.text}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={2}>
              <FormControl fullWidth>
                <DatePickerWidget
                  formId="interruptionManager"
                  id="dateFilter"
                  defaultDate={dateFilter}
                />
                {/* <Form.Input
                  onChange={handleDateChange}
                /> */}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {loadingData ? (
          <Grid item xs={12}>
            <LinearProgress variant="indeterminate" color="secondary" />
          </Grid>
        ) : apiData && apiData.length > 0 ? (
          <Grid item xs={12}>
            <TableWidget
              columns={columns}
              tableName="InterruptionsManagerTable"
              data={apiData}
              pagination={12}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Alert variant="outlined" severity="info">
              {Text({ tid: "noInterruptionsMatchingFilter" })}
            </Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <ButtonGroupWidget
            position="center"
            buttons={[
              {
                text: "createInterruption",
                color: "primary",
                onClick: handleCreateInterruption,
                disabled: !userWritePermissions,
              },
              {
                text: "justifyInterruption",
                color: "secondary",
                onClick: handleJustifyInterruption,
                disabled: !selectedRows[0] ? true : !userWritePermissions,
              },
            ]}
          />
        </Grid>
        {/*  
          <Grid.Row
            textAlign="center"
            style={{ maxWidth: 600, margin: "auto" }}
          >
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Button
                onClick={() => setModalGenerate(true)}
                disabled={!userWritePermissions}
                primary
              >
                Generar Paro
              </Button>
            </Grid.Column>
            <Grid.Column only="mobile tablet">
              <Divider />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Button
                disabled={!interruptionSelected || !userWritePermissions}
                onClick={() => setModalJustify(true)}
                color="black"
              >
                Justificar Paro
              </Button>
       */}
      </Grid>
      <InterruptionsModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalContent={modalContent}
        setRefreshData={setRefreshMain}
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        originalData={originalData}
        lines={lineOptions}
        fromInterruptionsManager={true}
      />
      {/* <GenerateInterruptionModal
        modalGenerate={modalGenerate}
        setModalGenerate={setModalGenerate}
        reload={setRefreshMain}
        fromInterruptionsManager={true}
        lineOptions={lineOptions}
      />
      <JustifyInterruptionModal
        interruptionSelected={interruptionSelected}
        modalJustify={modalJustify}
        setModalJustify={setModalJustify}
        setRefreshMain={setRefreshMain}
        fromInterruptionsManager={true}
      /> */}
      {/* <InterruptionsModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalContent={modalContent}
        setRefreshData={setRefreshMain}
      /> */}
    </>
  );
};

export default InterruptionManager;
