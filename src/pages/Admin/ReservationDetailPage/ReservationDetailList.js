import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CallIcon from '@material-ui/icons/Call';
import ClearIcon from '@material-ui/icons/Clear';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import Dialog from "./../../../components/Dialog";

import {getWhatsAppLink} from "./../../../services/utils.js"

import { useParams } from 'react-router-dom';
import api from '../../../services/api';
import {  ButtonGroup } from '@material-ui/core';

const styles = {
  card: {
    marginTop: '10px',
  },
  container: {
    marginTop: '0px',
  },
  chip: {
    margin: '5px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};
const ReservationDetailList = (props) => {
  const params = useParams();
  const [pessoas, setPessoas] = useState([]);
  const [pessoasFiltradas, setPessoasFiltradas] = useState([]);
  const [evento, setEvento] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [pessoaADeletar, setPessoaADeletar] = useState(null);

  useEffect(() => {
    api.get(`/evento/detalhes/${params.id}`).then((res) => {
      setPessoas(res.data.pessoas);
      setEvento(res.data.evento);
    });
    return () => {
      setPessoas([]);
    };
  }, [params.id]);

  useEffect(() => {
    const filtro = pessoas.filter((pessoa) =>
      pessoa.nome.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setPessoasFiltradas(filtro);
  }, [pessoas, searchFilter]);

  const cancelarReserva = (pessoa, id_evento) => {
    api.post("/lugar/cancelar", {id_pessoa: pessoa.id, id_evento: id_evento})
    .then(res => {
      console.log(res);
      setPessoaADeletar(null);
      setPessoas(pessoas.filter(p => p.id !== pessoa.id));
    })
    .catch(err => {
      console.log(err.message);
    });
    console.log(pessoa.id, Number(id_evento));
  }
  const handleCancelar = (pessoa) => {
    setPessoaADeletar(pessoa);
    setOpenDialog(true);
  }

  const handleAccept = () => {
    console.log('deletar', pessoaADeletar, params.id);
    cancelarReserva(pessoaADeletar, params.id);
    setOpenDialog(false);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  return (
    <div>
      <Dialog title="Cancelamento de Reserva" message="Tem certeza que deseja cancelar esta reserva?" active={openDialog} onAccept={handleAccept} onClose={handleCloseDialog}/>
      <div style={styles.container}>
        {evento && (
          <div>
            <Typography variant="h3">Reservas</Typography>
            <Typography variant="h5">{evento.nome}</Typography>
            <Typography variant="h5">{evento.data}</Typography>
          </div>
        )}
        <div>
          <TextField
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          {pessoasFiltradas.map((data) => (
            <Card key={data.id} style={styles.card} raised>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {data.nome}
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: '10px' }}>
                    Contato: {data.telefone}
                  </Typography>
                  <ButtonGroup
                    variant="contained"
                    color="primary">
                    <Button
                      component={Link}
                      href={getWhatsAppLink(data.telefone, 'confirmar', `${evento.nome}. Cadeiras: ${data.lugar.map(lugar => lugar.posicao)}`)}
                    >
                      <WhatsAppIcon /> Mensagem
                    </Button>
                    <Button
                      component={Link}
                      href={`tel:${data.telefone}`}
                    >
                      <CallIcon /> Ligar
                    </Button> 
                    <Button
                      color="secondary"
                      onClick={e => handleCancelar(data)}
                    >
                      <ClearIcon /> Cancelar
                    </Button> 
                  </ButtonGroup>
                </div>
                <hr />
                <div>
                  <Typography variant="h6">
                    {data.lugar.length} Reserva
                    {data.lugar.length > 1 && 's'}:
                  </Typography>
                  <div style={styles.chips}>
                    {data.lugar.map((lugar) => (
                      <Chip
                        style={styles.chip}
                        avatar={<Avatar>{lugar.posicao}</Avatar>}
                        label={lugar.nome_reservado}
                        color="primary"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

ReservationDetailList.propTypes = {};

export default ReservationDetailList;
