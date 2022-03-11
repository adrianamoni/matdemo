import React, { useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import { formContext } from "../../context/ContextProvider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SelectChipWidget = ({
  formId,
  id,
  label,
  multiple,
  options,
  required,
  placeholder,
  disabled,
}) => {
  /**
   * options need to be an array of objects, with: key, value, text. {key:x, value:x, text:x}
   */
  const { formWidget, setformWidget } = useContext(formContext);

  const handleChangeAutoCompleteMultiple = (event, newValue) => {
    let formToChange = formWidget[formId];
    formToChange = {
      ...formToChange,
      [id]: newValue,
    };
    setformWidget({ ...formWidget, [formId]: formToChange });
  };

  const handleChangeAutoComplete = (event, newValue) => {
    let formToChange = formWidget[formId];
    formToChange = {
      ...formToChange,
      [id]: newValue,
    };
    setformWidget({ ...formWidget, [formId]: formToChange });
  };

  return (
    <>
      <InputLabel
        required={required}
        id={`${formId}-multiple-chip-${id}-label`}
      >
        {label}
      </InputLabel>
      {multiple ? (
        // Autocomplete && multiple
        <Autocomplete
          multiple
          id={`${formId}-multiple-chip-${id}`}
          value={formWidget?.[formId]?.[id] ? formWidget[formId][id] : []}
          onChange={handleChangeAutoCompleteMultiple}
          options={options}
          getOptionLabel={(option) => option.text}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip label={option.text} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={
                formWidget?.[formId]?.[id].length > 0
                  ? "Seleccione"
                  : placeholder
              }
            />
          )}
          disabled={disabled}
        />
      ) : (
        // Autocomplete && !multiple
        <Autocomplete
          id={`${formId}-chip-${id}`}
          value={formWidget?.[formId]?.[id] ? formWidget[formId][id] : []}
          onChange={handleChangeAutoComplete}
          options={options}
          getOptionLabel={(option) => (option?.text ? option.text : "")}
          renderInput={(params) => (
            <TextField {...params} placeholder={placeholder} />
          )}
          disabled={disabled}
        />
      )}
    </>
  );
};

export default SelectChipWidget;
