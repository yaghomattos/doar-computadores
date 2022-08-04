import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aleks-doar-compautadores.herokuapp.com/',
  headers: { 'content-type': 'application/json; charset=utf-8' },
});

export default api;
