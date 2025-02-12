<template>
    <div class="container">
      <h2>UauDog | Banho e Tosa</h2>
  
      <!-- Formulário para adicionar/editar serviço -->
      <form @submit.prevent="salvarServico">
        <div class="mb-3">
          <label class="form-label">Nome do Serviço</label>
          <input type="text" v-model="novoServico.nome" class="form-control" placeholder="Digite o nome do serviço" required>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Preço (R$)</label>
          <input type="number" v-model.number="novoServico.preco" class="form-control" placeholder="Digite o preço" step="1" required>
        </div>
  
        <button type="submit" class="btn btn-success">{{ editando ? 'Salvar Alterações' : 'Adicionar Serviço' }}</button>
        <button v-if="editando" type="button" class="btn btn-secondary mt-2 w-100" @click="cancelarEdicao">Cancelar</button>
      </form>
  
      <!-- Lista de serviços cadastrados -->
      <h3 class="mt-4">Serviços Cadastrados</h3>
      <ul class="list-group">
        <li v-for="(servico, index) in servicos" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            {{ servico.nome }} - R$ {{ servico.preco }}
          </div>
          <div>
            <button @click="prepararEdicao(servico)" class="btn btn-warning btn-sm me-2">Editar</button>
            <button @click="removerServico(servico.id)" class="btn btn-danger btn-sm">Remover</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import ServicoController from '@/controller/ServicoController';
  
  export default {
    data() {
      return {
        novoServico: { id: null, nome: '', preco: '' }, // Adicionado ID para edição
        servicos: [],
        editando: false, // Indica se está editando um serviço
      };
    },
    methods: {
      async salvarServico() {
        if (!this.novoServico.nome || !this.novoServico.preco) {
          alert('Preencha todos os campos!');
          return;
        }
  
        try {
          if (this.editando) {
            // Atualizar serviço existente
            await ServicoController.atualizarServico(this.novoServico.id, this.novoServico);
            alert('Serviço atualizado com sucesso!');
          } else {
            // Adicionar novo serviço
            const servicoCriado = await ServicoController.cadastrarServico(this.novoServico);
            this.servicos.push(servicoCriado);
            alert('Serviço cadastrado com sucesso!');
          }
  
          this.cancelarEdicao(); // Resetar o formulário
          this.carregarServicos(); // Atualizar lista
        } catch (error) {
          alert('Erro ao salvar serviço, tente novamente.');
        }
      },
  
      async carregarServicos() {
        try {
          this.servicos = await ServicoController.listarServicos();
        } catch (error) {
          alert('Erro ao buscar serviços.');
        }
      },
  
      async removerServico(id) {
        if (!confirm('Tem certeza que deseja excluir este serviço?')) return;
  
        try {
          await ServicoController.excluirServico(id);
          this.servicos = this.servicos.filter(servico => servico.id !== id);
        } catch (error) {
          alert('Erro ao excluir serviço.');
        }
      },
  
      prepararEdicao(servico) {
        this.novoServico = { ...servico }; // Copia os dados do serviço para edição
        this.editando = true;
      },
  
      cancelarEdicao() {
        this.novoServico = { id: null, nome: '', preco: '' };
        this.editando = false;
      }
    },
    mounted() {
      this.carregarServicos();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background: #f1f8e9;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2, h3 {
    text-align: center;
  }
  
  .btn-success {
    width: 100%;
  }
  
  .btn-warning, .btn-danger {
    min-width: 75px;
  }
  </style>
  