import React, { useState, useEffect } from 'react';

import { Typography, TextField, Button } from '@material-ui/core';

const FormNamesPage = (props) => {
  const [names, setNames] = useState(['']);
  const [quantidadeCriancas, setQuantidadeCriancas] = useState(1);

  useEffect(() => {
    setNames(quantidadeCriancas ? [...new Array(quantidadeCriancas)].map((qtd, i) => ''): []);
  }, [quantidadeCriancas]);

  const handleSubmit = () => {
    if (validateInputs()) {
      props.onSubmit(names);
    } else {
      alert('Você precisa preencher todos os nomes');
    }
  };
  const validateInputs = () => {
    const preenchidos = names.filter((name) => name && name.trim() !== '');
    return preenchidos.length === quantidadeCriancas;
  };

  const handleChangeText = (e, i) => {
    const newNames = [...names];
    newNames[i] = e.target.value;
    setNames(newNames);
  };

  const showS = () => {
    return quantidadeCriancas > 1 && 's';
  };

  const handleChangeQuantidade = (value) => {
    const quantidade = value !== '' || value > 0 ? value : 1;
    if(parseInt(value) < 20){  
      setQuantidadeCriancas(value);
    }else{
      setQuantidadeCriancas('');
    }

   
  };

  return (
    <div>
      <div>
        <Typography variant="h6">Quantidade de Pessoas</Typography>
        <TextField
          id="filled-number"
          label="Qtd"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: 1, max: 5 }}
          variant="filled"
          value={quantidadeCriancas}
          onChange={(e) => handleChangeQuantidade(parseInt(e.target.value))}
        />
      </div>
      <div style={{ height: '50px' }} />
      <Typography variant="h6">
        Informe o{showS()} nome{showS()} da{showS()} pessoa{showS()}
      </Typography>
      <div>
        {names && names.length > 0 ? (
          names.map((lugar, i) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '10px',
              }}
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
                {i + 1}
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
          ))
        ) : (
          <Typography variant="caption">Digite a quantidade de pessoas para reservar</Typography>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
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

FormNamesPage.propTypes = {};

export default FormNamesPage;
