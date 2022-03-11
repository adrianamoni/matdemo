export const propsByState = ({ prodState, cleanState }) => {
  switch (prodState) {
    case 0:
      return {
        state: "Unknown",
        color: "#bfbfbf",
        background: "#ff5e69",
        light: "#f7cad3",
        dark: "#000000",
      };
    case 1:
      return {
        state: "New",
        color: "#b6f0f0",
        background: "#70f5e5",
        light: "#caf7f2",
        dark: "#154f4f",
      };
    case 2:
      return {
        state: "Ready",
        color: "#ebf0b6",
        background: "#f5cb70",
        light: "#f7e9ca",
        dark: "#4a4f13",
      };
    case 3:
      return {
        state: "Running",
        color: "#baf0b6",
        background: "#70f5a7",
        light: "#caf7dd",
        dark: "#183b16",
      };
    case 4:
      if (cleanState === 2 || cleanState === 3) {
        return {
          state: "Limpieza no completada",
          color: "#baf0b6",
          background: "#70f5a7",
          light: "#caf7dd",
          dark: "#183b16",
        };
      } else {
        return {
          state: "Complete",
          color: "#b6b8f0",
          background: "#6ebff5",
          light: "#cae5f7",
          dark: "#16183b",
        };
      }

    case 5:
      return {
        state: "Suspended",
        color: "#f0b6bd",
        background: "#ff5e69",
        light: "#f7cad3",
        dark: "#3d181d",
      };
    case 6:
      return {
        state: "Onhold",
        color: "#f0b6bd",
        background: "#ff5e69",
        light: "#f7cad3",
        dark: "#3d181d",
      };
    case 7:
      return {
        state: "Canceled",
        color: "#f0b6bd",
        background: "#b83007",
        light: "#f08878",
        dark: "#3d181d",
      };
    case 8:
      return {
        state: "Bypassed",
        color: "#C1C1C1",
        background: "#d6d6d6",
        light: "#F4F4F4",
        dark: "#000000",
      };
    case 9:
      return {
        state: "Superseded",
        color: "#f0b6bd",
        background: "#f5708b",
        light: "#f7cad3",
        dark: "#3d181d",
      };
    default:
      return {
        state: "Unknown",
        color: "#C1C1C1",
        background: "#d6d6d6",
        light: "#F4F4F4",
        dark: "#000000",
      };
  }
};

export const colorByValue = ({ value, targetOee, yellowThreshold }) => {
  const GREEN = targetOee;
  const YELLOW = (targetOee * yellowThreshold) / 100;
  const RED = targetOee - YELLOW;
  if (!targetOee || !yellowThreshold) {
    return "gray";
  } else {
    if (value < RED) {
      return "red";
    } else if (value < GREEN) {
      return "yellow";
    } else {
      return "green";
    }
  }
};
