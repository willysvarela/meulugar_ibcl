import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { useHistory } from "react-router-dom";
import api from "./../../../services/api";

const styles = {
  card: {
    marginTop: "10px"
  },
  container: {
    marginTop: "100px"
  }
};

const ReservationPage = (props) => {
  const [eventos, setEventos] = useState([]);
  const history = useHistory();
  useEffect(() => {
    api.get("/evento/disponivel").then((res) => {
      setEventos(res.data);
    });
    return () => {
      setEventos([]);
    };
  }, []);

  const handleClickEvent = (evento) => {
    history.push(`reservas/${evento.id}`);
  };

  return (
    <div>
      <AppBar style={{ padding: " 20px 15px" }}>
        <Typography variant="h6">IBCL Meu Lugar - ADM</Typography>
      </AppBar>
      <div style={styles.container}>
        <List component="nav" aria-label="main mailbox folders">
          {eventos.map((evento) => (
            <ListItem button onClick={() => handleClickEvent(evento)}>
              <ListItemText primary={evento.nome} />
              <ListItemText secondary={evento.data} />
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

ReservationPage.propTypes = {};

export default ReservationPage;
