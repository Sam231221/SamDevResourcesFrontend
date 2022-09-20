import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App';

import axios from 'axios'

axios.defaults.baseURL=process.env.REACT_APP_API

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
