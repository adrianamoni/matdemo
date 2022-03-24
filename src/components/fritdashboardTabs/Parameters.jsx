import React, { useContext } from "react";
import { Grid, LinearProgress, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { globalDataContext } from "../../context/ContextProvider";
import TableWidget from "../../widgets/TableWidget/TableWidget";
import Text from "../../languages/Text";
import UseFetchMemory from "../customHooks/UseFetchMemory";

const Parameters = () => {
  const { globalData } = useContext(globalDataContext);
  const { woId, operId, seqNo } = globalData.orderData;
  const parameterColumns = [
    {
      field: "attr_desc",
      headerName: Text({ tid: "parameter" }),
      flex: 1,
    },
    {
      field: "attr_value",
      headerName: Text({ tid: "value" }),
      flex: 1,
      type: "number",
    },
  ];

  const { loading, data } = UseFetchMemory({
    request: "parameters",
    customParams: {
      woId,
      operId,
      seqNo,
    },
  });

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <Grid container sx={{ mt: 4 }} id="frit-tab-component">
      <TableWidget
        data={data}
        columns={parameterColumns}
        tableName="parameters"
        disableSelection
      />
    </Grid>
  );
};

export default Parameters;
