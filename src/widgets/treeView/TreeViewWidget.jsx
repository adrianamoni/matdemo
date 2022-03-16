import React from "react";
import _ from "lodash";
import { TreeView, TreeItem } from "@mui/lab";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const TreeViewWidget = ({ treeData, handleSelectNode, expanded, selected }) => {
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
      //expanded={expanded}
      defaultCollapseIcon={<IndeterminateCheckBoxIcon color="primary" />}
      defaultExpandIcon={<AddBoxIcon color="primary" />}
      defaultEndIcon={""}
      sx={{ height: 600, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      multiSelect={false}
      onNodeSelect={handleSelectNode}
      selected={selected}
    >
      {renderTree(treeData)}
    </TreeView>
  );
};

export default TreeViewWidget;
