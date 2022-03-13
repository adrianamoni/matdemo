import React, { useState, useEffect, useMemo } from "react";
import { createBrowserHistory } from "history";
import { languageOptions, dictionaryList } from "../languages";
import {
  getColorFromStorage,
  getLoginStorageData,
  getStorageData,
} from "./initalStates";

const history = createBrowserHistory();
const historyContext = React.createContext(history);
const colorModeContext = React.createContext();
const loginContext = React.createContext();
const pageSizeContext = React.createContext();
const formContext = React.createContext();
const globalDataContext = React.createContext({});
/**Multilanguage Stuff */
const languageContext = React.createContext({
  language: languageOptions[0],
  dictionary: dictionaryList[languageOptions[0].id],
});
/**End Multilanguage */

const ContextProvider = (props) => {
  const userStorageData = getLoginStorageData();
  const [loginUser, setLoginUser] = useState({
    userName: "",
    isLogged: false,
    isAdmin: false,
    permissions: [],
  });
  /**page size setup*/
  const [pageSize, setPageSize] = useState({
    width: undefined,
    height: undefined,
  });
  /**form widget setup*/
  const [formWidget, setformWidget] = useState({});
  const colorModeStorage = getColorFromStorage();
  const [colorMode, setColorMode] = useState(colorModeStorage);
  const storageData = getStorageData();
  const [globalData, setGlobalData] = useState({
    lineData: storageData.lineData || undefined,
    orderData: storageData.orderData || undefined,
    oeeSpecs: storageData.oeeSpecs || undefined,
    terminal: undefined,
    extras: undefined,
    orderDetails: undefined,
  });
  /**MultiLanguage Setup */
  const [language, setLanguage] = useState(languageOptions[0]);
  const [dictionary, setDictionary] = useState(
    dictionaryList[languageOptions[0].id]
  );
  const provider = {
    language,
    dictionary,
    setLanguage: (selectedLanguage) => {
      setLanguage(selectedLanguage);
      setDictionary(dictionaryList[selectedLanguage.id]);
    },
  };
  /**End multilanguage */
  useEffect(() => {
    console.log("dictionary changed");
  }, [dictionary]);
  return (
    <>
      <colorModeContext.Provider value={{ colorMode, setColorMode }}>
        <languageContext.Provider value={provider}>
          <loginContext.Provider value={{ loginUser, setLoginUser }}>
            <pageSizeContext.Provider value={{ pageSize, setPageSize }}>
              <formContext.Provider value={{ formWidget, setformWidget }}>
                <globalDataContext.Provider
                  value={{
                    globalData,
                    setGlobalData,
                  }}
                >
                  {props.children}
                </globalDataContext.Provider>
              </formContext.Provider>
            </pageSizeContext.Provider>
          </loginContext.Provider>
        </languageContext.Provider>
      </colorModeContext.Provider>
    </>
  );
};

export {
  ContextProvider,
  colorModeContext,
  languageContext,
  loginContext,
  pageSizeContext,
  formContext,
  globalDataContext,
};
