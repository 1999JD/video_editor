import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index.vue'),
  },

  {
    path: '/choose',
    name: 'Choose',
    component: () => import('@/pages/choose.vue'),
    children: [
      {
        path: 'upload',
        component: () => import('@/components/Upload.vue')
      },
      {
        path: 'record',
        component: () => import('@/components/Record.vue')
      },
    ]
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('@/pages/edit.vue'),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router