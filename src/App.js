import React from "react";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Routes from "./routes";

import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#48a999",
      main: "#00796b",
      dark: "#004c40",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ffff5a",
      main: "#ffff00",
      dark: "#c7cc00",
      contrastText: "#000"
    }
  }
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
          <Routes />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
