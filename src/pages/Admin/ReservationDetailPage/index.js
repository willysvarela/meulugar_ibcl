import React from "react";
import ReservationDetailList from "./ReservationDetailList";
import SeatMap from "./SeatMap";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const styles = {
  container: {
    marginTop: "120px"
  }
};

const ReservationDetailPage = (props) => {
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar style={{ padding: " 20px 15px" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => history.goBack()}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">IBCL Meu Lugar - ADM</Typography>
        </Toolbar>
      </AppBar>
      <div style={styles.container}>
        <AppBar position="static" variant="fullWidth">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Lista de Reservas" />
            <Tab label="Mapa de Cadeiras" />
          </Tabs>
        </AppBar>
        <div value={value} hidden={value !== 0} index={0}>
          <ReservationDetailList />
        </div>
        <div value={value} hidden={value !== 1} index={1}>
          <SeatMap />
        </div>
      </div>
    </div>
  );
};

ReservationDetailPage.propTypes = {};

export default ReservationDetailPage;
