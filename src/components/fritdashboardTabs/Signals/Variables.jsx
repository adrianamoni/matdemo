import { Box, Container, Grid, LinearProgress } from "@mui/material";
import React, { useContext } from "react";
import { globalDataContext } from "../../../context/ContextProvider";
import TableWidget from "../../../widgets/TableWidget/TableWidget";
import UseFetchMemory from "../../customHooks/UseFetchMemory";
import { processData } from "./helper";
import Text from "../../../languages/Text";

const Variables = () => {
  const { globalData } = useContext(globalDataContext);
  const { entName } = globalData.lineData;
  let processedData = [];
  const variablesColumns = [
    {
      field: "description",
      headerName: Text({ tid: "signal" }),
      flex: 1,
    },
    {
      field: "value",
      headerName: Text({ tid: "value" }),
      flex: 1,
      type: "number",
    },
    {
      field: "unit",
      headerName: `UMB`,
      flex: 1,
    },
  ];

  const { loading, data } = UseFetchMemory({
    request: "variables-signals",
  });
  if (data) {
    processedData = processData(data, entName);
  }
  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : processedData && processedData.length > 0 ? (
    <Grid container sx={{ mt: 4 /* paddingRight: 3 */ }}>
      <TableWidget
        data={processedData}
        columns={variablesColumns}
        tableName="variables-signals"
      />
    </Grid>
  ) : (
    <></>
  );
};

export default Variables;
