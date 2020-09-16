import React from 'react';
import ReactDOM from 'react-dom';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import * as serviceWorker from './serviceWorker';

import App from './App';
import './index.css';

Sentry.init({
  dsn: "https://03f15c863b8f4d57bfd1af7853d38c8e@o448904.ingest.sentry.io/5431038",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

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
