import React from "react";
import PropTypes from "prop-types";
import { Typography, TextField } from "@material-ui/core";

const FormNamesPage = (props) => {
  return (
    <div>
      <Typography>
        Insira o nome das pessoas que sentarão nas cadeiras marcadas
      </Typography>
      <div>
        {props.lugaresSelecionados.map((lugar) => (
          <div>
            <div>{lugar.posicao}</div>
            <TextField
              id="filled-search"
              label="Nome"
              type="search"
              variant="filled"
              fullWidth
            />
          </div>
        ))}
      </div>
    </div>
  );
};

FormNamesPage.propTypes = {};

export default FormNamesPage;
