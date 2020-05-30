import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Footer from "./components/Footer";
import Routes from "./routes";

import "./App.css";
const styles = {
  flex: { display: "flex", flexDirection: "column" },
  footer: { marginTop: "auto" }
};
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
        <div style={styles.flex}>
          <Container style={{ marginBottom: "20px", maxWidth: "600px" }}>
            <Routes />
          </Container>
          <Footer style={styles.footer} />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
