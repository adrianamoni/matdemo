import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
} from "@mui/material";
import { dataTableMat } from "../../widgets/TableWidget/fakedata";
import TableWidget from "../../widgets/TableWidget/TableWidget";

const Signals = () => {
  let loading;
  /*  const {loading, data} = await getSignalData() */
  /* 
  useEffect(() => {
    console.log("Objeto LANGUAGES:", window.LANG_EN);
  }, []); */

  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <Grid container>
      signals
      {/* <Paper sx={{ width: "100%", marginTop: "1rem" }}>
        <TableWidget data={dataTableMat} columns={signalTableColumns} />
      </Paper> */}
    </Grid>
  );
};

export default Signals;
