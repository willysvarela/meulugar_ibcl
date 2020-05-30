import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import EventPlacesPage from "./EventPlacesPage";
import FormNamesPage from "./FormNamesPage";
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Button
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
//import SignUpPage from "./SignUpPage";

const PlacesPage = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [lugaresSelecionados, setLugaresSelecionados] = useState([]);

  const history = useHistory();

  const handleSubmitStep1 = (lugares) => {
    setActiveStep((oldStep) => oldStep + 1);
    setLugaresSelecionados(lugares);
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
            <FormNamesPage lugaresSelecionados={lugaresSelecionados} />
          )}
        </div>
      </div>
    </div>
  );
};

PlacesPage.propTypes = {};

export default PlacesPage;
