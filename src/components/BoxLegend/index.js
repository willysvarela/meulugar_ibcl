import React from "react";
import Typography from "@material-ui/core/Typography";

const GREEN_COLOR = "#00796b";
const styles = {
  box: {
    backgroundColor: "#ccc",
    padding: "10px",
    margin: "2px",
    height: "20px",
    textAlign: "center",
    color: "#fff",
    borderRadius: "10px"
  }
};

const BoxLegend = (props) => {
  return (
    <>
      <Typography variant="subtitle1">Legenda: </Typography>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <div style={styles.flex}>
          <div style={{ ...styles.box, ...{ backgroundColor: GREEN_COLOR } }}>
            1
          </div>
          <Typography variant="body1">Disponível </Typography>
        </div>
        <div style={styles.flex}>
          <div style={{ ...styles.box, ...{ backgroundColor: "#27ae60" } }}>
            1
          </div>
          <Typography variant="body1">Selecionado </Typography>
        </div>
        <div style={styles.flex}>
          <div style={{ ...styles.box, ...{ backgroundColor: "#7f8c8d" } }}>
            1
          </div>
          <Typography variant="body1">Reservado </Typography>
        </div>
      </div>
    </>
  );
};

export default BoxLegend;
