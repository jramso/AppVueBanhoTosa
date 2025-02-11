<template>
    <div class="container mt-4">
      <div class="card shadow p-4 custom-card">
        <h2 class="text-center">Agendamento de Banho e Tosa</h2>
        
        <div class="mb-3">
          <label class="form-label">Telefone do Tutor</label>
          <input type="text" v-model="telefone" class="form-control" placeholder="Digite o telefone" @blur="buscarTutor" />
        </div>
        
        <div v-if="tutorEncontrado">
          <h4 class="text-success">Tutor encontrado: {{ tutor.nome }}</h4>
          <label class="form-label">Escolha um animal:</label>
          <select v-model="idPet" class="form-select">
            <option v-for="animal in tutor.animais" :key="animal.id" :value="animal.id">{{ animal.nome }}</option>
          </select>
          <button class="btn btn-sm btn-outline-primary mt-2" @click="cadastrarNovoAnimal">Cadastrar Novo Animal</button>
        </div>
        
        <div v-if="!tutorEncontrado">
          <h4 class="text-danger">Tutor não encontrado. Cadastre um novo:</h4>
          <input type="text" v-model="novoTutor.nome" class="form-control mb-2" placeholder="Nome do Tutor" />
          <input type="text" v-model="novoTutor.endereco" class="form-control mb-2" placeholder="Endereço" />
          <button class="btn btn-success" @click="cadastrarTutor">Cadastrar Tutor</button>
        </div>
        
        <div v-if="idPet || novoAnimal">
          <label class="form-label">Escolha o serviço:</label>
          <select v-model="idServico" class="form-select">
            <option v-for="servico in servicos" :key="servico.id" :value="servico.id">{{ servico.nome }}</option>
          </select>
          
          <label class="form-label mt-3">Escolha o horário:</label>
          <input type="datetime-local" v-model="dataHora" class="form-control" :min="minDate" />
          <button class="btn btn-primary w-100 mt-3" @click="agendar">Agendar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        telefone: '',
        tutorEncontrado: false,
        tutor: {},
        novoTutor: { nome: '', endereco: '' },
        novoAnimal: false,
        idPet: null,
        idServico: null,
        dataHora: '',
        servicos: [
          { id: 1, nome: 'Banho Simples' },
          { id: 2, nome: 'Banho e Tosa' }
        ]
      };
    },
    computed: {
      minDate() {
        return new Date().toISOString().slice(0, 16);
      }
    },
    methods: {
      buscarTutor() {
        // Simulação de busca de tutor
        if (this.telefone === '999999999') {
          this.tutorEncontrado = true;
          this.tutor = { nome: 'Carlos Silva', animais: [{ id: 1, nome: 'Rex' }, { id: 2, nome: 'Mia' }] };
        } else {
          this.tutorEncontrado = false;
        }
      },
      cadastrarTutor() {
        this.tutorEncontrado = true;
        this.tutor = { nome: this.novoTutor.nome, animais: [] };
      },
      cadastrarNovoAnimal() {
        this.novoAnimal = true;
      },
      agendar() {
        alert('Agendamento realizado com sucesso!');
      }
    }
  };
  </script>
  
  <style scoped>
  .custom-card {
    background-color: #f4f9f9; /* Verde-água claro */
    border-radius: 10px;
    border: 2px solid #a8e6cf;
  }
  
  h2 {
    color: #ff9aa2; /* Rosa-claro */
  }
  
  .btn-primary {
    background-color: #a8e6cf;
    border-color: #81c7b0;
  }
  .btn-primary:hover {
    background-color: #81c7b0;
  }
  
  .btn-outline-primary {
    border-color: #ff9aa2;
    color: #ff9aa2;
  }
  .btn-outline-primary:hover {
    background-color: #ff9aa2;
    color: white;
  }
  </style>
  