import api from './api';

export default {
  async getAllTutores() {
    try {
      const response = await api.get('/Tutor');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar tutores: ' + error.message);
    }
  },

  async getTutorById(id) {
    try {
      const response = await api.get(`/Tutor/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar tutor: ' + error.message);
    }
  },

  async addTutor(tutor) {
    try {
      const response = await api.post('/Tutor', tutor);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao adicionar tutor: ' + error.message);
    }
  },

  async deleteTutor(id) {
    try {
      await api.delete(`/Tutor/${id}`);
    } catch (error) {
      throw new Error('Erro ao deletar tutor: ' + error.message);
    }
  }
}
