<template>
  <div class="container">
    <h2>Agendar Banho & Tosa</h2>
    
    <form @submit.prevent="agendar">
      <div class="mb-3">
        <label class="form-label">Telefone do Tutor</label>
        <input type="text" v-model="telefone" class="form-control" placeholder="Digite o telefone do tutor">
      </div>

      <div class="mb-3">
        <label class="form-label">Nome do Pet</label>
        <input type="text" v-model="animal.nome" class="form-control" placeholder="Nome do pet">
      </div>

      <div class="mb-3">
        <label class="form-label">Serviço</label>
        <select v-model="servico" class="form-control">
          <option value="1">Banho</option>
          <option value="2">Tosa</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Data</label>
        <input type="date" v-model="dataSelecionada" class="form-control">
      </div>

      <div class="mb-3">
        <label class="form-label">Hora</label>
        <input type="time" v-model="horarioSelecionado" class="form-control">
      </div>

      <button type="submit" class="btn btn-primary">Agendar</button>
    </form>
  </div>
</template>

<script>
import AgendamentoController from '@/controller/AgendamentoController';

export default {
  data() {
    return {
      telefone: '',
      animal: { nome: '' },
      servico: '',
      dataSelecionada: '',
      horarioSelecionado: ''
    };
  },
  methods: {
    async agendar() {
      if (!this.telefone || !this.animal.nome || !this.servico || !this.dataSelecionada || !this.horarioSelecionado) {
        alert('Preencha todos os campos!');
        return;
      }

      const novoAgendamento = {
        telefone: this.telefone,
        nomePet: this.animal.nome,
        idServico: this.servico,
        dataHora: `${this.dataSelecionada} ${this.horarioSelecionado}`
      };

      try {
        await AgendamentoController.criarAgendamento(novoAgendamento);
        alert('Agendamento realizado com sucesso!');
      } catch (error) {
        alert('Erro ao agendar, tente novamente.');
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #e3f2fd;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.btn-primary {
  width: 100%;
  background-color: #64b5f6;
  border: none;
}

.btn-primary:hover {
  background-color: #42a5f5;
}
</style>
