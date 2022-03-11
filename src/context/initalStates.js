import { useLocation } from "react-router-dom";

export const getTerminal = () => {
  let { search } = useLocation();
  const terminalParam = new URLSearchParams(search).get("terminal");
  console.log("terminalParam", terminalParam);
};

export const getStorageData = () => {
  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;
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
