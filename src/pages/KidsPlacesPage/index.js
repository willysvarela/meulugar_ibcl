import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { AppBar, Typography, Toolbar, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EventPlacesPage from './EventPlacesPage';
import FormNamesPage from './FormNamesPage';
import SignUpPage from './SignUpPage';
import FinalPage from './FinalPage';

import api from '../../services/api';
import { formatDateTime } from './../../services/utils';

const PlacesPage = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  //const [lugaresSelecionados, setLugaresSelecionados] = useState([]);
  const [names, setNames] = useState([]);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(0);
  const [msgError, setMsgError] = useState('');
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const history = useHistory();

  const params = useParams();

  useEffect(() => {
    api.get(`/lugar/evento/${params.id}`).then((res) => {
      setEventoSelecionado(res.data.evento);
    });
  }, [params]);

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
    setStatus(1);
    api
      .post('/pessoa', { ...user })
      .then((res) => {
        console.log(res.data);
        setStatus(2);
        makeReservation(res.data);
      })
      .catch((e) => {
        setStatus(5);
      });
    // chamar rota de reserva.
  };

  const makeReservation = (userSigned) => {
    const lugares = names.map((name, i) => ({
      nome_reservado: name,
      id_pessoa: userSigned.id,
      id_evento: parseInt(params.id),
    }));
    console.log({ lugares });

    api
      .post('/dept/reservar', { lugares })
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

  const styles = { container: { marginTop: '100px' } };
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
          <Typography variant="h6">
            {eventoSelecionado &&
              `${eventoSelecionado.nome} - ${formatDateTime(
                eventoSelecionado.data_evento
              )}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={styles.container}>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Nomes das Pessoas</StepLabel>
          </Step>
          <Step>
            <StepLabel>Finalização de Reserva</StepLabel>
          </Step>
        </Stepper>
        <div>
          {activeStep === 0 && (
            <FormNamesPage onSubmit={(names) => handleSubmitStepNames(names)} />
          )}
          {activeStep === 1 && (
            <SignUpPage
              names={names}
              onBack={() => handleBackStep()}
              onSubmit={(user) => handleSubmitStepSignUp(user)}
            />
          )}
          {activeStep === 2 && (
            <FinalPage
              status={status}
              user={user}
              names={names}
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
