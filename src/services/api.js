import axios from 'axios';

const baseURL = 'https://navedex-api.herokuapp.com/v1/';

const api = axios.create({
  baseURL: baseURL,
  responseType: 'json',
});

export default api;
