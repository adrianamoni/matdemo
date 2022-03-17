import React, { useState, useEffect, useMemo } from "react";
import { createBrowserHistory } from "history";
import { languageOptions, dictionaryList } from "../languages";
import {
  getColorFromStorage,
  getStorageData,
  getLoginStorageData,
  getStorageLineUsers,
} from "./initalStates";

const history = createBrowserHistory();
const historyContext = React.createContext(history);
const colorModeContext = React.createContext();
const loginContext = React.createContext();
const pageSizeContext = React.createContext();
const selectedRowsIdsContext = React.createContext();
const selectedRowsContext = React.createContext();
const lineUsersContext = React.createContext([]);
const formContext = React.createContext();
const navigationDataContext = React.createContext();
const globalDataContext = React.createContext({});
/**Multilanguage Stuff */
const languageContext = React.createContext({
  language: languageOptions[0],
  dictionary: dictionaryList[languageOptions[0].id],
});
/**End Multilanguage */

const ContextProvider = (props) => {
  const userData = getLoginStorageData();
  const [loggedUser, setLoggedUser] = useState(userData);
  /**page size setup*/
  const [pageSize, setPageSize] = useState({
    width: undefined,
    height: undefined,
  });
  /**selected table row setup*/
  const [selectedRowsIds, setSelectedRowsIds] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const storageLineUsers = getStorageLineUsers();
  const [lineUsers, setLineUsers] = useState(storageLineUsers);
  /**form widget setup*/
  const [formWidget, setformWidget] = useState({});
  const colorModeStorage = getColorFromStorage();
  const [colorMode, setColorMode] = useState(colorModeStorage);
  const [navigationData, setNavigationData] = useState({
    activeTab: 0,
  });
  const storageData = getStorageData();
  const [globalData, setGlobalData] = useState({
    lineData: storageData.lineData || undefined,
    orderData: storageData.orderData || undefined,
    oeeSpecs: storageData.oeeSpecs || undefined,
    terminal: undefined,
    extras: undefined,
    orderDetails: undefined,
    pendingSamples: { alert: undefined, data: undefined },
    pendingInterruptions: { alert: undefined, data: undefined },
    activeTab: undefined,
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
          <loginContext.Provider value={{ loggedUser, setLoggedUser }}>
            <pageSizeContext.Provider value={{ pageSize, setPageSize }}>
              <selectedRowsIdsContext.Provider
                value={{ selectedRowsIds, setSelectedRowsIds }}
              >
                <selectedRowsContext.Provider
                  value={{ selectedRows, setSelectedRows }}
                >
                  <lineUsersContext.Provider
                    value={{ lineUsers, setLineUsers }}
                  >
                    <formContext.Provider value={{ formWidget, setformWidget }}>
                      <navigationDataContext.Provider
                        value={{ navigationData, setNavigationData }}
                      >
                        <globalDataContext.Provider
                          value={{
                            globalData,
                            setGlobalData,
                          }}
                        >
                          {props.children}
                        </globalDataContext.Provider>
                      </navigationDataContext.Provider>
                    </formContext.Provider>
                  </lineUsersContext.Provider>
                </selectedRowsContext.Provider>
              </selectedRowsIdsContext.Provider>
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
  selectedRowsIdsContext,
  selectedRowsContext,
  formContext,
  lineUsersContext,
  navigationDataContext,
  globalDataContext,
};
