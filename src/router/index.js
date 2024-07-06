import { createRouter, createWebHashHistory } from 'vue-router';
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
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vue App';
  next();
});

export default router;