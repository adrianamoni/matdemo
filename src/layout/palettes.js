const palettes = (isDark) => {
  return {
    ["green-orange"]: {
      primary: {
        main: isDark ? "#52c7b8" : "#009688",
        contrastText: isDark ? "#000" : "#fff",
        text: isDark ? "#000" : "#fff",
      },
      secondary: {
        main: isDark ? "#ffbb93" : "#ff8a65",
        contrastText: isDark ? "#000" : "#fff",
        text: isDark ? "#000" : "#fff",
      },
    },
    ["darkblue-lightblue"]: {
      primary: {
        main: isDark ? "#5e92f3" : "#1565c0",
        contrastText: isDark ? "#000" : "#fff",
        text: isDark ? "#000" : "#fff",
      },
      secondary: {
        main: isDark ? "#9be7ff" : "#64b5f6",
        contrastText: isDark ? "#000" : "#fff",
        text: isDark ? "#000" : "#fff",
      },
    },
    ["pink-purple"]: {
      primary: {
        main: isDark ? "#bc477b" : "#880e4f",
        contrastText: isDark ? "#000" : "#fff",
        text: isDark ? "#000" : "#fff",
      },
      secondary: {
        main: isDark ? "#8e99f3" : "#5c6bc0",
        contrastText: isDark ? "#000" : "#fff",
        text: isDark ? "#000" : "#fff",
      },
    },
    ["purple-green"]: {
      primary: {
        main: isDark ? "#7953d2" : "#4527a0",
        contrastText: isDark ? "#000" : "#fff",
        text: isDark ? "#000" : "#fff",
      },
      secondary: {
        main: isDark ? "#80cbc4" : "#4f9a94",
        contrastText: isDark ? "#000" : "#fff",
        text: isDark ? "#000" : "#fff",
      },
    },
  };
};

export const getPalette = (palette, colorMode) => {
  return palettes(colorMode === "dark")[palette];
};