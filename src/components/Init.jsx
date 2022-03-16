import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { globalDataContext } from "../context/ContextProvider";

function Init() {
  const navigateTo = useNavigate();
  const { globalData, setGlobalData } = useContext(globalDataContext);
  let { search } = useLocation();
  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;

  useEffect(() => {
    let terminalParam = new URLSearchParams(search).get("terminal");
    let extrasParam = new URLSearchParams(search).get("extras");
    let extrasParams;
    if (terminalParam) {
      localStorage.setItem(`Terminal_${PROJECT_NAME}`, terminalParam);
    } else {
      localStorage.removeItem(`Terminal_${PROJECT_NAME}`);
      /* if (localStorage.getItem(`Terminal_${PROJECT_NAME}`)) {
        setGlobalData({
          ...globalData,
          terminal: localStorage.getItem(`Terminal_${PROJECT_NAME}`),
        });
      } */
    }

    if (extrasParam) {
      let extrasParams = extrasParam.split("-");
      localStorage.setItem(
        `Extras_${PROJECT_NAME}`,
        JSON.stringify(extrasParams)
      );
    } else {
      localStorage.removeItem(`Extras_${PROJECT_NAME}`);
      /* if (localStorage.getItem(`Extras_${PROJECT_NAME}`)) {
        setGlobalData({
          ...globalData,
          extras: localStorage.getItem(`Extras_${PROJECT_NAME}`),
        });
      } */
    }
    setGlobalData({
      ...globalData,
      terminal: terminalParam,
      extras: extrasParams,
    });
    navigateTo("/");
    //eslint-disable-next-line
  }, []);

  return <div>No se ha asignado ningún terminal</div>;
}

export default Init;
