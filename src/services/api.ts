import Axios from 'axios'
import initInterceptors from './interceptors';
const baseUrl = `${process.env.SERVER_ENDPOINT}/api/`;
const API_BASE_URL = process.env.SERVER_ENDPOINT;


const api = Axios.create({ 
    baseURL: API_BASE_URL,  
    headers: {
    "Content-type": "application/json"
  }});


initInterceptors(api);
export default api;
