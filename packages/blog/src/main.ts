import { createApp } from 'vue'
import App from './App.vue'
import route from './route'
import './style/index.css'

const app = createApp(App)
app.use(route)
app.mount('#app')
