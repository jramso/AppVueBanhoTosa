import axios from 'axios';

const API_URL = 'https://agendamentobanhoetosa-2.onrender.com/Animal';

export default {
  async cadastrarAnimal(animal) {
    const response = await axios.post(API_URL, animal);
    return response.data;
  },

  async listarAnimais() {
    const response = await axios.get(API_URL);
    return response.data;
  },


  async buscarAnimalPorId(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

 
  async atualizarAnimal(id, dadosAtualizados) {
    const response = await axios.put(`${API_URL}/${id}`, dadosAtualizados);
    return response.data;
  },

  
  async deletarAnimal(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};
