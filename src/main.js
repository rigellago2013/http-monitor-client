import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import { BootstrapVue3 } from 'bootstrap-vue-3';

createApp(App)
  .use(BootstrapVue3)
  .use(router)
  .use(store)
  .mount('#app');
