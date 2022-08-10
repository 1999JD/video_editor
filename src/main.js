import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import '@/assets/index.scss'

const pinia = createPinia()

const app = createApp(App)
app
  .use(pinia)
  .use(router)
  .mount('#app')
