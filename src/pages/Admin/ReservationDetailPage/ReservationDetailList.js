import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import CallIcon from "@material-ui/icons/Call";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import { useHistory, useParams } from "react-router-dom";
import api from "./../../../services/api";

const styles = {
  card: {
    marginTop: "10px"
  },
  container: {
    marginTop: "0px"
  },
  chip: {
    margin: "5px"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  }
};
const ReservationDetailList = (props) => {
  const history = useHistory();
  const params = useParams();
  const [pessoas, setPessoas] = useState([]);
  const [pessoasFiltradas, setPessoasFiltradas] = useState([]);
  const [evento, setEvento] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    api.get(`/evento/detalhes/${params.id}`).then((res) => {
      setPessoas(res.data.pessoas);
      setEvento(res.data.evento);
    });
    return () => {
      setPessoas([]);
    };
  }, [params.id]);

  const handleClickBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const filtro = pessoas.filter((pessoa) =>
      pessoa.nome.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setPessoasFiltradas(filtro);
  }, [pessoas, searchFilter]);

  return (
    <div>
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
              )
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
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: "10px" }}>
                    Contato: {data.telefone}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href={`tel:${data.telefone}`}
                  >
                    <CallIcon /> Ligar
                  </Button>
                </div>
                <hr />
                <div>
                  <Typography variant="h6">
                    {data.lugar.length} Reserva
                    {data.lugar.length > 1 && "s"}:
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
