import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

// axios.defaults.baseURL =
//   'https://lisbon-js-202003-pjt3-productized-backend.jsrover.wilders.dev';
// console.log(axios.defaults.baseURL);


axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>,
  document.getElementById('root')
);
