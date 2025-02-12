// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import TutoresModel from '../components/TutoresModel.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tutores',
    name: 'Tutores',
    component: TutoresModel
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
