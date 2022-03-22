import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { selectedRowsContext } from "../../../context/ContextProvider";
import Text from "../../../languages/Text";
import { tab_quality_save_results } from "../../../services/OFservices";
import { ApiCall } from "../../../services/Service";
import { createNotification } from "../../alerts/NotificationAlert";
import { compareArrays } from "../../common/helpers/helper";
import { checkDropdownResult, checkInputResult } from "./helper";
import "./ResultsTable.css";
/* import { createNotification } from "../../common/alerts/NotificationAlert";
import { compareArrays } from "../../common/helpers/helper";
import { tab_quality_save_results } from "../../services/OFservices";
import { ApiCall } from "../../services/Service";
import { checkDropdownResult, checkInputResult } from "./helper"; */
const checkIfModified = (arr1, arr2) => {
  let enableSave = false;

  let filteredArray1 = arr1.map((item) => {
    delete item.resultAttribute;
    delete item.result;
    if (item.isDropdown) {
      delete item.dropdownOptions;
    }
    return item;
  });
  let filteredArray2 = arr2.map((item) => {
    delete item.resultAttribute;
    delete item.result;
    return item;
  });
  const areArraysEqual = compareArrays(
    filteredArray1,
    filteredArray2,
    "charId"
  );
  if (!areArraysEqual) {
    enableSave = true;
  }

  return enableSave;
};

const ResultsTable = ({
  results,
  originalResults,
  handleChange,

  setRefreshMain,
}) => {
  const { selectedRows, setSelectedRows } = useContext(selectedRowsContext);
  const [enableSave, setEnableSave] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    if (results && originalResults) {
      if (results.length > 0 && originalResults.length > 0) {
        const deepCopyResults = JSON.parse(JSON.stringify(results));
        const deepCopyOriginalResults = JSON.parse(
          JSON.stringify(originalResults)
        );

        setEnableSave(
          checkIfModified(deepCopyResults, deepCopyOriginalResults)
        );
      }
    }
    //eslint-disable-next-line
  }, [results]);

  const handleSubmit = async () => {
    setLoadingSave(true);
    const modifiedArr = results
      .filter(
        (item) =>
          originalResults.find((el) => el.charId === item.charId)
            .compareResult !== item.compareResult
      )
      .map((item) => {
        let submitObj = {
          sampleId: selectedRows && selectedRows.id,
          charId: item.charId,
          charName: item.charName,
          valueNo: "1", //hardcoded
          resultValue: item.isDropdown ? item.result.toString() : item.result,
          attrId: item.attrId,
        };
        submitObj = item.isDropdown
          ? { ...submitObj, resultAttribute: item.resultAttribute }
          : submitObj;
        return submitObj;
      });

    const response = await ApiCall({
      params: tab_quality_save_results(modifiedArr),
    });

    if (response.responseError) {
      createNotification({
        status: "error",
        code: response.responseError,
        msg: response.responseMsg,
        hide: response.responseHide,
      });
    } else {
      createNotification({
        status: "success",
        msg: "resultsSavedSuccess",
        hide: response.responseHide,
      });
    }
    setRefreshMain(true);
    setLoadingSave(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table size="small" id="result-quality-table">
            <TableHead>
              <TableRow sx={{ fontWeight: 600 }}>
                <TableCell>Característica</TableCell>
                <TableCell align="right">LL</TableCell>
                <TableCell align="right">HH</TableCell>
                <TableCell align="right">Resultado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((item) => {
                const {
                  charId,
                  charName,
                  charDesc,
                  lowerLimit,
                  upperLimit,
                  isDropdown,
                  result,
                  resultAttribute,
                } = item;

                let resultValue = result ? parseFloat(result) : "";
                /*  if (isDropdown) {
                  if (result) {
                    resultValue = item.dropdownOptions.find(
                      (opt) => opt.extra === resultAttribute
                    );
                  }
                } else {
                  resultValue = result ? parseFloat(result) : "";
                } */
                const dropdownClass = checkDropdownResult(
                  lowerLimit,
                  upperLimit,
                  resultValue?.value || "",
                  charId
                );
                const inputClass = checkInputResult(
                  lowerLimit,
                  upperLimit,
                  result
                );
                return (
                  <TableRow key={charId}>
                    <TableCell>
                      {charName} - {charDesc}
                    </TableCell>
                    <TableCell align="right">{lowerLimit}</TableCell>
                    <TableCell align="right">{upperLimit}</TableCell>
                    <TableCell align="right">
                      {!isDropdown ? (
                        <>
                          <FormControl fullWidth>
                            <TextField
                              id="input-result"
                              className={inputClass}
                              value={resultValue}
                              type={"number"}
                              onChange={(e) =>
                                handleChange({ e, charId, isDropdown })
                              }
                            />
                          </FormControl>
                        </>
                      ) : (
                        <>
                          <FormControl fullWidth>
                            <Select
                              /*   sx={{ height: "40px", padding: "0px" }} */
                              size="small"
                              value="N/A"
                              disabled
                              className="custom-disabled"
                            >
                              <MenuItem value={"N/A"}>N/A</MenuItem>)
                            </Select>

                            {/* <Select
                              id="dropdown-result"
                              className={`wide-scrollbar ${dropdownClass}`}
                              value={resultValue?.value}
                              onChange={(e) =>
                                handleChange({ e, charId, isDropdown })
                              }
                            >
                              {item.dropdownOptions &&
                                item.dropdownOptions.map((item) => (
                                  <MenuItem value={item.value}>
                                    {item.text}
                                  </MenuItem>
                                ))}
                            </Select> */}
                          </FormControl>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <LoadingButton
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={!enableSave}
          loading={loadingSave}
        >
          {Text({ tid: "save" })}
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default ResultsTable;
