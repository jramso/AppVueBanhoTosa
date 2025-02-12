import axios from 'axios';

const API_URL = 'https://agendamentobanhoetosa-2.onrender.com/Animal';

export default {
  // Cadastrar novo animal
  async cadastrarAnimal(animal) {
    const response = await axios.post(API_URL, animal);
    return response.data;
  },

  // Listar todos os animais
  async listarAnimais() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Buscar um animal pelo ID
  async buscarAnimalPorId(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Atualizar informações de um animal pelo ID
  async atualizarAnimal(id, dadosAtualizados) {
    const response = await axios.put(`${API_URL}/${id}`, dadosAtualizados);
    return response.data;
  },

  // Deletar um animal pelo ID
  async deletarAnimal(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};
