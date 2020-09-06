import React, { useEffect, useState } from 'react';
import { AppBar, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ReactLoading from 'react-loading';

import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import { TIPO_EVENTO } from './../../config/constants';

const EventsPage = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [kidsEventos, setKidsEventos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    api.get('/evento/disponivel').then((res) => {
      setEventos(
        res.data.filter((evento) => evento.tipo === TIPO_EVENTO.FAMILIA)
      );
      setKidsEventos(
        res.data.filter((evento) => evento.tipo === TIPO_EVENTO.KIDS)
      );
      setLoading(false);
    });
  }, []);

  const handleClickEvento = (evento) => {
    history.push(`/culto/${evento.id}`);
  };
  const handleClickKidsEvento = (evento) => {
    history.push(`/kids/${evento.id}`);
  };

  const styles = {
    card: {
      marginTop: '10px',
      borderTop: '4px solid #2555a8',
    },
    cardKid: {
      marginTop: '10px',
      borderTop: '4px solid #f39c12',
    },
    container: {
      marginTop: '100px',
    },
  };
  return (
    <div>
      <AppBar style={{ padding: ' 20px 15px' }}>
        <Typography variant="h6">Meu Lugar IBCL</Typography>
      </AppBar>
      <div style={styles.container}>
        <Typography variant="h4">Cultos Disponíveis</Typography>
        <Typography variant="h6">
          Selecione em um culto para reservar seu lugar
        </Typography>
        {!loading ? (
          eventos.length > 0 ? (
            eventos.map((evento, i) => (
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
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClickEvento(evento)}
                  >
                    Reservar Lugar
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Box>
              <Typography variant="h4">
                Os cultos são liberados ao final do culto da noite.
              </Typography>
            </Box>
          )
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <ReactLoading
              type="bubbles"
              color="#00796b"
              height="40%"
              width="40%"
            />
            <Typography variant="h4">Aguarde enquanto os eventos são carregados.</Typography>
          </div>
        )}
      </div>
      <div style={styles.container}>
        {kidsEventos.length > 0 && (
          <Typography variant="h4">Salinha dos Kids</Typography>
        )}
        {kidsEventos.map((evento, i) => (
          <Card
            onClick={() => handleClickKidsEvento(evento)}
            key={i}
            style={styles.cardKid}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {evento.nome}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClickEvento(evento)}
              >
                Reservar Lugar
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
