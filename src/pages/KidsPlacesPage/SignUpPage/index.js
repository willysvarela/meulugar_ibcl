import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import TextMaskCustom from '../../../components/MaskedInput';

const SignUpPage = (props) => {
  const [fields, setFields] = useState({
    nome: '',
    email: '',
    telefone: '',
    idade: '',
    categoria: 'Individual',
  });

  const handleChangeText = (e) => {
    setFields((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));

    e.persist();
  };
  const handleChangeTelefone = (e) => {
    console.log('phone', e.target.value);

    const telefone = e.target.value
      .split('')
      .filter((n) => {
        // eslint-disable-next-line
        return Number(n) || n == 0;
      })
      .join('')
      .trim();
    console.log('phone2', telefone);

    setFields((oldState) => ({ ...oldState, telefone }));
  };

  const handleSubmit = () => {
    if (validateFields()) {
      props.onSubmit(fields);
    }
  };

  const validateFields = () => {
    if (
      fields.nome.trim() === '' ||
      fields.telefone.trim() === '' ||
      fields.idade.trim() === '' ||
      fields.categoria.trim() === ''
    ) {
      alert('Você precisa preencher todos os campos corretamente');
      return false;
    }
    if (fields.idade > 999) {
      alert('O campo IDADE está preenchido incorretamente');
      return false;
    }
    if (fields.telefone.length < 11) {
      console.log(fields.telefone);
      alert('Telefone incorreto');
      return false;
    }
    console.log(fields.telefone);
    return true;
  };

  return (
    <div>
      <Typography variant="h5">
        Dados do Responsável, CONFORME RESERVADO NO CULTO:
      </Typography>
      <div>
        <TextField
          style={{ marginTop: '10px' }}
          id="nome"
          label="Nome"
          variant="filled"
          fullWidth
          name="nome"
          value={fields.nome}
          inputProps={{ maxLength: 200 }}
          onChange={(e) => handleChangeText(e)}
        />
        {/* <TextField
                style={{ marginTop: "10px" }}
                type="mail"
                id="email"
                label="Email"
                variant="filled"
                fullWidth
                name="email"
                value={fields.email}
                inputProps={{ maxLength: 200 }}
                onChange={(e) => handleChangeText(e)}
          /> */}
        <TextField
          style={{ marginTop: '10px' }}
          type="tel"
          label="Telefone"
          variant="filled"
          value={fields.telefone}
          onChange={(e) => handleChangeTelefone(e)}
          name="telefone"
          fullWidth
          id="telefone"
          InputProps={{
            inputComponent: TextMaskCustom,
          }}
        />
        <TextField
          style={{ marginTop: '10px' }}
          type="number"
          id="idade"
          label="Idade"
          variant="filled"
          fullWidth
          name="idade"
          value={fields.idade}
          inputProps={{ max: 3 }}
          onChange={(e) => handleChangeText(e)}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button color="primary" onClick={() => props.onBack()}>
            Voltar
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleSubmit()}
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
