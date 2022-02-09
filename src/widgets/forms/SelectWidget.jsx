import React, { useContext } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { seccionFake } from "../TableWidget/fakedata";
import { formContext } from "../../context/ContextProvider";

const SelectWidget = ({ formId, id, label, options }) => {
  /**
   * options need to be an array of objects, with: key, value, text. {key:x, value:x, text:x}
   */
  const { formWidget, setformWidget } = useContext(formContext);

  const handleChange = (event) => {
    const value = event.target.value;
    let formToChange = formWidget[formId];
    formToChange = { ...formToChange, [id]: value };
    setformWidget({ ...formWidget, [formId]: formToChange });
  };

  return (
    <>
      {/*  <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel sx={{ color: "#000" }} id={`${formId}-select-${id}-label`}>
          Sección
        </InputLabel>
        <Select
          labelId={`${formId}-select-${id}-label`}
          id={`${formId}-select-${id}`}
          value={formWidget?.[formId]?.[id]}
          onChange={handleChange}
          label={label}
          sx={{ color: "#000", fontSize: "11px" }}
        >
          {options &&
            options.length > 0 &&
            options.map((item) => (
              <MenuItem key={item.key} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
        </Select>
      </FormControl> */}
      <TextField
        id={`${formId}-selectInput-${id}-label`}
        select
        label={label}
        value={formWidget?.[formId]?.[id]}
        onChange={handleChange}
        fullWidth
        /*  variant="standard" */
      >
        {options &&
          options.length > 0 &&
          options.map((item) => (
            <MenuItem key={item.key} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
      </TextField>
    </>
  );
};

export default SelectWidget;
