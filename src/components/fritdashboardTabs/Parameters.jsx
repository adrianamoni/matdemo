import React, { useContext } from "react";
import { Grid, LinearProgress, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { globalDataContext } from "../../context/ContextProvider";
import TableWidget from "../../widgets/TableWidget/TableWidget";
import Text from "../../languages/Text";
import UseFetchMemory from "../customHooks/UseFetchMemory";

const Parameters = () => {
  const { globalData } = useContext(globalDataContext);
  const parameterColumns = [
    {
      field: "attr_desc",
      headerName: Text({ tid: "parameter" }),
      flex: 1,
    },
    {
      field: "attr_value",
      headerName: `Valor`,
      headerName: Text({ tid: "value" }),
      flex: 1,
    },
  ];

  const { loading, data } = UseFetchMemory({
    request: "parameters",
    order: globalData.orderData,
  });

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      <Grid container sx={{ mt: 2 }}>
        <TableWidget data={data} columns={parameterColumns} />
      </Grid>
    </>
  );
};

export default Parameters;
