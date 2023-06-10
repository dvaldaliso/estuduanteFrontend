import axios from 'axios'
import initInterceptors from './interceptors';
//const baseUrl = `${process.env.REACT_APP_API_URL}/api/`;
const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({ 
    baseURL: API_BASE_URL,  
    headers: {
    "Content-type": "application/json"
  }});


initInterceptors(api);
export default api;
