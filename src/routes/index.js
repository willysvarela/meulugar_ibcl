import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import EventsPage from "./../pages/EventsPage";
import PlacesPage from "./../pages/PlacesPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <EventsPage />
        </Route>
        <Route exact path="/culto/:id">
          <PlacesPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
