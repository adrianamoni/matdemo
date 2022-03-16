import React from "react";
import _ from "lodash";
import { TreeView, TreeItem } from "@mui/lab";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import useWindowSize from "./../../components/customHooks/UseWindowsSize";

const TreeViewWidget = (props) => {
  const windowSize = useWindowSize();

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      sx={{ paddingTop: "15px" }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  return props?.expanded ? (
    <>
      <TreeView
        aria-label="customized"
        expanded={props.expanded}
        defaultCollapseIcon={<IndeterminateCheckBoxIcon color="primary" />}
        defaultExpandIcon={<AddBoxIcon color="primary" />}
        defaultEndIcon={""}
        sx={{
          height: windowSize.width < 820 ? "350px" : "auto",
          flexGrow: 1,
          maxWidth: 400,
          overflowY: "auto",
        }}
        multiSelect={false}
        onNodeSelect={props.handleSelectNode}
        selected={props.selected}
      >
        {renderTree(props.treeData)}
      </TreeView>
    </>
  ) : (
    <>
      <TreeView
        aria-label="customized"
        defaultExpanded={["root"]}
        defaultCollapseIcon={<IndeterminateCheckBoxIcon color="primary" />}
        defaultExpandIcon={<AddBoxIcon color="primary" />}
        defaultEndIcon={""}
        sx={{
          height: windowSize.width < 820 ? "350px" : "auto",
          flexGrow: 1,
          maxWidth: 400,
          overflowY: "auto",
        }}
        multiSelect={false}
        onNodeSelect={props.handleSelectNode}
        selected={props.selected}
      >
        {renderTree(props.treeData)}
      </TreeView>
    </>
  );
};

export default TreeViewWidget;
