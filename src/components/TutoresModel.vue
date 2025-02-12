<template>
  <v-container>
    <v-alert
      v-if="error"
      type="error"
      closable
      class="mb-4"
    >
      {{ error }}
    </v-alert>

    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Tutores</span>
        <v-btn
          color="primary"
          @click="openDialog()"
        >
          Adicionar Tutor
        </v-btn>
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
                <v-btn
                  icon="mdi-delete"
                  size="small"
                  color="error"
                  @click="confirmarDelete(tutor)"
                  class="mr-2"
                />
                <v-btn
                  icon="mdi-eye"
                  size="small"
                  color="info"
                  @click="verDetalhes(tutor)"
                />
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <!-- Dialog para adicionar/editar tutor -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="editedItem.nome"
              label="Nome"
              :rules="[v => !!v || 'Nome é obrigatório']"
              required
            />
            <v-text-field
              v-model="editedItem.telefone"
              label="Telefone"
              :rules="[
                v => !!v || 'Telefone é obrigatório',
                v => /^\d{10,11}$/.test(v) || 'Telefone inválido'
              ]"
              required
            />
            <v-text-field
              v-model="editedItem.endereco"
              label="Endereço"
              :rules="[v => !!v || 'Endereço é obrigatório']"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" text @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de confirmação de exclusão -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title>Tem certeza que deseja deletar este tutor?</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" text @click="dialogDelete = false">Não</v-btn>
          <v-btn color="primary" text @click="deleteItemConfirm">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import tutorService from '@/services/tutor.service';
import Tutor from '@/model/Tutor';

export default {
  name: 'TutoresModel',
  
  data() {
    return {
      tutores: [],
      dialog: false,
      dialogDelete: false,
      valid: true,
      error: null,
      editedIndex: -1,
      editedItem: new Tutor(),
      defaultItem: new Tutor(),
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
        this.tutores = await tutorService.getAllTutores();
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },

    openDialog(item) {
      this.editedIndex = -1;
      this.editedItem = new Tutor();
      if (item) {
        this.editedIndex = this.tutores.indexOf(item);
        this.editedItem = Object.assign({}, item);
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
      if (!this.$refs.form.validate()) return;

      try {
        const tutor = await tutorService.addTutor(this.editedItem);
        if (this.editedIndex > -1) {
          Object.assign(this.tutores[this.editedIndex], tutor);
        } else {
          this.tutores.push(tutor);
        }
        this.closeDialog();
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },

    confirmarDelete(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        await tutorService.deleteTutor(this.editedItem.id);
        const index = this.tutores.indexOf(this.editedItem);
        this.tutores.splice(index, 1);
        this.dialogDelete = false;
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },

    async verDetalhes(item) {
      try {
        const tutor = await tutorService.getTutorById(item.id);
        // Aqui você pode implementar a lógica para mostrar os detalhes
        console.log(tutor);
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
