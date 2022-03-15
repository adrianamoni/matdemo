import { Button, Grid, Paper } from "@mui/material";
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
import UseFetchMemory from "../../customHooks/UseFetchMemory";
import ModalGenerateSample from "./ModalGenerateSample";
import ResultsTable from "./ResultsTable";

const Quality = () => {
  const { globalData } = useContext(globalDataContext);
  const { orderData, lineData, orderDetails, pendingSamples } = globalData;
  const [onlyPendings, setOnlyPendings] = useState(true);
  const [generateSampleModal, setGenerateSampleModal] = useState(false);
  const [results, setResults] = useState(null);
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
  let response;
  if (!onlyPendings) {
    response = await UseFetchMemory({
      request: "historical-samples",
      customParams: {
        entId: lineData.entId,
        woId: orderData.woId,
        operId: orderData.operId,
        seqNo: orderData.seqNo,
        itemId: orderDetails.productionData.item_id,
      },
    });
  }

  if (response) {
    console.log("response", response);
    /* setSamples(
        data.map((sample) => ({
          id: sample.sample_id,
          name: sample.sample_name,
          req_time_local: sample.requested_time_local,
          estado: sample.estado,
          status: sample.sample_status,
        }))
      ); */
  }

  const handleTestClick = () => {
    /* setmodalCreateInterruption(true); */
  };
  const handleTogglePendings = () => {
    setOnlyPendings(!onlyPendings);
  };
  const handleGenerateSample = () => {};
  console.log("samples", samples);
  return (
    <>
      <Grid container sx={{ mt: 2 }} spacing={1}>
        <Grid item xs={12} sx={{ display: "flex" }} justifyContent="flex-end">
          <ButtonGroupWidget
            position="right"
            buttons={[
              {
                text: onlyPendings ? "historical" : "pendings",
                color: "primary",
                onClick: handleTogglePendings,
              },
              {
                text: "notificationToQuality",
                color: "secondary",
                onClick: handleTestClick,
              },
            ]}
          />
        </Grid>
        {samples && samples.length > 0 && (
          <Grid item xs={12}>
            <TableWidget
              data={samples}
              columns={samplesTableColumns}
              multipleSelection={false}
              tableName="samples"
            />
          </Grid>
        )}

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
