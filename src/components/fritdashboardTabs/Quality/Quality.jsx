import { Button, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import Text from "../../../languages/Text";
import ButtonGroupWidget from "../../../widgets/buttonGroup/ButtonGroupWidget";
import ModalWidget from "../../../widgets/modalWidget/ModalWidget";
import TableWidget from "../../../widgets/TableWidget/TableWidget";
import ModalGenerateSample from "./ModalGenerateSample";
import ResultsTable from "./ResultsTable";

const Quality = () => {
  const [onlyPendings, setOnlyPendings] = useState(true);
  const [generateSampleModal, setGenerateSampleModal] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedSample, setSelectedSample] = useState(undefined);
  const [samples, setSamples] = useState();
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
    },
    {
      field: "upperLimit",
      headerName: `hh`,
      flex: 1,
    },
    {
      field: "resultValue",
      headerName: `${Text({ tid: "result" })}`,
      flex: 1,
    },
  ];
  const handleTestClick = () => {
    /* setmodalCreateInterruption(true); */
  };
  const handleGenerateSample = () => {};

  return (
    <>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sx={{ display: "flex" }} justifyContent="flex-end">
          <ButtonGroupWidget
            position="right"
            buttons={[
              {
                text: onlyPendings ? "historical" : "pendings",
                color: "primary",
              },
              {
                text: "notificationToQuality",
                color: "secondary",
                onClick: handleTestClick,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <TableWidget data={samples} columns={samplesTableColumns} /> */}
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => setGenerateSampleModal(true)}
          >
            {Text({ tid: "registerTest" })}
          </Button>
        </Grid>
        {results && selectedSample && (
          <Grid item xs={12}>
            <ResultsTable
            /*  results={results}
              originalResults={originalResults}
              handleChange={handleChange}
              selectedSample={selectedSample}
              setRefreshMain={setRefreshMain} */
            />
          </Grid>
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
        close={() => setGenerateSampleModal(false)}
        content={<ModalGenerateSample />}
        title={Text({ tid: "registerTest" })}
      />
    </>
  );
};

export default Quality;
