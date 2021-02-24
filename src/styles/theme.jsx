import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#202428",
      light: "#474c50",
      dark: "#000000",
      contrastText: "#a7b3bd",
    },
    secondary: {
      main: "#eeeeee",
      light: "#ffffff",
      dark: "#bcbcbc",
      contrastText: "#5c677d",
    },
  },
  typography: {
    fontSize: 16,
  },
  overrides: {
    MuiInputBase: {
      input: {
        width: "100%",
      },
    },
    MuiInput: {
      root: {
        width: "100%",
      },
    },
    //   MuiPaper: {
    //     padding: '3rem 0',
    //   },
  },
});

export default theme;
