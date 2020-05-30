import React, { useEffect, useState } from "react";
import api from "./../../services/api";
import { Container, Button, AppBar } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import Title from "./../../components/Title";

const EventsPage = () => {
  const [eventos, setEventos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get("/evento/disponivel").then((res) => {
      setEventos(res.data);
    });
  }, []);

  const handleClickEvento = (evento) => {
    history.push(`/culto/${evento.id}`);
  };

  const styles = {
    card: {
      marginTop: "10px"
    },
    container: {
      marginTop: "100px"
    }
  };
  return (
    <div>
      <AppBar style={{ padding: " 20px 15px" }}>
        <Typography variant="h6">Selecione o Culto</Typography>
      </AppBar>
      <div style={styles.container}>
        {eventos.map((evento, i) => (
          <Card
            onClick={() => handleClickEvento(evento)}
            key={i}
            style={styles.card}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {evento.nome}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
