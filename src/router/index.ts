import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/',
            component: () => import('@/view/HomeView.vue')
        },
        {
            path: '/agendamento',
            component: () => import('@/view/AgendamentoView.vue')
        },
        {
            path: '/animal',
            component: () => import('@/view/Animal.vue')
        },
        {
            path: '/servico',
            component: () => import('@/view/Servico.vue')
        },
        {
            path: '/tutor',
            component: () => import('@/view/Tutor.vue')
        },
    ]
});

export default router;