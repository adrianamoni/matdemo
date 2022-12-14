import React, { useState, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import { TextField } from "@mui/material";
import { formContext } from "../../context/ContextProvider";

const InputWidget = ({
  formId,
  id,
  label,
  required,
  multiline,
  type,
  maxLength,
  disabled,
  placeholder,
  min,
  max,
  autoFocus,
}) => {
  const { formWidget, setformWidget } = useContext(formContext);
  const [localVal, setLocalVal] = useState(formWidget?.[formId]?.[id]);
  //blur event added, to fix performance issues
  const handleBlur = () => {
    let formToChange = formWidget[formId];
    formToChange = { ...formToChange, [id]: localVal };
    setformWidget({ ...formWidget, [formId]: formToChange });
  };

  const handleChange = (e) => {
    if (min != null && max != null && type === "number") {
      var value = parseInt(e.target.value, 10);

      if (value > max) value = max;
      if (value < min) value = min;

      setLocalVal(value);
      let formToChange = formWidget[formId];
      formToChange = { ...formToChange, [id]: value };
      setformWidget({ ...formWidget, [formId]: formToChange });
    } else {
      setLocalVal(e.target.value);
      let formToChange = formWidget[formId];
      formToChange = { ...formToChange, [id]: e.target.value };
      setformWidget({ ...formWidget, [formId]: formToChange });
    }
  };

  return (
    <>
      <InputLabel required={required}>{label}</InputLabel>
      <TextField
        autoFocus={autoFocus || false}
        required={required}
        id={`${formId}-textField-${id}-label`}
        value={localVal}
        onChange={handleChange}
        onBlur={handleBlur}
        multiline={multiline}
        type={type}
        fullWidth
        inputProps={{
          maxLength: maxLength,
          min: min,
          max: max,
          autoComplete: "new-password",
        }}
        disabled={disabled}
        placeholder={placeholder}
      />
    </>
  );
};

export default InputWidget;
