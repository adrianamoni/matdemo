import React, { useState, useContext, useEffect } from "react";
import { TextField } from "@mui/material";
import { formContext } from "../../context/ContextProvider";

const InputWidget = ({ formId, id, label }) => {
  const { formWidget, setformWidget } = useContext(formContext);
  const [localVal, setLocalVal] = useState(formWidget?.[formId]?.[id]);

  const handleBlur = () => {
    let formToChange = formWidget[formId];
    formToChange = { ...formToChange, [id]: localVal };
    setformWidget({ ...formWidget, [formId]: formToChange });
  };

  return (
    <TextField
      required
      id={`${formId}-textField-${id}-label`}
      label={label}
      value={localVal}
      onChange={(e) => setLocalVal(e.target.value)}
      onBlur={handleBlur}
    />
  );
};

export default InputWidget;
