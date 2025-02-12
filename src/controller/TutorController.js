import axios from 'axios';

const API_URL = 'https://agendamentobanhoetosa-2.onrender.com/Tutor'; 

export default {
  async cadastrarTutor(tutor) {
    try {
      const response = await axios.post(API_URL, {
        nome: tutor.nome,
        telefone: tutor.telefone,
        endereco: tutor.endereco
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar tutor:', error);
      throw error;
    }
  }
};
