import axios from 'axios';

const API_URL = 'https://agendamentobanhoetosa-2.onrender.com/Servico';

export default {
  async cadastrarServico(servico) {
    try {
      const response = await axios.post(API_URL, {
        nome: servico.nome, 
        preco: servico.preco
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
      throw error;
    }
  },

  async listarServicos() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      throw error;
    }
  },

  async obterServico(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar serviço com ID ${id}:`, error);
      throw error;
    }
  },

  async atualizarServico(id, servico) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        nome: servico.nome, 
        preco: servico.preco
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar serviço com ID ${id}:`, error);
      throw error;
    }
  },

  async excluirServico(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir serviço com ID ${id}:`, error);
      throw error;
    }
  }
};
