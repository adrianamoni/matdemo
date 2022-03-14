import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, green, orange, purple } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: ["Roboto", "Ubuntu", "sans-serif"].join(","),
  },
  status: {
    danger: orange[500],
  },
});

theme = responsiveFontSizes(theme);
export { theme };
