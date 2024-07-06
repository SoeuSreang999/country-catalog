import { createRouter, createWebHistory } from 'vue-router';
import ContryCatalogView from '../views/ContryCatalogView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: ContryCatalogView,
    meta: {
      title: 'Country Catalog'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vue App';
  next();
});

export default router;