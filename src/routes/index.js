import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import EventsPage from '../pages/EventsPage';
import PlacesPage from '../pages/PlacesPage';
import KidsPlacesPage from '../pages/KidsPlacesPage';
import ReservationPage from '../pages/Admin/ReservationPage';
import ReservationDetailPage from '../pages/Admin/ReservationDetailPage';

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
        <Route exact path="/kids/:id">
          <KidsPlacesPage />
        </Route>
            <Route exact path="/reservas">
            <ReservationPage />
        </Route>
        <Route exact path="/reservas/:id">
          <ReservationDetailPage />
              </Route>
      </Switch>
      </BrowserRouter>
  );
};
export default Routes;
