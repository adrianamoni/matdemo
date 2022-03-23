import React, { useContext } from "react";

import { languageContext } from "../context/ContextProvider";
import { languageOptions } from ".";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import Text from "./Text";
// import { languageOptions } from "../languages";

export default function LanguageSelector() {
  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;
  const language = useContext(languageContext);

  const handleLanguageChange = (event) => {
    const selectedLanguage = languageOptions.find(
      (item) => item.id === event.target.value
    );
    // set selected language by calling context method
    localStorage.setItem(
      `Language_${PROJECT_NAME}`,
      JSON.stringify(selectedLanguage)
    );
    language.setLanguage(selectedLanguage);
  };

  return (
    <FormControl
      variant="filled"
      fullWidth
      sx={{
        mb: 4,
        backgroundColor: "background.grey4",
        /* minWidth: 120 */
      }}
    >
      <InputLabel
        /* sx={{ color: "#fff" }} */ id="demo-simple-select-standard-label"
      >
        <Text tid={"language"} />
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={language.language.id}
        onChange={handleLanguageChange}
        label="TEST"
      >
        {languageOptions.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            <Typography variant="body1">{item.text}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
