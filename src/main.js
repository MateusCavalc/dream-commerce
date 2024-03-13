import { createApp } from 'vue'
import App from './App.vue'

import './index.css'

import store from '@/config/store'
import router from '@/config/router'
import addIcons from '@/config/icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@/config/interceptors'

addIcons()

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)

app.use(store)
app.use(router)

app.mount('#app')
