import { Box, Grid, LinearProgress } from "@mui/material";
import React, { useContext } from "react";
import { globalDataContext } from "../../../context/ContextProvider";
import TableWidget from "../../../widgets/TableWidget/TableWidget";
import UseFetchMemory from "../../customHooks/UseFetchMemory";
import { processData } from "./helper";
import Text from "../../../languages/Text";

const Variables = () => {
  const { globalData } = useContext(globalDataContext);
  const { entName } = globalData.lineData;
  const variablesColumns = [
    {
      field: "signal",
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
    const apiData = processData(data, entName);
    console.log("apiData", apiData);
  }
  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      <Grid container sx={{ mt: 2 }}>
        {/* <TableWidget data={data} columns={variablesColumns} /> */}
      </Grid>
    </>
  );
};

export default Variables;
