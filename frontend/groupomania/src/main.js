import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import router from './router';
import store from './store';
import './styles/app.css';



createApp(App).use(router).use(store).use(Vuex).mount('#app')
