import { createMuiTheme } from "@material-ui/core/styles";
import { blue, indigo, blueGrey, lightGreen } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#8eacbb",
      // main: "#607d8b",
      main: "#222F3E",
      dark: "#34515e",
      contrastText: "#fff",
    },
    secondary: {
      light: "#e7ff8c",
      main: "#F2B705",
      dark: "#2196f3",
      contrastText: "#000",
    },
    blue: {
      main: "#2196f3",
    },
    openTitle: blueGrey["400"],
    protectedTitle: indigo["800"],
    type: "light",
  },
});

export default theme;
