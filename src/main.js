import { createApp } from 'vue'
import App from './App.vue'

import './index.css'

import store from '@/config/store'
import router from '@/config/router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faDolly, faArrowsRotate, faMapPin, faPhone, faCaretRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { faComments, faCreditCard, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

library.add(
    faMagnifyingGlass, faCreditCard, faDolly,
    faArrowsRotate, faComments, faMapPin,
    faEnvelope, faPhone, faCaretRight,
    faAnglesRight, faTwitter, faFacebook,
    faLinkedin, faInstagram, faYoutube
)

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)

app.use(store)
app.use(router)

app.mount('#app')
