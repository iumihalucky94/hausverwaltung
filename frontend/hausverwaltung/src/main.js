import { createApp } from 'vue'
import App from './App.vue'
// Import additional scripts
import router from './router/router.js'

// Import Styles and Icons
import './style.css'
import './index.css'

// Datepicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// Modal windows
import TheDeleteModal from '@/components/modal/TheModalDelete.vue';
import TheEditModal from '@/components/modal/TheModalEdit.vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import list of icons
import { faCaretDown, faCaretUp, faUserSecret, faArrowRightFromBracket, faHouse, faListCheck, faTrash, faXmark, faTriangleExclamation, faCircleExclamation, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import axiosInstance from './utils/axios'


// Adding icon to usage library
library.add(faCaretDown, faCaretUp, faUserSecret, faArrowRightFromBracket, faHouse, faListCheck, faTrash, faXmark, faTriangleExclamation, faCircleExclamation, faQuestionCircle)

// const apiURL = 'http://hausverwaltung.immg.tech/api/'

const app = createApp(App)

// BACK end URL for entire app
// app.config.globalProperties.$apiURL = apiURL;
// How to use: this.$apiURL
app.config.globalProperties.$axios = axiosInstance;

app.component('fai', FontAwesomeIcon)
app.component('TheDeleteModal', TheDeleteModal);
app.component('TheEditModal', TheEditModal);
app.component('VueDatePicker', VueDatePicker);

// app.use(axios)
app.use(router)
app.mount('#app')
