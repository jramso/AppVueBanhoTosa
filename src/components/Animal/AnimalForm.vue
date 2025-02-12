<template>
    <div class="animal-form">
      <h2>{{ editando ? "Editar Animal" : "Cadastrar Animal" }}</h2>
  
      <form @submit.prevent="editando ? atualizarAnimal() : cadastrarAnimal()">
        <div class="form-group">
          <label>Nome:</label>
          <input type="text" v-model="animal.nome" required />
        </div>
  
        <div class="form-group">
          <label>Tipo de Animal:</label>
          <select v-model="animal.tipo" required>
            <option :value="0">Gato</option>
            <option :value="1">Cachorro</option>
          </select>
        </div>
  
        <div class="form-group">
          <label>Raça:</label>
          <select v-model="animal.raca" required>
            <option v-for="(raca, index) in racasDisponiveis" :key="index" :value="index">
              {{ raca }}
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <label>ID do Tutor:</label>
          <input type="number" v-model="animal.tutorId" required />
        </div>
  
        <button type="submit">{{ editando ? "Atualizar" : "Cadastrar" }}</button>
      </form>
  
      <hr />
  
      <h2>Lista de Animais</h2>
      <ul>
        <li v-for="animal in animais" :key="animal.id">
          {{ animal.nome }} ({{ animal.tipo === 0 ? "Gato" : "Cachorro" }}) 
          <button @click="carregarEdicao(animal)">✏ Editar</button>
          <button @click="deletarAnimal(animal.id)">❌ Deletar</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import AnimalController from '@/controller/AnimalController';
  
  export default {
    data() {
      return {
        animais: [],
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
  
      async carregarEdicao(animal) {
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
    }
  };
  </script>
  
  <style scoped>
  .animal-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background: #e3f2fd;
    border-radius: 8px;
  }
  .form-group {
    margin-bottom: 10px;
  }
  button {
    background: #4caf50;
    color: white;
    border: none;
    padding: 8px 12px;
    margin-right: 5px;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.8;
  }
  li {
    list-style: none;
    padding: 8px;
    background: #f1f1f1;
    margin: 5px 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  