<template>
  <div class="container mt-4">
    <h2 class="text-center">Agendar Banho & Tosa</h2>

    <form @submit.prevent="agendar">
      <!-- Seleção do Tutor -->
      <div class="mb-3">
        <label class="form-label">Tutor</label>
        <select v-model="agendamento.tutorId" class="form-select" @change="carregarAnimais">
          <option v-for="tutor in tutores" :key="tutor.id" :value="tutor.id">
            {{ tutor.nome }} - {{ tutor.telefone }}
          </option>
        </select>
      </div>

      <!-- Seleção do Pet (Filtrando pelo Tutor) -->
      <div class="mb-3">
        <label class="form-label">Pet</label>
        <select v-model="agendamento.animalId" class="form-select" :disabled="animaisFiltrados.length === 0">
          <option v-for="animal in animaisFiltrados" :key="animal.id" :value="animal.id">
            {{ animal.nome }} ({{ animal.tipo === 0 ? 'Gato' : 'Cachorro' }})
          </option>
        </select>
      </div>

      <!-- Seleção do Serviço -->
      <div class="mb-3">
        <label class="form-label">Serviço</label>
        <select v-model="agendamento.servicoId" class="form-select">
          <option v-for="servico in servicos" :key="servico.id" :value="servico.id">
            {{ servico.nome }} - R$ {{ servico.preco }}
          </option>
        </select>
      </div>

      <!-- Escolha da Data -->
      <div class="mb-3">
        <label class="form-label">Data</label>
        <input type="date" v-model="dataSelecionada" class="form-control" :min="dataMinima" required>
      </div>

      <!-- Escolha do Horário -->
      <div class="mb-3">
        <label class="form-label">Hora</label>
        <select v-model="horarioSelecionado" class="form-select">
          <option v-for="hora in horariosDisponiveis" :key="hora" :value="hora">
            {{ hora }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary w-100">Agendar</button>
    </form>
  </div>
</template>

<script>
import AgendamentoController from '@/controller/AgendamentoController';
import TutorController from '@/controller/TutorController';
import AnimalController from '@/controller/AnimalController';
import ServicoController from '@/controller/ServicoController';

export default {
  data() {
    return {
      tutores: [],
      animais: [],
      servicos: [],
      agendamento: {
        tutorId: null,
        animalId: null,
        servicoId: null,
        dataHora: ''
      },
      dataSelecionada: '',
      horarioSelecionado: '',
      horariosDisponiveis: []
    };
  },
  computed: {
    dataMinima() {
      const hoje = new Date();
      return hoje.toISOString().split('T')[0]; // Data mínima = hoje
    },
    animaisFiltrados() {
      // Retorna apenas os animais do tutor selecionado
      return this.animais.filter(animal => animal.tutorId === this.agendamento.tutorId);
    }
  },
  watch: {
    dataSelecionada() {
      this.gerarHorariosDisponiveis();
    }
  },
  methods: {
    async carregarTutores() {
      try {
        this.tutores = await TutorController.getAllTutores();
      } catch (error) {
        console.error('Erro ao carregar tutores:', error);
      }
    },
    async carregarAnimais() {
      try {
        this.animais = await AnimalController.getAllAnimais();
      } catch (error) {
        console.error('Erro ao carregar animais:', error);
      }
    },
    async carregarServicos() {
      try {
        this.servicos = await ServicoController.getAllServicos();
      } catch (error) {
        console.error('Erro ao carregar serviços:', error);
      }
    },
    gerarHorariosDisponiveis() {
      this.horariosDisponiveis = [];
      const horarios = [];
      for (let hora = 8; hora <= 18; hora++) {
        horarios.push(`${hora.toString().padStart(2, '0')}:00`);
      }
      this.horariosDisponiveis = horarios;
    },
    async agendar() {
      if (!this.agendamento.tutorId || !this.agendamento.animalId || !this.agendamento.servicoId || !this.dataSelecionada || !this.horarioSelecionado) {
        alert('Preencha todos os campos!');
        return;
      }

      this.agendamento.dataHora = `${this.dataSelecionada}T${this.horarioSelecionado}:00Z`;

      try {
        await AgendamentoController.criarAgendamento(this.agendamento);
        alert('Agendamento realizado com sucesso!');
        this.resetForm();
      } catch (error) {
        alert('Erro ao agendar, tente novamente.');
        console.error('Erro:', error);
      }
    },
    resetForm() {
      this.agendamento = {
        tutorId: null,
        animalId: null,
        servicoId: null,
        dataHora: ''
      };
      this.dataSelecionada = '';
      this.horarioSelecionado = '';
    }
  },
  async created() {
    await this.carregarTutores();
    await this.carregarAnimais();
    await this.carregarServicos();
    this.gerarHorariosDisponiveis();
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
