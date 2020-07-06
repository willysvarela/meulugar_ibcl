import React, { useEffect, useState } from 'react';
import { AppBar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

const EventsPage = () => {
  const [eventos, setEventos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('/evento/disponivel').then((res) => {
      setEventos(res.data);
    });
  }, []);

  const handleClickEvento = (evento) => {
    history.push(`/culto/${evento.id}`);
  };

  const styles = {
    card: {
      marginTop: '10px',
    },
    container: {
      marginTop: '100px',
    },
  };
  return (
    <div>
      <AppBar style={{ padding: ' 20px 15px' }}>
        <Typography variant="h6">Meu Lugar IBCL - Cultos</Typography>
        </AppBar>
          <div style={styles.container}>
          <Typography variant="h5">Cultos</Typography>
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
