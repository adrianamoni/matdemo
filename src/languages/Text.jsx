import React, { useContext } from "react";
import { languageContext } from "../context/ContextProvider";

const Text = ({ tid }) => {
  const globalDictionary = useContext(languageContext);
  return globalDictionary.dictionary[tid];
};

export default Text;
