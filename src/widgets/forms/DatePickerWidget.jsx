import React, { useContext, useEffect } from "react";
import { formContext } from "../../context/ContextProvider";
import useWindowSize from "./../../components/customHooks/UseWindowsSize";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import InputLabel from "@mui/material/InputLabel";
import {
  LocalizationProvider,
  DesktopDatePicker,
  MobileDatePicker,
} from "@mui/lab";
import TextField from "@mui/material/TextField";

const DatePickerWidget = ({ formId, id, label, defaultDate }) => {
  const { formWidget, setformWidget } = useContext(formContext);
  const { width } = useWindowSize();

  useEffect(() => {
    let formToChange = formWidget[formId];
    formToChange = { ...formToChange, [id]: defaultDate };
    setformWidget({ ...formWidget, [formId]: formToChange });
  }, []);

  const handleChange = (event) => {
    const value = event;
    let formToChange = formWidget[formId];
    formToChange = { ...formToChange, [id]: value };
    setformWidget({ ...formWidget, [formId]: formToChange });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* For Tablets, Ipads or Mobiles render MobileDatePicker */}
      {width < 1024 ? (
        <>
          <InputLabel>{label}</InputLabel>
          <MobileDatePicker
            inputFormat="dd/MM/yyyy"
            value={formWidget?.[formId]?.[id]}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                id={`${formId}-selectInput-${id}-label`}
                fullWidth
                {...params}
              />
            )}
          />
        </>
      ) : (
        <>
          <InputLabel>{label}</InputLabel>
          <DesktopDatePicker
            inputFormat="dd/MM/yyyy"
            value={formWidget?.[formId]?.[id]}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                id={`${formId}-selectInput-${id}-label`}
                fullWidth
                {...params}
              />
            )}
          />
        </>
      )}
    </LocalizationProvider>
  );
};

export default DatePickerWidget;
