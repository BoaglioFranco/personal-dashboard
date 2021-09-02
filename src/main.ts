import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

createApp(App).use(createPinia()).use(router).mount('#app')
