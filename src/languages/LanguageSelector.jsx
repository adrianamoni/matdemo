import React, { useState, useContext } from "react";

import { languageContext } from "../context/ContextProvider";
import { languageOptions } from ".";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Text from "./Text";
// import { languageOptions } from "../languages";

export default function LanguageSelector() {
  const language = useContext(languageContext);

  const handleLanguageChange = (event) => {
    const selectedLanguage = languageOptions.find(
      (item) => item.id === event.target.value
    );
    // set selected language by calling context method
    language.setLanguage(selectedLanguage);
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel sx={{ color: "#fff" }} id="demo-simple-select-standard-label">
        <Text tid={"language"} />
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={language.language.id}
        onChange={handleLanguageChange}
        label="TEST"
        sx={{ color: "#fff", fontSize: "11px" }}
      >
        {languageOptions.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
