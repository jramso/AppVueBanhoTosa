import api from '@/services/api';

export default {
  async getAll() {
    try {
      const response = await api.get('/agendamentos');
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/agendamentos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar agendamento com ID ${id}:`, error);
      throw error;
    }
  },

  async create(agendamento) {
    try {
      const response = await api.post('/agendamentos', agendamento);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      throw error;
    }
  },

  async update(id, agendamento) {
    try {
      const response = await api.put(`/agendamentos/${id}`, agendamento);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar agendamento com ID ${id}:`, error);
      throw error;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/agendamentos/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir agendamento com ID ${id}:`, error);
      throw error;
    }
  }
};
