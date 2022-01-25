import React, { useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { languageOptions, dictionaryList } from "../languages";

const history = createBrowserHistory();

const historyContext = React.createContext(history);
const loginContext = React.createContext({ username: "" });
const pageSizeContext = React.createContext();

/**Multilanguage Stuff */
const languageContext = React.createContext({
  language: languageOptions[0],
  dictionary: dictionaryList[languageOptions[0].id],
});
/**End Multilanguage */

const ContextProvider = (props) => {
  const [loginUser, setLoginUser] = useState({
    username: "",
  });
  /**page size setup*/
  const [pageSize, setPageSize] = useState({
    width: undefined,
    height: undefined,
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
      <languageContext.Provider value={provider}>
        <loginContext.Provider value={{ loginUser, setLoginUser }}>
          <pageSizeContext.Provider value={{ pageSize, setPageSize }}>
            {props.children}
          </pageSizeContext.Provider>
        </loginContext.Provider>
      </languageContext.Provider>
    </>
  );
};

export { ContextProvider, languageContext, loginContext, pageSizeContext };
