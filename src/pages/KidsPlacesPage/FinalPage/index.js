import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import ReactLoading from 'react-loading';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import success_img from '../../../assets/imgs/sucess.png';
import fail_img from '../../../assets/imgs/fail.png';
import PlaceItem from '../../../components/PlaceItem';

import api from '../../../services/api';

const styles = {
  paper: {
    textAlign: 'center',
    padding: '10px ',
  },
  title: {
    padding: '10px 0px',
    background: '#00796b',
    color: '#fff',
    fontSize: '1.2em',
    width: '100%',
    marginBottom: '10px',
  },
};
const FinalPage = (props) => {
  const [evento, setEvento] = useState(null);
  const params = useParams();

  useEffect(() => {
    api.get(`/evento/${params.id}`).then((res) => {
      setEvento(res.data);
    });
  }, [params.id]);

  const renderDate = (evento) => {
    try {
      const data = new Date(evento.data_evento);
      return `${data.getDate()}/${
        parseInt(data.getMonth()) + 1
      }/${data.getFullYear()}`;
    } catch (e) {
      return '';
    }
  };

  const history = useHistory();
  return (
    <div>
      <Paper style={styles.paper}>
            <div style={styles.title}>
          <span>Reserva Finalizada</span>
          </div>
            {props.status < 3 ? (
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
            <div>Aguarde enquanto os dados são processados.</div>
                </div>
        ) : props.status > 3 ? (
          <div>
                <img
              src={fail_img}
              width="200"
              alt={`falha na reserva de cadeiras porque ${props.error}`}
            />
            <Typography variant="subtitle1">Não foi possível realizar a reserva. Por favor, tente novamente.</Typography>
            <Typography variant="subtitle1">{props.error}</Typography>
            </div>
        ) : (
          <div>
                <img
              src={success_img}
              width="50"
              alt="sucesso na reserva da Salinha KIDS"
            />
            <Typography variant="h5">
                  Parabéns {props.user && props.user.nome}
              </Typography>
                <Typography variant="h6">Reservas feitas para as pessoas:</Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
              {props.names.map((name, i) => (
                        <Typography variant="h6" key={i}>{name} </Typography>
              ))}
            </div>
            <Typography variant="body1">
                  Para o Evento: {evento && evento.nome}
              </Typography>
                <Typography variant="subtitle1">
                Data: {renderDate(evento)}
            </Typography>
            </div>
        )}
            <div style={{ marginTop: '20px' }}>
          <Button
                  disabled={props.status < 3}
                  variant="outlined"
                  color="primary"
                  onClick={() => history.goBack()}
                >
            Voltar
                </Button>
            {props.status === 3 && (
          <Button
              component={Link}
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://api.whatsapp.com/send?text=Reservei lugares para as pessoas no evento: ${
                evento && evento.nome
              }. As crianças são: ${props.names.map(
                (name) => `${name} `
              )} `}
            >
                <WhatsAppIcon /> Compartilhar no WhatsApp
            </Button>
          )}
        </div>
        </Paper>
      </div>
  );
};

export default FinalPage;
