<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header text-center bg-primary text-white">
        <h2>Agendar Banho & Tosa</h2>
      </div>
      
      <div class="card-body">
        <form @submit.prevent="agendar">
          <div class="row">
            <!-- Selecionar Tutor -->
            <div class="col-md-6">
              <div class="form-group mb-3">
                <label class="form-label fw-bold">Tutor: </label>
                <select v-model="tutorSelecionado" @change="filtrarAnimais" class="form-control">
                  <option value="" disabled>Selecione um tutor: </option>
                  <option v-for="tutor in tutores" :key="tutor.id" :value="tutor.id">
                    {{ tutor.nome }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Selecionar Animal -->
            <div class="col-md-6">
              <div class="form-group mb-3">
                <label class="form-label fw-bold">Animal: </label>
                <select v-model="animalSelecionado" class="form-control" :disabled="animaisFiltrados.length === 0">
                  <option value="" disabled>Selecione um Animal</option>
                  <option v-for="animal in animaisFiltrados" :key="animal.id" :value="animal.id">
                    {{ animal.nome }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Selecionar Serviço -->
            <div class="col-md-6">
              <div class="form-group mb-3">
                <label class="form-label fw-bold">Serviço Disponível: </label>
                <select v-model="servicoSelecionado" class="form-control">
                  <option value="" disabled>Selecione um serviço:</option>
                  <option v-for="servico in servicos" :key="servico.id" :value="servico.id">
                    {{ servico.nome }} - R$ {{ servico.preco }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Selecionar Data -->
            <div class="col-md-6">
              <div class="form-group mb-3">
                <label class="form-label fw-bold">Data do Agendamento</label>
                <input type="date" v-model="dataSelecionada" class="form-control" :min="hoje" @change="gerarHorarios">
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Selecionar Hora -->
            <div class="col-md-6">
              <div class="form-group mb-3">
                <label class="form-label fw-bold">Hora</label>
                <select v-model="horarioSelecionado" class="form-control">
                  <option value="" disabled>Selecione um horário</option>
                  <option v-for="horario in horariosDisponiveis" :key="horario">
                    {{ horario }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100">Agendar</button>
        </form>
      </div>
    </div>
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
