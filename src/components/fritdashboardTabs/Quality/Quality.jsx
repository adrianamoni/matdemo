import { Button, Grid, LinearProgress, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  globalDataContext,
  /*  selectedRowsContext, */
  selectedRowsIdsContext,
} from "../../../context/ContextProvider";
import Text from "../../../languages/Text";
import ButtonGroupWidget from "../../../widgets/buttonGroup/ButtonGroupWidget";
import ModalWidget from "../../../widgets/modalWidget/ModalWidget";
import TableWidget from "../../../widgets/TableWidget/TableWidget";
import ModalGenerateSample from "./ModalGenerateSample";
import ResultsTable from "./ResultsTable";
import { fetchAllSampleData, multiCall, sortBy } from "./helper";
import { Box } from "@mui/system";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Quality = () => {
  const { globalData } = useContext(globalDataContext);
  const { orderData, lineData, orderDetails, pendingSamples } = globalData;
  const [onlyPendings, setOnlyPendings] = useState(true);
  const [generateSampleModal, setGenerateSampleModal] = useState(false);
  const [results, setResults] = useState(null);
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );

  const [samples, setSamples] = useState();
  const [refreshMain, setRefreshMain] = useState(false);

  const samplesTableColumns = [
    {
      field: "name",
      headerName: `${Text({ tid: "name" })}`,
      flex: 1,
    },
    {
      field: "req_time_local",
      headerName: `${Text({ tid: "date" })}`,
      flex: 1,
    },
    {
      field: "estado",
      headerName: `${Text({ tid: "state" })}`,
      flex: 1,
    },
  ];
  const resultsTableColumns = [
    {
      field: "char",
      headerName: `${Text({ tid: "feature" })}`,
      flex: 1,
    },
    {
      field: "lowerLimit",
      headerName: `ll`,
      flex: 1,
      type: "number",
    },
    {
      field: "upperLimit",
      headerName: `hh`,
      flex: 1,
      type: "number",
    },
    {
      field: "resultValue",
      headerName: `${Text({ tid: "result" })}`,
      flex: 1,
    },
  ];
  useEffect(() => {
    if (pendingSamples && onlyPendings) {
      setSamples(pendingSamples.data);
    }

    //eslint-disable-next-line
  }, [pendingSamples, onlyPendings]);
  useEffect(() => {
    setSelectedRowsIds({ ...selectedRowsIds, samples: [] });
    if (!onlyPendings) {
      getAllData();
    }
    if (refreshMain) {
      setRefreshMain(false);
    }
    //eslint-disable-next-line
  }, [onlyPendings, refreshMain]);
  const getAllData = async () => {
    setLoadingInitialData(true);
    const { res, err } = await fetchAllSampleData({
      entId: lineData.entId,
      woId: orderData.woId,
      operId: orderData.operId,
      seqNo: orderData.seqNo,
      itemId: orderDetails.productionData.item_id,
    });
    if (err) {
      createNotification(err);
    }
    if (res) {
      setSamples(res);
    }
    setLoadingInitialData(false);
  };

  const handleTogglePendings = () => {
    setOnlyPendings(!onlyPendings);
  };

  return loadingInitialData ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <>
      <Grid container spacing={1} sx={{ mt: 0 }}>
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            startIcon={<FilterAltIcon />}
            onClick={handleTogglePendings}
            style={{
              backgroundColor: "#c0c1c2",
              color: "#000000",
            }}
          >
            {onlyPendings ? <Text tid="pendings" /> : <Text tid="historical" />}
            <span>&nbsp;&nbsp;</span>(
            {onlyPendings
              ? pendingSamples.data.length
              : samples && samples.length}
            )
          </Button>
        </Grid>

        {samples && samples.length > 0 && (
          <Grid item xs={12}>
            <TableWidget
              data={samples}
              columns={samplesTableColumns}
              multipleSelection={false}
              tableName="samples"
              pagination={5}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => setGenerateSampleModal(true)}
          >
            <Text tid="registerTest" />
          </Button>
        </Grid>
        {loadingResults ? (
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <LinearProgress variant="indeterminate" color="secondary" />
            </Box>
          </Grid>
        ) : (
          results &&
          selectedSample && (
            <Grid item xs={12}>
              <ResultsTable
              /*  results={results}
              originalResults={originalResults}
              handleChange={handleChange}
              selectedSample={selectedSample}
              setRefreshMain={setRefreshMain} */
              />
            </Grid>
          )
        )}
      </Grid>

      {/* 
          
      
     
      </Grid>
      <ModalWidget
        open={modalCreateInterruption}
        close={() => setmodalCreateInterruption(false)}
        content={modalContent}
      /> */}

      <ModalWidget
        open={generateSampleModal}
        close={setGenerateSampleModal}
        content={<ModalGenerateSample setRefreshMain={setRefreshMain} />}
        title={"registerTest"}
      />
    </>
  );
};

export default Quality;
