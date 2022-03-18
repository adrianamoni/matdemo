import { useLocation } from "react-router-dom";
import { languageOptions } from "../languages";
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
  let userId, isLogged, permissions, sessionId;

  if (sessionStorage.getItem(`UserInfo_${PROJECT_NAME}`)) {
    userData = JSON.parse(sessionStorage.getItem(`UserInfo_${PROJECT_NAME}`));
    userId = userData.userId;
    isLogged = true;
    sessionId = userData.sessionId;
    permissions = userData.permissions;
  } else {
    userId = "";
    isLogged = false;
    sessionId = undefined;
    permissions = [];
  }

  return { userId, isLogged, sessionId, permissions };
};

export const getPreferencesFromStorage = () => {
  let colorMode = "light";

  if (localStorage.getItem(`ColorMode_${PROJECT_NAME}`)) {
    colorMode = localStorage.getItem(`ColorMode_${PROJECT_NAME}`);
  }

  return { colorMode };
};

export const getStorageLineUsers = () => {
  let users;

  if (localStorage.getItem(`AssignedUsers_${PROJECT_NAME}`)) {
    users = JSON.parse(localStorage.getItem(`AssignedUsers_${PROJECT_NAME}`));
  } else {
    users = [];
  }

  return users;
};

export const getLanguageFromStorage = () => {
  let language;

  if (localStorage.getItem(`Language_${PROJECT_NAME}`)) {
    language = JSON.parse(localStorage.getItem(`Language_${PROJECT_NAME}`));
  } else {
    language = languageOptions[0];
  }

  return language;
};
