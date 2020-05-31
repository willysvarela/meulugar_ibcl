import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import api from "./../../../services/api";

const MAX_SELECTED_PLACES = 4;
const GREEN_COLOR = "#00796b";
const styles = {
  box: {
    width: "15%",
    backgroundColor: "#ccc",
    padding: "10px",
    margin: "2px",
    height: "20px",
    textAlign: "center",
    color: "#fff",
    borderRadius: "10px"
  },
  container: {},
  palco: {
    background: GREEN_COLOR,
    width: "80%",
    height: "100px",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    marginBottom: "20px"
  },
  place: {
    border: "1px solid #ccc",
    padding: "2px 5px"
    /*display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    gap: "1px 1px",
    gridTemplateAreas: `". . . . . . . . . . ." 
    ". . . . . . . . . . ." 
    ". . . . . . . . . . ." 
    ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ."`*/
  },
  place_positions: {
    display: "flex",
    flexFlow: "row wrap"
  }
};

const EventPlacesPage = (props) => {
  const [lugares, setLugares] = useState([]);
  const params = useParams();

  useEffect(() => {
    api.get(`/lugar/evento/${params.id}`).then((res) => {
      setLugares(res.data);
    });
  }, [params.id]);

  const handleSelectPlace = (lugar) => {
    const novoLugares = [...lugares];
    const index = novoLugares.indexOf(lugar);
    novoLugares[index] = {
      ...lugar,
      selecionado: lugar.selecionado ? false : true
    };

    const lugaresSelecionados = novoLugares.filter(
      (novoLugar) => novoLugar.selecionado
    );
    if (lugaresSelecionados.length > MAX_SELECTED_PLACES) {
      alert(
        "Você não pode selecionar mais de " + MAX_SELECTED_PLACES + " lugares"
      );
    } else {
      setLugares(novoLugares);
    }
  };

  const handleSubmit = () => {
    const selecionados = lugares.filter((lugar) => lugar.selecionado);
    if (selecionados.length === 0) {
      alert("Selecione pelo menos um lugar");
    } else {
      props.onSubmit(selecionados);
    }
  };

  return (
    <div>
      <div style={styles.container}>
        <Typography variant="subtitle1">Legenda: </Typography>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div style={{ ...styles.box, ...{ backgroundColor: GREEN_COLOR } }}>
            <Typography variant="subtitle">Disponível </Typography>
          </div>
          <div style={{ ...styles.box, ...{ backgroundColor: "#27ae60" } }}>
            <Typography variant="subtitle">Selecionado </Typography>
          </div>
          <div style={{ ...styles.box, ...{ backgroundColor: "#7f8c8d" } }}>
            <Typography variant="subtitle">Reservado </Typography>
          </div>
        </div>
        <div className="places_div" style={styles.place}>
          <div style={styles.palco}>
            <Typography variant="h6">Palco</Typography>
          </div>

          <div style={styles.place_positions}>
            {lugares.map((lugar, i) => (
              <div
                key={lugar.id}
                onClick={() =>
                  lugar.status === "D"
                    ? handleSelectPlace(lugar)
                    : console.log("")
                }
                style={{
                  ...styles.box,
                  ...{
                    backgroundColor:
                      lugar.status === "D"
                        ? lugar.selecionado
                          ? "#27ae60"
                          : GREEN_COLOR
                        : "#7f8c8d"
                  }
                }}
              >
                {lugar.posicao}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleSubmit()}
          >
            Avançar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventPlacesPage;
