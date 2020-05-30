import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import EventPlacesPage from "./EventPlacesPage";
import FormNamesPage from "./FormNamesPage";
import { AppBar, Typography, Toolbar, IconButton } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SignUpPage from "./SignUpPage";
import FinalPage from "./FinalPage";

import api from "./../../services/api";

const STATUS_CONTEXT = [
  "",
  "Cadastrando no Sistema",
  "Realizando Reservas",
  "Finalizado"
];

const PlacesPage = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [lugaresSelecionados, setLugaresSelecionados] = useState([]);
  const [names, setNames] = useState([]);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(0);
  const [msgError, setMsgError] = useState("");
  const history = useHistory();

  const handleSubmitStep1 = (lugares) => {
    setLugaresSelecionados(lugares);
    nextStep();
  };

  const handleSubmitStepNames = (names) => {
    setNames(names);
    nextStep();
  };

  const handleSubmitStepSignUp = (user) => {
    setUser(user);
    saveUser(user);
    nextStep();
  };

  const saveUser = (user) => {
    //chamar rota cadastro usuario; < Retorna o usuario cadastrado

    setStatus(1);
    api
      .post("/pessoa", { ...user })
      .then((res) => {
        console.log(res.data);
        setStatus(2);
        makeReservation(res.data);
      })
      .catch((e) => {
        setStatus(5);
      });
    //chamar rota de reserva.
  };
  const makeReservation = (userSigned) => {
    const lugares = lugaresSelecionados.map((lugarSelecionado, i) => ({
      id: lugarSelecionado.id,
      nome_reservado: names[i],
      id_pessoa: userSigned.id
    }));
    console.log(lugares);
    api
      .post("/pessoa/reservar", { lugares: lugares })
      .then((res) => {
        console.log(res.data);
        setStatus(3);
      })
      .catch((err) => {
        setStatus(4);
        console.log(err, err.data);
        setMsgError(err.response.data.message);
      });
  };
  const nextStep = () => {
    setActiveStep((oldStep) => oldStep + 1);
  };
  const handleBackStep = () => {
    setActiveStep((oldStep) => oldStep - 1);
  };

  const styles = { container: { marginTop: "100px" } };
  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => history.goBack()}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">Escolha os lugares</Typography>
        </Toolbar>
      </AppBar>
      <div style={styles.container}>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Seleção de Lugares</StepLabel>
          </Step>
          <Step>
            <StepLabel>Marcação de Nomes</StepLabel>
          </Step>
          <Step>
            <StepLabel>Finalização de Cadastro</StepLabel>
          </Step>
        </Stepper>
        <div>
          {activeStep === 0 && (
            <EventPlacesPage
              onSubmit={(lugares) => handleSubmitStep1(lugares)}
            />
          )}
          {activeStep === 1 && (
            <FormNamesPage
              lugaresSelecionados={lugaresSelecionados}
              onSubmit={(names) => handleSubmitStepNames(names)}
              onBack={() => handleBackStep()}
            />
          )}
          {activeStep === 2 && (
            <SignUpPage
              names={names}
              onBack={() => handleBackStep()}
              onSubmit={(user) => handleSubmitStepSignUp(user)}
            />
          )}
          {activeStep === 3 && (
            <FinalPage
              status={status}
              user={user}
              lugaresSelecionados={lugaresSelecionados}
              error={msgError}
            />
          )}
        </div>
      </div>
    </div>
  );
};

PlacesPage.propTypes = {};

export default PlacesPage;
