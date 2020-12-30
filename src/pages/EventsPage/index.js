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

import { formatDateTime } from '../../services/utils';

import { TIPO_EVENTO, COLOR_DEPT } from './../../config/constants';

const activated = false;

const EventsPage = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deptsEventos, setDeptsEventos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    api.get('/evento/disponivel').then((res) => {
      setEventos(
        res.data.filter((evento) => evento.tipoEvento === TIPO_EVENTO.FAMILIA)
      );
      setDeptsEventos(
        res.data.filter((evento) => evento.tipoEvento !== TIPO_EVENTO.FAMILIA)
      );
      setLoading(false);
    });
  }, []);

  const handleClickEvento = (evento) => {
    history.push(`/culto/${evento.id}`);
  };
  const handleClickDeptEvento = (evento) => {
    history.push(`/dept/${evento.id}`);
  };

  const styles = {
    card: {
      marginTop: '10px',
      borderTop: '4px solid #2555a8',
      width: '100%',
      marginRight: '10px',
    },
    cardDept: {
      marginTop: '10px',
      borderTop: '4px solid #f39c12',
      width: '100%',
      marginRight: '10px',
    },
    container: {
      marginTop: '100px',
    },
  };
  return (
    <div>
      <AppBar style={{ padding: ' 20px 15px' }}>
        <Typography variant="h6">
          Meu Lugar IBCL - Cultos Disponíveis
        </Typography>
      </AppBar>

      <div style={{ marginTop: '100px' }}>
        {activated && <Typography variant="h4">Cultos Familiares</Typography>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {activated ? (
          !loading ? (
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
                      <Typography gutterBottom variant="subtitle1">
                        {formatDateTime(evento.data_evento)}
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
              <Typography variant="h4">
                Aguarde enquanto os eventos são carregados.
              </Typography>
            </div>
          )
        ) : (
          <div>
            <Typography variant="h5" style={{textAlign: "center"}}>
              Devido as últimas notícias sobre a expansão do vírus covid-19 e
              para segurança de todos os membros da igreja e visitante, manteremos nossas
              atividades online até o dia 10/01/2021. Para acompanhar os cultos, acesse nosso canal no Youtube<br/>
              <a href="https://www.youtube.com/user/videosibcl" target="_blank">
              Igreja Batista Central Leste - Manaus
              </a>.
            </Typography>
          </div>
        )}
      </div>
      <div style={{ marginTop: '30px' }} />
      {deptsEventos.length > 0 && (
        <Typography variant="h4">Departamentos</Typography>
      )}
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {deptsEventos.map((evento, i) => (
          <Card
            onClick={() => handleClickDeptEvento(evento)}
            key={i}
            style={{
              ...styles.cardDept,
              borderTop: `4px solid ${COLOR_DEPT[evento.tipoEvento]}`,
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {evento.nome}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  {formatDateTime(evento.data_evento)}
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
