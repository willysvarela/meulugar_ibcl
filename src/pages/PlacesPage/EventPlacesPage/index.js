import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";

import api from "./../../../services/api";

const MAX_SELECTED_PLACES = 4;

const styles = {
  box: {
    width: "15%",
    backgroundColor: "#ccc",
    padding: "10px",
    margin: "2px",
    height: "20px",
    textAlign: "center"
  },
  container: {
    marginTop: "100px"
  },
  place: {
    border: "1px solid #ccc",
    padding: "2px 5px",
    display: "flex",
    flexFlow: "row wrap"
    /*display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    gap: "1px 1px",
    gridTemplateAreas: `". . . . . . . . . . ." 
    ". . . . . . . . . . ." 
    ". . . . . . . . . . ." 
    ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ." ". . . . . . . . . . ."`*/
  }
};

const EventPlacesPage = (props) => {
  const [lugares, setLugares] = useState([]);
  const [lugaresSelecionados, setLugaresSelecionados] = useState([]);
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
        <div className="places_div" style={styles.place}>
          {lugares.map((lugar, i) => (
            <div
              key={lugar.id}
              onClick={() => handleSelectPlace(lugar)}
              style={{
                ...styles.box,
                ...{
                  backgroundColor: lugar.selecionado ? "#ffff00" : "#00796b"
                }
              }}
            >
              {lugar.id}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Button
            color="primary"
            variant="outlined"
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
