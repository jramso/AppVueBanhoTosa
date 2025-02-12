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

    <!-- LISTA DE AGENDAMENTOS -->
    <div class="card shadow mt-4">
      <div class="card-header bg-secondary text-white text-center">
        <h3>Meus Agendamentos</h3>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Tutor</th>
              <th>Animal</th>
              <th>Serviço</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agendamento in agendamentos" :key="agendamento.id">
              <td>{{ getTutorNome(agendamento.tutorId) }}</td>
              <td>{{ getAnimalNome(agendamento.animalId) }}</td>
              <td>{{ getServicoNome(agendamento.servicoId) }}</td>
              <td>{{ formatarData(agendamento.dataHora) }}</td>
              <td>{{ formatarHora(agendamento.dataHora) }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="cancelarAgendamento(agendamento.id)">
                  🗑️ Cancelar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="agendamentos.length === 0" class="text-center text-muted">Nenhum agendamento encontrado.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tutores: [],
      animais: [],
      servicos: [],
      agendamentos: [],
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

    animaisFiltrados() {
      return this.animais.filter(animal => animal.tutorId === this.tutorSelecionado);
    }
  },

  methods: {
    async carregarDados() {
      try {
        const { data: tutores } = await axios.get("https://agendamentobanhoetosa-2.onrender.com/Tutor");
        const { data: animais } = await axios.get("https://agendamentobanhoetosa-2.onrender.com/Animal");
        const { data: servicos } = await axios.get("https://agendamentobanhoetosa-2.onrender.com/Servico");
        const { data: agendamentos } = await axios.get("https://agendamentobanhoetosa-2.onrender.com/api/Agendamento");

        this.tutores = tutores;
        this.animais = animais;
        this.servicos = servicos;
        this.agendamentos = agendamentos;
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar os dados!");
      }
    },

    gerarHorarios() {
      this.horariosDisponiveis = [];
      for (let hora = 8; hora <= 18; hora++) {
        this.horariosDisponiveis.push(`${hora}:00`);
      }
    },

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

      try {
        await axios.post("https://agendamentobanhoetosa-2.onrender.com/api/Agendamento", novoAgendamento);
        alert("Agendamento realizado com sucesso!");
        this.carregarDados();
      } catch (error) {
        alert("Erro ao agendar, tente novamente.");
      }
    },

    async cancelarAgendamento(id) {
      if (confirm("Deseja cancelar este agendamento?")) {
        await axios.delete(`https://agendamentobanhoetosa-2.onrender.com/api/Agendamento/${id}`);
        this.carregarDados();
      }
    },

    getTutorNome(id) {
      return this.tutores.find(tutor => tutor.id === id)?.nome || "-";
    },

    getAnimalNome(id) {
      return this.animais.find(animal => animal.id === id)?.nome || "-";
    },

    getServicoNome(id) {
      return this.servicos.find(servico => servico.id === id)?.nome || "-";
    },

    formatarData(data) {
      return data.split("T")[0];
    },

    formatarHora(data) {
      return data.split("T")[1].substring(0, 5);
    }
  },

  mounted() {
    this.carregarDados();
  }
};
</script>
