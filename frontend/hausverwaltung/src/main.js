import { createApp } from 'vue'
import App from './App.vue'
// Import additional scripts
import router from './router/router.js'

// Import Styles and Icons
import './style.css'
import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import list of icons
import { faUserSecret, faArrowRightFromBracket, faHouse, faListCheck } from '@fortawesome/free-solid-svg-icons'

// Adding icon to usage library
library.add(faUserSecret, faArrowRightFromBracket, faHouse, faListCheck)

/* add font awesome icon component */


const app = createApp(App)

app.component('fai', FontAwesomeIcon)

app.use(router)
app.mount('#app')
