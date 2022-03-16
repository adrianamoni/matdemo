import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import moment from "moment";
import "./SeqTable.css";
import {
  getDateFromInput,
  getLineFromInput,
  getPeopleFromInput,
  getQtyFromInput,
  propsByState,
} from "./helper";
import useWindowSize from "../../customHooks/UseWindowsSize";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const { width } = useWindowSize();
  const [startDate, setStartDate] = useState(new Date());
  console.log("startDate", startDate);
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

  const handleRowSelect = ({ rowId, day, e }) => {
    if (
      e &&
      e.target &&
      (e.target.type === "datetime-local" ||
        e.target.id === "split-icon" ||
        e.target.id === "search-icon" ||
        e.target.id === "quantity-input")
    ) {
    } else {
      selected === rowId ? setSelected(undefined) : setSelected(rowId);
    }
  };

  const handleSplitClick = (row) => {
    splitOF(row);
  };

  const handleInitDateChange = (date, rowId) => {
    const formattedData = moment(date).format("YYYY-MM-DDTHH:mm:ss");

    const test = getDateFromInput(date, rowId, apiData);
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
    console.log("startDate2", startDate);
  }, [startDate]);

  return (
    <>
      {productionOrders && productionOrders.length > 0 ? (
        <>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Fecha Inicio</TableCell>
                <TableCell>Fecha Fin</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Id Orden</TableCell>
                <TableCell>Línea</TableCell>
                <TableCell>Personas</TableCell>
                <TableCell>Cantidad</TableCell>
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
                  cleaningOrders.find((el) => el.WoId === row.WoId)?.Duracion ||
                  0;
                const endTimePlusCleaning = moment(row.SchedStartTimeLocal)
                  .add(Duracion, "minutes")
                  .add(cleaningDuration, "minutes");
                const endTime = new Date(endTimePlusCleaning).toLocaleString();
                let possibleLinesOptions = lines.map((el) => ({
                  key: uuid(),
                  text: el.entName,
                  value: el.entId,
                }));

                //La orden no está asignada a una linea de esta operación

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

                return (
                  <TableRow
                    key={row.id}
                    style={
                      selected === row.id
                        ? {
                            background:
                              "radial-gradient(ellipse, #f5fcff 60%, #e1eff5)",
                          }
                        : {}
                    }
                    onClick={(e, d) =>
                      handleRowSelect({ rowId: row.id, e: e, d: d })
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
                      {console.log("startdate", row.SchedStartTimeLocal)}
                      <DatePicker
                        selected={new Date(row.SchedStartTimeLocal)}
                        onChange={(date) => handleInitDateChange(date, row.id)}
                        showTimeSelect
                        timeIntervals={5}
                        dateFormat="dd/MM/yyyy hh:mm:ss"
                      />
                    </TableCell>
                    <TableCell>
                      <span>{endTime}</span>
                    </TableCell>
                    <TableCell>
                      <span
                        style={{
                          backgroundColor: propsByState({
                            prodState: row.StateCd,
                            cleanState: null,
                          }).color,
                          padding: 4,
                          borderRadius: 5,
                        }}
                      >
                        {row.StateCdDesc}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span>{row.ItemId}</span>
                      <br />
                      <span>({row.ItemDesc})</span>
                    </TableCell>

                    <TableCell>{row.WoId}</TableCell>

                    <TableCell>
                      <FormControl error={!lineExist}>
                        <InputLabel>Linea</InputLabel>
                        <Select
                          value={row.target_EntId}
                          onChange={(e) => handleLineChange(e, row.id)}
                          disabled={row.matriculasCargadas}
                          labelId="demo-simple-select-error-label"
                          label="Linea"
                        >
                          {possibleLinesOptions.map((line) => (
                            <MenuItem value={line.value}>{line.text}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell>
                      {row.StateCd === 1 || row.StateCd === 2 ? (
                        <Select
                          value={
                            row.posiblesVelocidades.find(
                              (el) => el.personas === row.Personas
                            )?.velocidad || undefined
                          }
                          onChange={(e) => handlePeopleChange(e, row.id)}
                        >
                          {row.posiblesVelocidades.map((el) => (
                            <MenuItem value={el.value}>{el.personas}</MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <span>{row.Personas}</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <TextField
                        type="number"
                        value={row.QtyReqd}
                        onChange={(e) => handleQtyChange(e, row.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </>
      ) : (
        <Alert variant="outlined" severity="info">
          No hay ordenes que coincidan con los filtros indicados
        </Alert>
      )}
    </>
  );
};

export default SeqTable;
