import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://corsanywhere.herokuapp.com/https://aleks-doar-compautadores.herokuapp.com',
  headers: {
    'content-type': 'application/json; charset=utf-8',
  },
});

export default api;
