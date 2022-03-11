import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { globalDataContext } from "../context/ContextProvider";

function Init() {
  const navigateTo = useNavigate();
  const { globalData, setGlobalData } = useContext(globalDataContext);
  let { search } = useLocation();
  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;

  useEffect(() => {
    const terminalParam = new URLSearchParams(search).get("terminal");
    const extrasParam = new URLSearchParams(search).get("extras");

    if (terminalParam) {
      localStorage.setItem(`Terminal_${PROJECT_NAME}`, terminalParam);
      setGlobalData({ ...globalData, terminal: terminalParam });
    } else {
      localStorage.removeItem(`Terminal_${PROJECT_NAME}`);
      if (localStorage.getItem(`Terminal_${PROJECT_NAME}`)) {
        setGlobalData({
          ...globalData,
          terminal: localStorage.getItem(`Terminal_${PROJECT_NAME}`),
        });
      }
    }

    if (extrasParam) {
      const params = extrasParam.split("-");
      localStorage.setItem(`Extras_${PROJECT_NAME}`, JSON.stringify(params));
      setExtrasConfig({ ...globalData, extras: params });
    } else {
      localStorage.removeItem(`Extras_${PROJECT_NAME}`);
      if (localStorage.getItem(`Extras_${PROJECT_NAME}`)) {
        setGlobalData({
          ...globalData,
          extras: localStorage.getItem(`Extras_${PROJECT_NAME}`),
        });
      }
    }
    navigateTo("/dashboard");
    //eslint-disable-next-line
  }, []);

  return <div>No se ha asignado ningún terminal</div>;
}

export default Init;
