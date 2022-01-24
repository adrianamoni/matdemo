import React, { useContext } from "react";

import { languageContext } from "../context/ContextProvider";
import { languageOptions } from ".";

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
    <select onChange={handleLanguageChange} value={language.language.id}>
      {languageOptions.map((item) => (
        <option key={item.id} value={item.id}>
          {item.text}
        </option>
      ))}
    </select>
  );
}
