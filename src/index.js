import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import ReactPixel from 'react-facebook-pixel';

import App from './App';
import './index.css';

ReactPixel.init('257753242273552', null, {
  autoConfig: true, // set pixel's autoConfig
  debug: false, // enable logs
});
ReactPixel.pageView();

ReactDOM.render(
  <React.StrictMode>
    <App />
    </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
