<template>
    <div class="container mt-4">
      <div class="card shadow">
        <div class="card-header text-center bg-primary text-white">
          <h2>{{ editando ? "Editar Animal" : "Cadastrar Animal" }}</h2>
        </div>
  
        <div class="card-body">
          <form @submit.prevent="editando ? atualizarAnimal() : cadastrarAnimal()">
            <div class="row">
              <!-- Nome do Animal -->
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label class="form-label fw-bold">Nome do Animal</label>
                  <input type="text" v-model="animal.nome" class="form-control" required />
                </div>
              </div>
  
              <!-- Tipo de Animal -->
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label class="form-label fw-bold">Tipo de Animal</label>
                  <select v-model="animal.tipo" class="form-control" required>
                    <option :value="0">Gato</option>
                    <option :value="1">Cachorro</option>
                  </select>
                </div>
              </div>
            </div>
  
            <div class="row">
              <!-- Selecionar Raça -->
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label class="form-label fw-bold">Raça</label>
                  <select v-model="animal.raca" class="form-control" required>
                    <option v-for="(raca, index) in racasDisponiveis" :key="index" :value="index">
                      {{ raca }}
                    </option>
                  </select>
                </div>
              </div>
  
              <!-- Selecionar Tutor -->
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label class="form-label fw-bold">Tutor</label>
                  <select v-model="animal.tutorId" class="form-control" required>
                    <option value="" disabled>Selecione um tutor</option>
                    <option v-for="tutor in tutores" :key="tutor.id" :value="tutor.id">
                      {{ tutor.nome }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
  
            <button type="submit" class="btn btn-success w-100">
              {{ editando ? "Atualizar" : "Cadastrar" }}
            </button>
          </form>
        </div>
      </div>
  
      <hr />
  
      <div class="card shadow mt-4">
        <div class="card-header bg-secondary text-white text-center">
          <h2>Lista de Animais</h2>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li v-for="animal in animais" :key="animal.id" class="list-group-item d-flex justify-content-between align-items-center">
              {{ animal.nome }} ({{ animal.tipo === 0 ? "Gato" : "Cachorro" }})
              <div>
                <button @click="carregarEdicao(animal)" class="btn btn-warning btn-sm me-2">✏ Editar</button>
                <button @click="deletarAnimal(animal.id)" class="btn btn-danger btn-sm">❌ Deletar</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AnimalController from '@/controller/AnimalController';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        animais: [],
        tutores: [],
        animal: {
          id: null,
          nome: '',
          tipo: 0,
          raca: null,
          tutorId: null
        },
        editando: false,
        racasGato: ['Abissínio', 'Angorá', 'Birmanês', 'Bengal', 'Maine Coon', 'Persa', 'Ragdoll', 'Scottish Fold', 'Siamês', 'Sphynx', 'Vira-Lata'],
        racasCachorro: ['Akita Americano', 'Basenji', 'Beagle', 'Buldogue Francês', 'Border Collie', 'Golden Retriever', 'Labrador', 'Poodle', 'Pastor Alemão', 'Rottweiler', 'Vira-Lata']
      };
    },
    computed: {
      racasDisponiveis() {
        return this.animal.tipo === 0 ? this.racasGato : this.racasCachorro;
      }
    },
    methods: {
      async carregarTutores() {
        try {
          const { data: tutores } = await axios.get("https://agendamentobanhoetosa-2.onrender.com/Tutor");
          this.tutores = tutores;
        } catch (error) {
          console.error("Erro ao carregar tutores:", error);
        }
      },
  
      async cadastrarAnimal() {
        try {
          await AnimalController.cadastrarAnimal(this.animal);
          alert('Animal cadastrado com sucesso!');
          this.limparFormulario();
          this.listarAnimais();
        } catch (error) {
          console.error('Erro ao cadastrar animal:', error);
          alert('Erro ao cadastrar animal.');
        }
      },
  
      async listarAnimais() {
        try {
          this.animais = await AnimalController.listarAnimais();
        } catch (error) {
          console.error('Erro ao listar animais:', error);
        }
      },
  
      carregarEdicao(animal) {
        this.animal = { ...animal };
        this.editando = true;
      },
  
      async atualizarAnimal() {
        try {
          await AnimalController.atualizarAnimal(this.animal.id, this.animal);
          alert('Animal atualizado com sucesso!');
          this.limparFormulario();
          this.listarAnimais();
        } catch (error) {
          console.error('Erro ao atualizar animal:', error);
          alert('Erro ao atualizar animal.');
        }
      },
  
      async deletarAnimal(id) {
        if (confirm('Tem certeza que deseja excluir este animal?')) {
          try {
            await AnimalController.deletarAnimal(id);
            alert('Animal deletado com sucesso!');
            this.listarAnimais();
          } catch (error) {
            console.error('Erro ao deletar animal:', error);
            alert('Erro ao deletar animal.');
          }
        }
      },
  
      limparFormulario() {
        this.animal = { id: null, nome: '', tipo: 0, raca: null, tutorId: null };
        this.editando = false;
      }
    },
    mounted() {
      this.listarAnimais();
      this.carregarTutores();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  .card {
    border-radius: 8px;
    overflow: hidden;
  }
  .form-group {
    margin-bottom: 15px;
  }
  button {
    padding: 8px 12px;
    cursor: pointer;
  }
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  