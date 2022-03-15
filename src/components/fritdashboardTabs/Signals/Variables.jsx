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
      <LinearProgress color="secondary" />
    </Box>
  ) : processedData && processedData.length > 0 ? (
    <Container fluid>
      <Grid container sx={{ mt: 2 }}>
        <TableWidget
          data={processedData}
          columns={variablesColumns}
          tableName="variables-signals"
        />
      </Grid>
    </Container>
  ) : (
    <></>
  );
};

export default Variables;
