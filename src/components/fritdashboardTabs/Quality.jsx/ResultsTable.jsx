import React, { useState } from "react";
/* import { useEffect } from "react";
import { createNotification } from "../../common/alerts/NotificationAlert";
import { compareArrays } from "../../common/helpers/helper";
import { tab_quality_save_results } from "../../services/OFservices";
import { ApiCall } from "../../services/Service";
import { checkDropdownResult, checkInputResult } from "./helper"; */

/* const checkIfModified = (arr1, arr2) => {
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
}; */

const ResultsTable = ({
  results,
  originalResults,
  handleChange,
  selectedSample,
  setRefreshMain,
}) => {
  /*   const [enableSave, setEnableSave] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    if (results && originalResults) {
      if (results.length > 0 && originalResults.length > 0) {
        const deepCopyResults = JSON.parse(JSON.stringify(results));
        const deepCopyOriginalResults = JSON.parse(
          JSON.stringify(originalResults)
        );

        console.log("deepCopyResults", deepCopyResults);
        console.log("deepCopyOriginalResults", deepCopyOriginalResults);
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
          sampleId: selectedSample,
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
        msg: "¡Resultados guardados correctamente!",
        hide: response.responseHide,
      });
    }
    setRefreshMain(true);
    setLoadingSave(false);
  }; */

  return (
    <>
      RESULTS TABLE
      {/*  <Table id="QualityResultTable">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Característica</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">LL</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">HH</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Resultado</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
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

            let resultValue;
            if (isDropdown) {
              if (result) {
                resultValue = item.dropdownOptions.find(
                  (opt) => opt.extra === resultAttribute
                );
              }
            } else {
              resultValue = result ? parseFloat(result) : "";
            }
            const dropdownClass = checkDropdownResult(
              lowerLimit,
              upperLimit,
              resultValue?.value || "",
              charId
            );
            return (
              <Table.Row key={charId}>
                <Table.Cell width={8}>
                  {charName} - {charDesc}
                </Table.Cell>
                <Table.Cell width={1} textAlign="right">
                  {lowerLimit}
                </Table.Cell>
                <Table.Cell width={1} textAlign="right">
                  {upperLimit}
                </Table.Cell>
                <Table.Cell width={6} style={{ height: 54 }} textAlign="right">
                  <Form>
                    {!isDropdown ? (
                      <>
                        <Form.Input
                          id="input-result"
                          className={checkInputResult(
                            lowerLimit,
                            upperLimit,
                            result
                          )}
                          value={resultValue}
                          type={"number"}
                          onChange={(e, d) =>
                            handleChange(d, charId, isDropdown)
                          }
                        />
                      </>
                    ) : (
                      <>
                        <Form.Dropdown
                          id="dropdown-result"
                          selection
                          style={{
                            alignSelf: "stretch",
                            justifySelf: "center",
                          }}
                          className={`wide-scrollbar ${dropdownClass}`}
                          value={resultValue?.value}
                          options={item.dropdownOptions}
                          onChange={(e, d) =>
                            handleChange(d, charId, isDropdown)
                          }
                        />
                      </>
                    )}
                  </Form>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
        <Button
          primary
          onClick={handleSubmit}
          disabled={!enableSave}
          loading={loadingSave}
        >
          <Icon name="save" />
          Guardar
        </Button>
      </div> */}
    </>
  );
};

export default ResultsTable;
