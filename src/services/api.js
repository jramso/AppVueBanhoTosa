import axios from 'axios';

const api = axios.create({
  baseURL: "https://agendamentobanhoetosa-2.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
