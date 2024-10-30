import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';

const routes = [
  { path: '/', name: 'DashboardView', component: DashboardView },
];

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
