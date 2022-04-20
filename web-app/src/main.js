import { createApp } from 'vue'
import App from './App.vue'

//vue ecosystem
import router from './router'
import store from './store'

//styles
import '../main.css'
import 'tippy.js/dist/tippy.css';
import 'tabulator-tables/dist/css/tabulator.css';

createApp(App)
.use(router)
.use(store)
.mount('#app')
