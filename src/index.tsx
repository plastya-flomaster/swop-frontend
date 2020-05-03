import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';

import App from './App';

axios.defaults.baseURL = 'http://localhost:5000';
axios.interceptors.request.use(
  (request) => {
    console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById('app'));
