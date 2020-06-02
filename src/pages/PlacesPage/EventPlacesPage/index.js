import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import VideocamIcon from "@material-ui/icons/Videocam";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

import BoxLegend from "./../../../components/BoxLegend";

import api from "./../../../services/api";
import layouts from "./layouts";

const MAX_SELECTED_PLACES = 4;
const GREEN_COLOR = "#00796b";
const styles = {
  box: {
    backgroundColor: "#fff",
    margin: "1px",
    padding: "6px",
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
    padding: "2px 2%"
  },
  place_positions: {},
  flex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "10px"
  }
};

const BoxLugar = ({ lugar, onSelectPlace, onDismarkPlace }) => {
  return (
    <div
      key={lugar.number}
      onClick={() =>
        lugar.status === "D"
          ? lugar.selecionado
            ? onDismarkPlace(lugar)
            : onSelectPlace(lugar)
          : console.log("=)")
      }
      style={{
        ...styles.box,
        ...{
          backgroundColor:
            lugar.status === "D"
              ? lugar.selecionado
                ? "#27ae60"
                : GREEN_COLOR
              : lugar.status === "R" && "#7f8c8d"
        }
      }}
    >
      {lugar.number}
    </div>
  );
};

const Vazio = (props) => {
  return <div style={{ width: "8px" }}></div>;
};

const Camera = (props) => {
  return (
    <div>
      <VideocamIcon />
    </div>
  );
};

const Porta = (props) => (
  <div>
    <MeetingRoomIcon />
  </div>
);

const LugarWrapper = ({ tipoLugar, lugar, onSelectPlace }) => {
  switch (tipoLugar) {
    case 0:
      return <Vazio />;
    case 1:
      return (
        <BoxLugar
          lugar={{ posicao: 1, status: "D" }}
          onSelect={(tipoLugar) => onSelectPlace(tipoLugar)}
        />
      );
    case 2:
      return <Camera />;
    case 3:
      return <Porta />;
    default:
      return <></>;
  }
};

const EventPlacesPage = (props) => {
  const [lugares, setLugares] = useState([]);
  const [layoutSelecionado, setLayoutSelecionado] = useState([]);
  const [lugaresSelecionados, setLugaresSelecionados] = useState([]);
  const params = useParams();

  useEffect(() => {
    api.get(`/lugar/evento/${params.id}`).then((res) => {
      const tipoEvento = res.data.evento.tipo;
      let layout = layouts[tipoEvento];
      const resLugares = res.data.lugares;
      const lugaresTemp = resLugares;

      layout = layout.map((linha) => {
        return linha.map((coluna) => {
          const result = lugaresTemp.filter(
            (l) => coluna && parseInt(l.posicao) === coluna.number
          );
          return { ...coluna, ...result[0] };
        });
      });
      console.log(layout);
      setLugares(resLugares);
      setLayoutSelecionado(layout);
    });
  }, [params.id]);

  /*useEffect(() => {
    console.log(layoutSelecionado);
  }, [layoutSelecionado]);*/

  const handleSelectPlace = (linha, coluna) => {
    if (lugaresSelecionados.length + 1 > MAX_SELECTED_PLACES) {
      alert(
        "Você não pode selecionar mais de " + MAX_SELECTED_PLACES + " lugares"
      );
    } else {
      const novoLayout = [...layoutSelecionado];
      const item = novoLayout[linha][coluna];
      novoLayout[linha][coluna].selecionado = true;

      let novoSelecionados = [...lugaresSelecionados];
      novoSelecionados.push(item);
      console.log(novoSelecionados);

      setLayoutSelecionado(novoLayout);
      setLugaresSelecionados(novoSelecionados);
    }
  };

  const handleDismarkPlace = (linha, coluna) => {
    const novoLayout = [...layoutSelecionado];
    const item = novoLayout[linha][coluna];
    novoLayout[linha][coluna].selecionado = false;

    console.log("lugares", lugaresSelecionados);
    console.log("item", item);
    const novoSelecionados = [...lugaresSelecionados].filter(
      (lugar) => lugar.number !== item.number
    );
    console.log("filtrado", novoSelecionados);
    setLayoutSelecionado(novoLayout);
    setLugaresSelecionados(novoSelecionados);
  };

  const handleSubmit = () => {
    const selecionados = lugaresSelecionados;
    if (selecionados.length === 0) {
      alert("Selecione pelo menos um lugar");
    } else {
      props.onSubmit(selecionados);
    }
  };

  return (
    <div>
      <div style={styles.container}>
        <BoxLegend />
        <div className="places_div" style={styles.place}>
          <div style={styles.palco}>
            <Typography variant="h6">Palco</Typography>
          </div>

          <div style={styles.place_positions}>
            <table cellSpacing="0" cellPadding="0" style={{ width: "100%" }}>
              <tbody>
                {layoutSelecionado.map((linha, i) => (
                  <tr key={i}>
                    {linha.map((lugar, j) => {
                      return (
                        <td key={j}>
                          {lugar ? (
                            <BoxLugar
                              lugar={lugar}
                              onSelectPlace={() => handleSelectPlace(i, j)}
                              onDismarkPlace={() => handleDismarkPlace(i, j)}
                            />
                          ) : (
                            <div style={{ width: "5px" }}></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
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
