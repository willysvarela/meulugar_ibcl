import React, { useState } from 'react';

import { Typography, TextField, Button } from '@material-ui/core';

const FormNamesPage = (props) => {
  const [names, setNames] = useState([]);

  const handleBack = () => {
    props.onBack();
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      props.onSubmit(names);
    } else {
      alert('Você precisa preencher todos os nomes');
    }
  };
  const validateInputs = () => {
    console.log(names);
    const preenchidos = names.filter((name) => name && name.trim() !== '');
    console.log(preenchidos);
    console.log(preenchidos.length);
    return preenchidos.length === props.lugaresSelecionados.length;
  };

  const handleChangeText = (e, i) => {
    const newNames = [...names];
    newNames[i] = e.target.value;
    setNames(newNames);
  };

  return (
    <div>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
            Insira os nomes das pessoas que sentarão nas cadeiras marcadas
      </Typography>
          <div>
        {props.lugaresSelecionados.map((lugar, i) => (
                  <div
            style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
            key={i}
          >
            <div
                        style={{
                padding: '14px',
                backgroundColor: '#00796b',
                borderRadius: '10px',
                marginRight: '10px',
                color: '#fff',
                fontStyle: 'bold',
                marginTop: '10px',
              }}
                      >
                          {lugar.posicao}
                      </div>
              <TextField
                        id={`name${i}`}
                        label="Nome"
                        variant="filled"
                        fullWidth
                        inputProps={{ maxLength: 200 }}
                        value={names[i] || ''}
                        onChange={(e) => handleChangeText(e, i)}
                      />
          </div>
        ))}
            <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button color="primary" onClick={() => handleBack()}>
                    Voltar
          </Button>
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

FormNamesPage.propTypes = {};

export default FormNamesPage;
