import React, { useContext, useState, useEffect } from "react";
import {
  globalDataContext,
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
} from "../../../context/ContextProvider";
import {
  Grid,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import useWindowSize from "./../../customHooks/UseWindowsSize";
import ModalWidget from "./../../../widgets/modalWidget/ModalWidget";
import InputWidget from "./../../../widgets/forms/InputWidget";
import TreeViewWidget from "./../../../widgets/treeView/TreeViewWidget";
import ButtonGroupWidget from "./../../../widgets/buttonGroup/ButtonGroupWidget";
import Text from "./../../../languages/Text";
import { MemoryDatabaseCall } from "../../../services/Service";
import { ApiCall } from "./../../../services/Service";
import {
  getAllowableUtilGroups,
  getAllowableUtilReasons,
  screen_interruptions_generate,
  screen_interruptions_justify,
} from "../../../services/Interruptions";
import { write_tags } from "../../../services/serviceHelper";
import { createNotification } from "./../../alerts/NotificationAlert";
import SelectChipWidget from "./../../../widgets/forms/SelectChipWidget";

const InterruptionsModal = ({
  showModal,
  setShowModal,
  modalContent,
  setRefreshData,
  fromInterruptionsManager,
  selectedNode,
  setSelectedNode,
  originalData,
  lines,
}) => {
  const windowSize = useWindowSize();

  //useContext
  const { globalData } = useContext(globalDataContext);
  let entId, entName;
  if (globalData.lineData) {
    entId = globalData.lineData.entId;
    entName = globalData.lineData.entName;
  } else {
  }
  const { formWidget, setformWidget } = useContext(formContext);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);
  //useState
  const [groupsData, setGroupsData] = useState(false);
  const [reasonsData, setReasonsData] = useState(false);
  const [treeGroupsData, setTreeGroupsData] = useState(false);
  const [treeReasonsData, setTreeResonsData] = useState(false);
  const [treeViewData, setTreeViewData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState([]);
  //TREEVIEW DATA
  useEffect(() => {
    if (showModal) {
      fetchGroupsTreeViewData();
    }
  }, [showModal]);

  const fetchGroupsTreeViewData = async () => {
    setLoading(true);
    const { res, err } = await getGroups(entId);
    if (err) {
      createNotification(err);
    }
    if (res) {
      setGroupsData(res);
    }
    setLoading(false);
  };

  const getGroups = async (entId) => {
    let err = null;
    let res = [];

    const response = await MemoryDatabaseCall({
      params: getAllowableUtilGroups(entId),
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
          res = response;
        }
      }
    }
    return { res, err };
  };

  useEffect(() => {
    if (groupsData?.length > 0) {
      let firstLevel = groupsData.filter((grp) => {
        return grp.ParentGrpId == null;
      });

      let grandParentGrps = firstLevel.map((grp) => {
        return { id: grp.GrpId, name: grp.GrpDesc, children: [] };
      });

      let intermediateLevels = groupsData.filter((grp) => {
        return grp.ParentGrpId != null;
      });

      let intermediateGrps = grandParentGrps.map((GPgrp) => {
        intermediateLevels.map((grp) => {
          if (GPgrp.id == grp.ParentGrpId) {
            return (GPgrp.children = [
              ...GPgrp.children,
              { id: grp.GrpId, name: grp.GrpDesc, children: [] },
            ]);
          }
        });
        return GPgrp;
      });

      setTreeGroupsData(intermediateGrps);

      let groupsIds = groupsData.map((el) => {
        return el.GrpId;
      });
      let expNodes = ["root", ...groupsIds];
      setExpandedNodes(expNodes);
    }
  }, [groupsData]);

  useEffect(() => {
    if (treeGroupsData?.length > 0) {
      fetchReasonsTreeViewData();
    }
  }, [treeGroupsData]);

  const fetchReasonsTreeViewData = async () => {
    setLoading(true);
    const { res, err } = await getReasons(entId);
    if (err) {
      createNotification(err);
    }
    if (res) {
      setReasonsData(res);
    }
    setLoading(false);
  };

  const getReasons = async (entId) => {
    let err = null;
    let res = [];

    const response = await MemoryDatabaseCall({
      params: getAllowableUtilReasons(entId),
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
          res = response;
        }
      }
    }
    return { res, err };
  };

  useEffect(() => {
    if (reasonsData?.length > 0) {
      let childReasons = treeGroupsData.map((grp) => {
        grp.children.map((obj) => {
          reasonsData.map((reas) => {
            if (obj.id == reas.reas_grp_id) {
              return (obj.children = [
                ...obj.children,
                { id: "reas" + reas.reas_cd, name: reas.reas_desc },
              ]);
            }
          });
        });
        return grp;
      });

      setTreeResonsData(childReasons);

      if (selectedNode != null) {
        let nodeId = selectedNode.replace("reas", "");
        let selectNode = reasonsData.find((el) => {
          return el.reas_cd == nodeId;
        });
        setSelectedReason(selectNode);
      }
    }
  }, [reasonsData]);

  useEffect(() => {
    if (treeReasonsData?.length > 0) {
      let treeData = {
        id: "root",
        name: <Text tid={"sectionReason"} />,
        children: treeReasonsData,
      };

      setTreeViewData(treeData);
    }
  }, [treeReasonsData]);

  //SELECT REASON
  const handleSelectNode = (event, tempNodeId) => {
    try {
      let nodeId = tempNodeId.replace("reas", "");
      setSelectedNode(tempNodeId);
      let selectNode = reasonsData.find((el) => {
        return el.reas_cd == nodeId;
      });
      setSelectedReason(selectNode);
    } catch (error) {}
  };

  const closeModal = () => {
    setformWidget({
      ...formWidget,
      createInterruptionForm: [],
      justifyInterruptionForm: [],
    });
    setSelectedNode(null);
    setSelectedReason(null);
    setShowModal(false);
    setRefreshData(true);
  };

  // CREATE INTERRUPTION
  const handleSubmitCreateInterruption = async () => {
    setLoading(true);

    const paramObj = {
      lineaId: fromInterruptionsManager
        ? formWidget.createInterruptionForm.line
        : entId,
      reasCd: selectedReason.reas_cd,
      comments: formWidget?.createInterruptionForm?.comment
        ? formWidget.createInterruptionForm.comment
        : "",
    };

    const response = await ApiCall({
      params: screen_interruptions_generate(paramObj),
    });
    if (response.responseError) {
      setLoading(false);
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
      closeModal();
    } else {
      const tags_arr = [
        {
          TagName: `${entName}.AveriaMantenimiento`,
          Value: selectedReason === 5 ? 1 : 0, //Si el grupo de paros es 'AVERIAS' escribe 1.
        },
      ];

      const response2 = await ApiCall({
        params: write_tags({ tags_arr }),
      });

      if (response2.responseError) {
        createNotification({
          status: "error",
          code: response.responseError,
          msg: response.responseMsg,
          hide: response.responseHide,
        });
      }
      setLoading(false);
      createNotification({
        status: "success",
        msg: "interruptionGeneratedSuccessfully",
        hide: response.responseHide,
      });
      closeModal();
    }
  };
  const createInterruptionModalContent = (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TreeViewWidget
            treeData={treeViewData}
            handleSelectNode={handleSelectNode}
            selected={selectedNode}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            {fromInterruptionsManager && (
              <Grid item xs={12}>
                <SelectChipWidget
                  formId={"createInterruptionForm"}
                  id={"line"}
                  label={<Text tid={"line"} />}
                  multiple={false}
                  options={lines}
                  required={true}
                  placeholder={""}
                  disabled={false}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <InputWidget
                formId={"createInterruptionForm"}
                id={"comment"}
                label={<Text tid={"comment"} />}
                required={false}
                multiline={true}
                type={"text"}
                maxLength={100}
                disabled={false}
                placeholder={""}
                min={null}
                max={null}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12}>
          <ButtonGroupWidget
            position={"right"}
            buttons={[
              {
                text: "save",
                color: "primary",
                onClick: handleSubmitCreateInterruption,
                disabled: !selectedReason ? true : false,
              },
            ]}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );

  // JUSTIFY INTERRUPTION
  const handleSubmitJustifyInterruption = async () => {
    setLoading(true);

    let row = originalData.find((el) => {
      return el.ID == selectedRows[0].id;
    });

    let submitObj = {
      lineaId: selectedRows[0].EntId,
      reasCd: selectedReason.reas_cd,
      rawReasCd: selectedRows[0].RawReasCd,
      eventTime: row.StartDateTime,
      eventEndTime: row.EndDateTime,
      comments: formWidget?.justifyInterruptionForm?.comment
        ? formWidget.justifyInterruptionForm.comment
        : "",
    };
    const response = await ApiCall({
      params: screen_interruptions_justify(submitObj),
    });
    if (response.responseError) {
      setLoading(false);
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
      closeModal();
    } else {
      setLoading(false);
      createNotification({
        status: "success",
        msg: "interruptionJustifiedSuccessfully",
        hide: response.responseHide,
      });
      closeModal();
    }
  };

  const justifyInterruptionModalContent = (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TreeViewWidget
            treeData={treeViewData}
            handleSelectNode={handleSelectNode}
            expanded={expandedNodes}
            selected={selectedNode}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputWidget
            formId={"justifyInterruptionForm"}
            id={"comment"}
            label={<Text tid={"comment"} />}
            required={false}
            multiline={true}
            type={"text"}
            maxLength={100}
            disabled={false}
            placeholder={""}
            min={null}
            max={null}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <ButtonGroupWidget
            position={"right"}
            buttons={[
              {
                text: "save",
                color: "primary",
                onClick: handleSubmitJustifyInterruption,
                disabled: false,
              },
            ]}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <ModalWidget
      title={
        modalContent === "createInterruption"
          ? "createInterruption"
          : "justifyInterruption"
      }
      open={showModal}
      close={closeModal}
      content={
        modalContent === "createInterruption"
          ? createInterruptionModalContent
          : justifyInterruptionModalContent
      }
      customWidth={windowSize.width < 820 ? 350 : 800}
    />
  );
};

export default InterruptionsModal;
