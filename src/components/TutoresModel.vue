<template>
  <v-container>
    <v-alert v-if="error" type="error" closable class="mb-4">
      {{ error }}
    </v-alert>

    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Tutores</span>
        <v-btn color="primary" @click="openDialog()">Adicionar Tutor</v-btn>
      </v-card-title>

      <v-card-text>
        <v-table>
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
                <v-btn icon="mdi-pencil" size="small" color="warning" @click="openDialog(tutor)" class="mr-2" />
                <v-btn icon="mdi-delete" size="small" color="error" @click="confirmarDelete(tutor)" class="mr-2" />
                <v-btn icon="mdi-eye" size="small" color="info" @click="verDetalhes(tutor)" />
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <!-- Dialog de adicionar/editar -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="editedItem.nome" label="Nome" required />
            <v-text-field v-model="editedItem.telefone" label="Telefone" required />
            <v-text-field v-model="editedItem.endereco" label="Endereço" required />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" text @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de detalhes -->
    <v-dialog v-model="dialogDetails" max-width="500px">
      <v-card>
        <v-card-title>Detalhes do Tutor</v-card-title>
        <v-card-text>
          <p><strong>ID:</strong> {{ selectedTutor.id }}</p>
          <p><strong>Nome:</strong> {{ selectedTutor.nome }}</p>
          <p><strong>Telefone:</strong> {{ selectedTutor.telefone }}</p>
          <p><strong>Endereço:</strong> {{ selectedTutor.endereco }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="dialogDetails = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TutoresModel',
  data() {
    return {
      tutores: [],
      dialog: false,
      dialogDetails: false,
      valid: true,
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
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      try {
        if (this.editedIndex > -1) {
          await axios.put(`/Tutor/${this.editedItem.id}`, this.editedItem);
          Object.assign(this.tutores[this.editedIndex], this.editedItem);
        } else {
          //Enviando apenas nome, telefone e endereço (sem ID)
          const response = await axios.post('/Tutor', {
            nome: this.editedItem.nome,
            telefone: this.editedItem.telefone,
            endereco: this.editedItem.endereco
          });
          this.tutores.push(response.data);
        }
        this.closeDialog();
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || "Erro ao salvar tutor.";
      }
    },
    async verDetalhes(item) {
      try {
        const response = await axios.get(`/Tutor/${item.id}`);
        this.selectedTutor = response.data;
        this.dialogDetails = true;
      } catch (error) {
        this.error = error.message;
      }
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
  }
};
</script>
