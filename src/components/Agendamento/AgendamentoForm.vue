<template>
  <div class="container">
    <h2 class="text-center">Agendar Banho & Tosa</h2>

    <form @submit.prevent="agendar">
      <!-- Selecionar Tutor -->
      <div class="mb-3">
        <label class="form-label">Tutor</label>
        <select v-model="tutorSelecionado" @change="filtrarAnimais" class="form-select">
          <option value="" disabled>Selecione um tutor</option>
          <option v-for="tutor in tutores" :key="tutor.id" :value="tutor.id">
            {{ tutor.nome }}
          </option>
        </select>
      </div>

      <!-- Selecionar Animal -->
      <div class="mb-3">
        <label class="form-label">Animal</label>
        <select v-model="animalSelecionado" class="form-select" :disabled="animaisFiltrados.length === 0">
          <option value="" disabled>Selecione um pet</option>
          <option v-for="animal in animaisFiltrados" :key="animal.id" :value="animal.id">
            {{ animal.nome }}
          </option>
        </select>
      </div>

      <!-- Selecionar Serviço -->
      <div class="mb-3">
        <label class="form-label">Serviço</label>
        <select v-model="servicoSelecionado" class="form-select">
          <option value="" disabled>Selecione um serviço</option>
          <option v-for="servico in servicos" :key="servico.id" :value="servico.id">
            {{ servico.nome }} - R$ {{ servico.preco }}
          </option>
        </select>
      </div>

      <!-- Selecionar Data -->
      <div class="mb-3">
        <label class="form-label">Data</label>
        <input type="date" v-model="dataSelecionada" class="form-control" :min="hoje" @change="gerarHorarios">
      </div>

      <!-- Selecionar Hora -->
      <div class="mb-3">
        <label class="form-label">Hora</label>
        <select v-model="horarioSelecionado" class="form-select">
          <option value="" disabled>Selecione um horário</option>
          <option v-for="horario in horariosDisponiveis" :key="horario">
            {{ horario }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary w-100">Agendar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tutores: [],
      animais: [],
      servicos: [],
      tutorSelecionado: "",
      animalSelecionado: "",
      servicoSelecionado: "",
      dataSelecionada: "",
      horarioSelecionado: "",
      horariosDisponiveis: [],
    };
  },

  computed: {
    hoje() {
      return new Date().toISOString().split("T")[0]; // Data mínima (hoje)
    },

    // Filtra os animais pelo tutor selecionado
    animaisFiltrados() {
      return this.animais.filter(animal => animal.tutorId === this.tutorSelecionado);
    }
  },

  methods: {
    async carregarDados() {
      try {
        // Busca tutores
        const { data: tutores } = await axios.get("https://agendamentobanhoetosa-2.onrender.com/Tutor");
        this.tutores = tutores;

        // Busca animais
        const { data: animais } = await axios.get("https://agendamentobanhoetosa-2.onrender.com/Animal");
        this.animais = animais;

        // Busca serviços
        const { data: servicos } = await axios.get("https://agendamentobanhoetosa-2.onrender.com/Servico");
        this.servicos = servicos;
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar os dados!");
      }
    },

    // Gera os horários disponíveis (08:00 às 18:00 de 1 em 1 hora)
    gerarHorarios() {
      this.horariosDisponiveis = [];
      for (let hora = 8; hora <= 18; hora++) {
        this.horariosDisponiveis.push(`${hora}:00`);
      }
    },

    // Filtra os animais do tutor selecionado
    filtrarAnimais() {
      this.animalSelecionado = "";
    },

    // Função para agendar um novo serviço
    async agendar() {
      if (!this.tutorSelecionado || !this.animalSelecionado || !this.servicoSelecionado || !this.dataSelecionada || !this.horarioSelecionado) {
        alert("Preencha todos os campos!");
        return;
      }

      const novoAgendamento = {
        dataHora: `${this.dataSelecionada}T${this.horarioSelecionado}:00.000Z`,
        tutorId: this.tutorSelecionado,
        animalId: this.animalSelecionado,
        servicoId: this.servicoSelecionado,
      };

      console.log("Dados do agendamento:", novoAgendamento); // 🔍 Verificar os valores antes de enviar
      try {
        await axios.post("https://agendamentobanhoetosa-2.onrender.com/api/Agendamento", novoAgendamento);
        alert("Agendamento realizado com sucesso!");
      } catch (error) {
        console.error("Erro ao agendar:", error);
        alert("Erro ao agendar, tente novamente.");
      }
    }
  },

  mounted() {
    this.carregarDados();
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
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
  background-color: #64b5f6;
  border: none;
}

.btn-primary:hover {
  background-color: #42a5f5;
}
</style>
