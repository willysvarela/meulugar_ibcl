import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import ReactLoading from "react-loading";
import success_img from "./../../../assets/imgs/sucess.png";
import fail_img from "./../../../assets/imgs/fail.png";
import { Typography } from "@material-ui/core";
import PlaceItem from "./../../../components/PlaceItem";
import Link from "@material-ui/core/Link";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { useParams } from "react-router-dom";
import api from "./../../../services/api";

const styles = {
  paper: {
    textAlign: "center",
    padding: "10px "
  },
  title: {
    padding: "10px 0px",
    background: "#00796b",
    color: "#fff",
    fontSize: "1.2em",
    width: "100%",
    marginBottom: "10px"
  }
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
      return (
        data.getDate() +
        "/" +
        (parseInt(data.getMonth()) + 1) +
        "/" +
        data.getFullYear()
      );
    } catch (e) {
      return "";
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
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <ReactLoading
              type="bubbles"
              color="#00796b"
              height={"40%"}
              width={"40%"}
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
            <p>Não foi possível realizar sua reserva. </p>
            <p>{props.error}</p>
          </div>
        ) : (
          <div>
            <img
              src={success_img}
              width="50"
              alt="sucesso na reserva de cadeiras"
            />
            <Typography variant="h5">
              Parabéns {props.user && props.user.nome}
            </Typography>
            <Typography variant="h6">Suas cadeiras são:</Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {props.lugaresSelecionados.map((lugar) => (
                <PlaceItem key={lugar.id} posicao={lugar.posicao} />
              ))}
            </div>
            <Typography variant="body1">
              Para este culto: {evento && evento.nome}
            </Typography>
            <Typography variant="subtitle">
              Data: {renderDate(evento)}
            </Typography>
          </div>
        )}
        <div style={{ marginTop: "20px" }}>
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
              href={`whatsapp://send?text=Reservei lugares no Culto IBCL: ${
                evento && evento.nome
              }. As cadeiras reservadas foram as: ${props.lugaresSelecionados.map(
                (lugar) => lugar.posicao + " "
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
