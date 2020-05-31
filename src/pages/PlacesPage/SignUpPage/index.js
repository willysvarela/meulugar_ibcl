import React, { useState, useEffect } from "react";
import { Typography, Container, TextField, Button } from "@material-ui/core";

const SignUpPage = (props) => {
  const [fields, setFields] = useState({
    nome: "",
    email: "",
    telefone: "",
    idade: "",
    categoria: "Individual"
  });

  const handleChangeText = (e) => {
    setFields((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
    console.log(e.target.value);
    e.persist();
  };

  useEffect(() => {
    if (props.names.length === 1) {
      setFields((oldState) => ({ ...oldState, nome: props.names[0] }));
    }
  }, [props.names]);

  const handleSubmit = () => {
    if (validateFields()) {
      props.onSubmit(fields);
    }
  };

  const validateFields = () => {
    if (
      fields.nome.trim() === "" ||
      fields.telefone.trim() === "" ||
      fields.idade.trim() === "" ||
      fields.categoria.trim() === ""
    ) {
      alert("Você precisa preencher todos os campos corretamente");
      return false;
    } else if (fields.idade > 999) {
      alert("O campo IDADE está preenchido incorretamente");
      return false;
    }
    return true;
  };

  return (
    <div>
      <Typography variant="h5">
        Para confirmar a sua reserva, preencha os dados abaixo:
      </Typography>
      <div>
        <TextField
          style={{ marginTop: "10px" }}
          id="nome"
          label="Nome"
          variant="filled"
          fullWidth
          name="nome"
          value={fields.nome}
          inputProps={{ maxLength: 200 }}
          onChange={(e) => handleChangeText(e)}
        />
        {/*<TextField
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
        />*/}
        <TextField
          style={{ marginTop: "10px" }}
          id="telefone"
          label="Telefone"
          variant="filled"
          fullWidth
          name="telefone"
          value={fields.telefone}
          inputProps={{ maxLength: 15 }}
          onChange={(e) => handleChangeText(e)}
        />
        <TextField
          style={{ marginTop: "10px" }}
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
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px"
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
