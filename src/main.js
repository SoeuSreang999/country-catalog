import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFlag, faList, faRegistered, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes)
library.add(faFlag)
library.add(faRegistered)
library.add(faList)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
