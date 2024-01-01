import axios from 'axios';
const { VITE_SERVER_URI_PROD, VITE_SERVER_URI_DEV, DEV } = import.meta.env;
const baseURL = DEV ? VITE_SERVER_URI_DEV : VITE_SERVER_URI_PROD;

const api = axios.create({
  baseURL,
});
axios.defaults.withCredentials = true;

export default api;
