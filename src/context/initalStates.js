import { useLocation } from "react-router-dom";
const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;

export const getTerminal = () => {
  let { search } = useLocation();
  const terminalParam = new URLSearchParams(search).get("terminal");
  console.log("terminalParam", terminalParam);
};

export const getStorageData = () => {
  let lineData, orderData, oeeSpecs;

  if (localStorage.getItem(`LineData_${PROJECT_NAME}`)) {
    lineData = JSON.parse(localStorage.getItem(`LineData_${PROJECT_NAME}`));
  }

  if (localStorage.getItem(`OrderData_${PROJECT_NAME}`)) {
    orderData = JSON.parse(localStorage.getItem(`OrderData_${PROJECT_NAME}`));
  }

  if (localStorage.getItem(`OeeSpecs_${PROJECT_NAME}`)) {
    oeeSpecs = JSON.parse(localStorage.getItem(`OeeSpecs_${PROJECT_NAME}`));
  }

  return { lineData, orderData, oeeSpecs };
};

export const getLoginStorageData = () => {
  let userData;
  let userName, isLogged, permissions, sessionId;

  if (sessionStorage.getItem(`UserInfo_${PROJECT_NAME}`)) {
    userData = JSON.parse(sessionStorage.getItem(`UserInfo_${PROJECT_NAME}`));
    userName = userData.userName;
    isLogged = true;
    sessionId = userData.sessionId;
    permissions = userData.permissions;
  } else {
    userName = "";
    isLogged = false;
    sessionId = undefined;
    permissions = [];
  }

  return { userName, isLogged, sessionId, permissions };
};

export const getColorFromStorage = () => {
  let colorMode;

  if (localStorage.getItem(`ColorMode_${PROJECT_NAME}`)) {
    colorMode = localStorage.getItem(`ColorMode_${PROJECT_NAME}`);
  } else {
    colorMode = "light";
  }

  return colorMode;
};
