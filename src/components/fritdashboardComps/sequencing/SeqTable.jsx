import React, { useContext, useEffect } from "react";
import uuid from "react-uuid";
import moment from "moment";
import "./SeqTable.css";
import {
  colorByState,
  getDateFromInput,
  getLineFromInput,
  getPeopleFromInput,
  getQtyFromInput,
} from "./helper";

import {
  Alert,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import DatePickerWidget from "../../../widgets/forms/DatePickerWidget";
import {
  formContext,
  userPreferencesContext,
} from "../../../context/ContextProvider";
import Text from "../../../languages/Text";

const SeqTable = ({
  apiData,
  setApiData,
  selectedOperation,
  splitOF,
  selected,
  setSelected,
  lines,
  selectedLine,
}) => {
  const { formWidget } = useContext(formContext);
  const { userPreferences, setUserPreferences } = useContext(
    userPreferencesContext
  );
  const { colorMode } = userPreferences;
  const isDark = colorMode === "dark";
  /*   const [startDate, setStartDate] = useState(new Date()); */

  let productionOrders;
  let cleaningOrders;

  if (selectedOperation) {
    let orders;
    orders = selectedLine
      ? apiData.ordenes.filter(
          (order) =>
            order.target_EntId === selectedLine.id ||
            order.target_EntId === apiData.entId
        )
      : apiData.ordenes;

    productionOrders = orders.filter(
      (el) => el.OperId !== "NETEJA" && el.OperId !== "LIMPIEZA"
    );
    cleaningOrders = orders.filter(
      (el) => el.OperId === "NETEJA" || el.OperId === "LIMPIEZA"
    );
  }

  const handleRowSelect = ({ rowId, e }) => {
    selected === rowId ? setSelected(null) : setSelected(rowId);
  };

  const handleSplitClick = (row) => {
    splitOF(row);
  };

  const handleInitDateChange = (date, rowId) => {
    const formattedData = moment(date).format("YYYY-MM-DDTHH:mm:ss");

    const test = getDateFromInput(formattedData, rowId, apiData);
    setApiData([{ ...test }]);
    //setDisableSave(false);
  };

  const handleLineChange = (e, rowId) => {
    let test;
    if (e.target.value) {
      test = getLineFromInput(e.target.value, rowId, apiData);
    } else {
      test = getLineFromInput(apiData.entId, rowId, apiData);
    }
    setApiData([{ ...test }]);
    //setDisableSave(false);
  };

  const handlePeopleChange = (e, rowId) => {
    const test = getPeopleFromInput(e.target.value, rowId, apiData);
    setApiData([{ ...test }]);
    //setDisableSave(false);
  };

  const handleQtyChange = (e, rowId) => {
    const test = getQtyFromInput(e.target.value, rowId, apiData);
    setApiData([{ ...test }]);

    //setDisableSave(false);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  //let tableClass;
  // if (width < 1400) {
  //  tableClass = "min-row-seq-table";
  //} else if (width < 1600) {
  //  tableClass = "mid-row-seq-table";
  //}

  useEffect(() => {
    if (formWidget.sequencingInitDate) {
      const id = Object.keys(formWidget.sequencingInitDate);
      console.log("id", id);
      // handleInitDateChange(formWidget.sequencingInitDate[id[0]], id[0]);
      handleInitDateChange(
        formWidget.sequencingInitDate[
          formWidget.sequencingInitDate.lastChanged
        ],
        formWidget.sequencingInitDate.lastChanged
      );
    }
  }, [formWidget]);

  return (
    <>
      {productionOrders && productionOrders.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1450 }} size="small" id="sequencing-table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "background.grey3" }}>
                  <TableCell></TableCell>
                  <TableCell>{Text({ tid: "initDate" })}</TableCell>
                  <TableCell>{Text({ tid: "endDate" })}</TableCell>
                  <TableCell>{Text({ tid: "state" })}</TableCell>
                  <TableCell>Material</TableCell>
                  <TableCell>{Text({ tid: "orderId" })}</TableCell>
                  <TableCell>{Text({ tid: "line" })}</TableCell>
                  <TableCell>{Text({ tid: "people" })}</TableCell>
                  <TableCell>{Text({ tid: "quantity" })}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productionOrders.map((row) => {
                  let currentSpeed = row.posiblesVelocidades.find(
                    (el) => el.personas === row.Personas
                  );
                  let Duracion;
                  let closest;
                  if (currentSpeed) {
                    Duracion = (currentSpeed.velocidad / 1000) * row.QtyReqd;
                  } else {
                    //Find nearer number of people
                    closest = row.posiblesVelocidades.reduce(function (
                      prev,
                      curr
                    ) {
                      return Math.abs(curr.personas - row.Personas) <
                        Math.abs(prev.personas - row.Personas)
                        ? curr.personas
                        : prev.personas;
                    });
                    currentSpeed = row.posiblesVelocidades.find(
                      (el) => el.personas === closest
                    );
                    Duracion = (currentSpeed.velocidad / 1000) * row.QtyReqd;
                  }
                  Duracion = Duracion / row.FactorOEE;
                  //----------

                  const cleaningDuration =
                    cleaningOrders.find((el) => el.WoId === row.WoId)
                      ?.Duracion || 0;
                  const endTimePlusCleaning = moment(row.SchedStartTimeLocal)
                    .add(Duracion, "minutes")
                    .add(cleaningDuration, "minutes");
                  const endTime = new Date(
                    endTimePlusCleaning
                  ).toLocaleString();
                  let possibleLinesOptions = lines.map((el) => ({
                    key: uuid(),
                    text: el.entName,
                    value: el.entId,
                  }));

                  //La orden no est?? asignada a una linea de esta operaci??n

                  let lineExist = lines.find(
                    (line) => line.entId === row.target_EntId
                  );
                  if (!lineExist) {
                    if (row.target_EntId === apiData.entId) {
                      lineExist = true;
                    } else {
                      possibleLinesOptions = [
                        ...possibleLinesOptions,
                        {
                          key: uuid(),
                          text: row.target_EntName,
                          value: row.target_EntId,
                        },
                      ];
                    }
                  }
                  const peopleValue =
                    row.posiblesVelocidades.find(
                      (el) => el.personas === row.Personas
                    )?.velocidad || undefined;

                  return (
                    <TableRow
                      key={row.id}
                      sx={
                        selected === row.id
                          ? {
                              backgroundColor: "selected.main",
                              /* "radial-gradient(ellipse, #f5fcff 60%, #e1eff5)", */
                            }
                          : {}
                      }
                      onClick={(e) =>
                        handleRowSelect({ rowId: row.id, e: e.target })
                      }
                    >
                      <TableCell textAlign="center">
                        <Button
                          variant="outlined"
                          onClick={() => handleSplitClick(row)}
                        >
                          <CallSplitIcon />
                        </Button>
                      </TableCell>
                      <TableCell>
                        {/* <DatePicker
                        selected={new Date(row.SchedStartTimeLocal)}
                        onChange={(date) => handleInitDateChange(date, row.id)}
                        showTimeSelect
                        timeIntervals={5}
                        dateFormat="dd/MM/yyyy hh:mm:ss"
                      /> */}
                        <DatePickerWidget
                          formId="sequencingInitDate"
                          id={row.id}
                          defaultDate={new Date(row.SchedStartTimeLocal)}
                          type="datetime"
                        />
                      </TableCell>
                      <TableCell>
                        <span>{endTime}</span>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          textAlign={"center"}
                          sx={{
                            backgroundColor: colorByState({
                              prodState: row.StateCd,
                              cleanState: null,
                              isDark,
                            }).color,
                            paddingInline: "10px",
                            paddingBlock: "4px",
                            borderRadius: "2px",
                          }}
                        >
                          {row.StateCdDesc}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{row.ItemId}</Typography>

                        <Typography variant="body2">
                          ({row.ItemDesc})
                        </Typography>
                      </TableCell>

                      <TableCell>{row.WoId}</TableCell>

                      <TableCell>
                        <FormControl error={!lineExist}>
                          <Select
                            sx={{
                              "& .Mui-disabled": {
                                backgroundColor: "background.grey3b",
                              },
                              minWidth: 88,
                            }}
                            /*  sx={{}} */
                            value={row.target_EntId}
                            onChange={(e) => handleLineChange(e, row.id)}
                            disabled={row.matriculasCargadas}
                            labelId="demo-simple-select-error-label"
                          >
                            {possibleLinesOptions.map((line) => (
                              <MenuItem value={line.value}>
                                {line.text}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>

                      <TableCell>
                        {row.StateCd === 1 || row.StateCd === 2 ? (
                          <FormControl fullWidth>
                            <Select
                              value={peopleValue}
                              onChange={(e) => handlePeopleChange(e, row.id)}
                            >
                              {row.posiblesVelocidades.map((el) => (
                                <MenuItem value={el.velocidad}>
                                  {el.personas}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : (
                          <FormControl fullWidth>
                            <Select
                              value={peopleValue}
                              disabled
                              sx={{
                                "& .Mui-disabled": {
                                  backgroundColor: "background.grey3b",
                                },
                              }}
                            >
                              {row.posiblesVelocidades.map((el) => (
                                <MenuItem value={el.velocidad}>
                                  {el.personas}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </TableCell>

                      <TableCell>
                        <FormControl fullWidth>
                          <TextField
                            className="custom-number-input"
                            type="number"
                            value={row.QtyReqd}
                            onChange={(e) => handleQtyChange(e, row.id)}
                          />
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Alert variant="contained" severity="info">
          No hay ordenes que coincidan con los filtros indicados
        </Alert>
      )}
    </>
  );
};

export default SeqTable;
