import { Alert, Button, Grid, LinearProgress, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  globalDataContext,
  selectedRowsContext,
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
import { tab_quality_get_results } from "../../../services/OFservices";
import { MemoryDatabaseCall } from "../../../services/Service";

const Quality = () => {
  const { globalData } = useContext(globalDataContext);
  const { orderData, lineData, orderDetails, pendingSamples } = globalData;
  const [onlyPendings, setOnlyPendings] = useState(true);
  const [generateSampleModal, setGenerateSampleModal] = useState(false);
  const [results, setResults] = useState(null);
  const [originalResults, setOriginalResults] = useState(null);
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const { selectedRowsIds, setSelectedRowsIds } = useContext(
    selectedRowsIdsContext
  );
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);

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
    setSelectedRows(null);
    if (!onlyPendings) {
      getAllData();
    }
    if (refreshMain) {
      setRefreshMain(false);
    }

    return () => {
      setSelectedRows([]);
      setSelectedRowsIds([]);
    };
    //eslint-disable-next-line
  }, [onlyPendings, refreshMain]);

  //useEffect on change selected row
  useEffect(() => {
    if (selectedRowsIds["samples"] && selectedRowsIds["samples"].length > 0) {
      let tempRow = samples.find(
        (sample) => sample.id === selectedRowsIds["samples"][0]
      );
      if (tempRow) {
        setSelectedRows(tempRow);
        fetchResults(tempRow.id);
      } else {
        setSelectedRows([]);

        setResults([]);
        setOriginalResults([]);
      }
    }
  }, [selectedRowsIds]);

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

  useEffect(() => {
    if (originalResults) {
      getResultOptions();
    }
    //eslint-disable-next-line
  }, [originalResults]);
  const fetchResults = async (id) => {
    /* setLoadingResults(true); */
    //setSampleId(id);
    setLoadingResults(true);
    const response = await MemoryDatabaseCall({
      params: tab_quality_get_results({ sampleId: id }),
      url: "queryDataAsync",
    });
    if (response) {
      if (response.responseError) {
        setResults(null);
      } else {
        if (response.length > 0) {
          const filteredResults = response.map((result) => ({
            result: result["1"] ? result["1"] : "",
            resultAttribute: "",
            compareResult: result["1"] ? result["1"] : "",
            attrId: result.attr_id,
            isDropdown: result.attr_id === -1 ? false : true,
            charId: result.char_id,
            charName: result.char_name,
            charDesc: result.char_desc,
            lowerLimit: result.lsv,
            upperLimit: result.usv,
          }));
          const sorted = sortBy("charName", filteredResults);
          setOriginalResults(sorted);
        }
      }
    }
    /* setLoadingResults(false); */
  };
  const getResultOptions = async () => {
    const options = await multiCall(originalResults);
    let res;

    if (options) {
      if (options.length > 0) {
        const test = JSON.parse(JSON.stringify(originalResults));
        res = test.map((result) => {
          const resultFind = options.find(
            (option) => result.charId === option.charId
          );

          if (resultFind) {
            return {
              ...result,
              resultAttribute:
                resultFind.options.find(
                  (el) => el.possible_value === result.result
                )?.extra || "",
              dropdownOptions: resultFind.options,
            };
          }
          return { ...result };
        });
      } else {
        res = JSON.parse(JSON.stringify(originalResults));
      }
    }

    setResults(res);
    setLoadingResults(false);
  };

  const handleChange = ({ e, charId, isDropdown }) => {
    const newArr = [...results];
    let selectedCharIndex = newArr.findIndex((el) => el.charId === charId);
    if (isDropdown) {
      //newArr[selectedCharIndex].result =
      newArr[selectedCharIndex].result = e.target.value;
      newArr[selectedCharIndex].resultAttribute =
        newArr[selectedCharIndex].dropdownOptions.find(
          (el) => el.value === e.target.value
        )?.extra || "";
      newArr[selectedCharIndex].compareResult =
        newArr[selectedCharIndex].dropdownOptions.find(
          (el) => el.value === e.target.value
        )?.possible_value || "";
    } else {
      newArr[selectedCharIndex].result = e.target.value.toString();
      newArr[selectedCharIndex].compareResult = e.target.value.toString();
    }
    setResults([...newArr]);
  };
  return loadingInitialData ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" color="secondary" />
    </Box>
  ) : (
    <>
      <Grid container spacing={1} sx={{ mt: 0, paddingRight: 3 }}>
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
        ) : results && selectedRows ? (
          <Grid item xs={12}>
            <ResultsTable
              results={results}
              originalResults={originalResults}
              handleChange={handleChange}
              setRefreshMain={setRefreshMain}
            />
          </Grid>
        ) : selectedRows > 0 ? (
          <Grid item xs={12}>
            <Alert variant="filled" severity="info">
              No hay resultados en la muestra seleccionada
            </Alert>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
      <ModalGenerateSample
        showModal={generateSampleModal}
        setShowModal={setGenerateSampleModal}
        setRefreshMain={setRefreshMain}
      />
    </>
  );
};

export default Quality;
