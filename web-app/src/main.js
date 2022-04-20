import { createApp } from 'vue'
import App from './App.vue'

//vue ecosystem
import router from './router'
import store from './store'

//styles
import '../main.css'
import 'tippy.js/dist/tippy.css';
import 'tabulator-tables/dist/css/tabulator.css';

// global components
import TextBlock from './components/TextBlock.vue'

createApp(App)
.use(router)
.use(store)
.component('TextBlock', TextBlock)
.mount('#app')
