import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { userPreferencesContext } from "../context/ContextProvider";
const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;
const ToggleDarkMode = () => {
  const { userPreferences, setUserPreferences } = useContext(
    userPreferencesContext
  );
  const { colorMode } = userPreferences;

  const handleToggle = () => {
    localStorage.setItem(
      `ColorMode_${PROJECT_NAME}`,
      colorMode === "dark" ? "light" : "dark"
    );
    setUserPreferences({
      ...userPreferences,
      colorMode: colorMode === "dark" ? "light" : "dark",
    });
  };

  return (
    <Box
      sx={{
        color: "text.primary",
      }}
    >
      <IconButton sx={{ ml: 1 }} onClick={handleToggle}>
        {colorMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default ToggleDarkMode;
