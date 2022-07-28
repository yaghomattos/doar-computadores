import axios from 'axios';

const api = axios.create({
  baseURL: 'https://doar-computador-api.herokuapp.com/',
  headers: { 'content-type': 'application/json; charset=utf-8' },
});

export default api;
