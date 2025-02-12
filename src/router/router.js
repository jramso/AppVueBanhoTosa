import { createRouter, createWebHistory } from 'vue-router';

// Importando os componentes
import HomePage from '../components/HomePage.vue';
import AgendamentoForm from '../components/Agendamento/AgendamentoForm.vue';
import AnimalForm from '../components/Animal/AnimalForm.vue';
import ServicoConfig from '../components/Servico/ServicoConfig.vue';
import TutorForm from '../components/Tutor/TutorForm.vue';
import AnimaisModel from '../components/AnimaisModel.vue';
import TutoresModel from '../components/Tutor/TutoresModel.vue';

const routes = [
  { path: '/', redirect: '/home' },  // Redireciona para a Home
  { path: '/home', component: HomePage }, // Adicionando a Home
  { path: '/agendamento', component: AgendamentoForm },
  { path: '/animais', component: AnimalForm },
  { path: '/servicos', component: ServicoConfig },
  { path: '/tutores', component: TutoresModel },
  { path: '/animais-model', component: AnimaisModel },
  { path: '/tutores-cad', component: TutorForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
