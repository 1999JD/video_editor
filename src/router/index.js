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
        name: 'Upload',
        component: () => import('@/components/Upload.vue')
      },
      {
        path: 'record',
        name: 'Record',
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