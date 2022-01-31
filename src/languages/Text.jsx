import React, { useContext } from "react";
import { languageContext } from "../context/ContextProvider";

const Text = ({ tid }) => {
  const globalDictionary = useContext(languageContext);
  const result = globalDictionary.dictionary[tid];
  if (result) {
    return result;
  } else {
    console.log(`${tid} is not a valid string on dictionary`);
    return "-";
  }
};

export default Text;
