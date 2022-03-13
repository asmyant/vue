import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import svg4everybody from 'svg4everybody';
import App from './App.vue';
import store from './store';
import '@/assets/scss/style.scss';

createApp(App)
  .use(store)
  .use(Toast)
  .use(svg4everybody)
  .mount('#app');
