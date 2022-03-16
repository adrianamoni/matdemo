import React from "react";
import _ from "lodash";
import { TreeView, TreeItem } from "@mui/lab";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const TreeViewWidget = ({ treeData, handleSelectNode }) => {
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

  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["root"]}
      defaultCollapseIcon={<IndeterminateCheckBoxIcon color="primary" />}
      defaultExpandIcon={<AddBoxIcon color="primary" />}
      defaultEndIcon={""}
      sx={{ height: 600, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      multiSelect={false}
      onNodeSelect={handleSelectNode}
    >
      {renderTree(treeData)}
    </TreeView>
  );
};

export default TreeViewWidget;
