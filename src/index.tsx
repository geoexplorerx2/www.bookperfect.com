import './wdyr'; // why-did-your-render
import 'react-hot-loader'; // rhl

import { hot } from 'react-hot-loader/root';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import "react-dates/initialize";
// import "react-dates/lib/css/_datepicker.css";
import '@vaadin/date-time-picker';
import '@vaadin/date-time-picker/theme/material/vaadin-date-time-picker.js';

import "./styles/index.scss";
import "./index.css";
import "./styles/fonts/line-awesome-1.3.0/css/line-awesome.css";
import '../node_modules/fontawesome-4.7/css/font-awesome.min.css';
import './i18n/i18n';
import { hydrate, render } from 'react-dom';


const HotApp = hot(App);

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(
  rootElement as HTMLElement
);

if (rootElement?.hasChildNodes()) {
  hydrate(
    <React.StrictMode>
      <HotApp />
    </React.StrictMode>,
    rootElement
  );
} else {
  // render(<App />, rootElement);
  root.render(
    <React.StrictMode>
      <HotApp />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
