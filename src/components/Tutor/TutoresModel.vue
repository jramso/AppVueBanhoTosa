<template>
  <div class="container mt-4">
    <!-- Alerta de erro -->
    <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ error }}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>

    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Tutores</h5>
        <button class="btn btn-primary" @click="openDialog()" data-bs-toggle="modal" data-bs-target="#tutorModal">
          Adicionar Tutor
        </button>
      </div>

      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tutor in tutores" :key="tutor.id">
              <td>{{ tutor.nome }}</td>
              <td>{{ tutor.telefone }}</td>
              <td>{{ tutor.endereco }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="openDialog(tutor)">
                  ✏️
                </button>
                <button class="btn btn-danger btn-sm me-2" @click="confirmarDelete(tutor)">
                  🗑️
                </button>
                <button class="btn btn-info btn-sm" @click="verDetalhes(tutor)">
                  👁️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de adicionar/editar tutor -->
    <div class="modal fade" id="tutorModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ formTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Nome</label>
                <input type="text" class="form-control" v-model="editedItem.nome" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Telefone</label>
                <input type="text" class="form-control" v-model="editedItem.telefone" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Endereço</label>
                <input type="text" class="form-control" v-model="editedItem.endereco" required />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-primary" @click="save">Salvar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de detalhes -->
    <div class="modal fade" id="detailsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalhes do Tutor</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p><strong>ID:</strong> {{ selectedTutor.id }}</p>
            <p><strong>Nome:</strong> {{ selectedTutor.nome }}</p>
            <p><strong>Telefone:</strong> {{ selectedTutor.telefone }}</p>
            <p><strong>Endereço:</strong> {{ selectedTutor.endereco }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as bootstrap from 'bootstrap';

export default {
  name: 'TutoresModel',
  data() {
    return {
      tutores: [],
      error: null,
      editedIndex: -1,
      editedItem: { nome: '', telefone: '', endereco: '' },
      selectedTutor: { id: null, nome: '', telefone: '', endereco: '' },
      defaultItem: { nome: '', telefone: '', endereco: '' },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Tutor' : 'Editar Tutor';
    },
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const response = await axios.get('/Tutor');
        this.tutores = response.data;
      } catch (error) {
        this.error = error.message;
      }
    },
    openDialog(item) {
      if (item) {
        this.editedIndex = this.tutores.findIndex(t => t.id === item.id);
        this.editedItem = Object.assign({}, item);
      } else {
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.defaultItem);
      }

      const modalElement = document.getElementById('tutorModal');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    },
    async save() {
      try {
        if (this.editedIndex > -1) {
          await axios.put(`/Tutor/${this.editedItem.id}`, this.editedItem);
          Object.assign(this.tutores[this.editedIndex], this.editedItem);
        } else {
          const response = await axios.post('/Tutor', this.editedItem);
          this.tutores.push(response.data);
        }
        this.closeModal('tutorModal');
      } catch (error) {
        this.error = error.response?.data?.message || 'Erro ao salvar tutor.';
      }
    },
    verDetalhes(item) {
      this.selectedTutor = { ...item };
      const modalElement = document.getElementById('detailsModal');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    },
    async confirmarDelete(item) {
      if (confirm(`Tem certeza que deseja excluir o tutor ${item.nome}?`)) {
        try {
          await axios.delete(`/Tutor/${item.id}`);
          this.tutores = this.tutores.filter(t => t.id !== item.id);
        } catch (error) {
          this.error = error.message;
        }
      }
    },
    closeModal(modalId) {
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
      }
    },
  },
};
</script>
