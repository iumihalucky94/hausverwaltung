// import NavBar from '@/components/Static/StaticNavBar.vue'
// import Header from '@/views/TheHomePage.vue'

import Home from '@/view/Home.vue'
// import Calendar from '@/view/TheCalendar.vue'
import TheNavBar from '@/components/static/TheNavBar.vue'
import TheTasks from '@/view/TheTasks.vue'
import TheObjekts from '@/view/TheObjekts.vue'

export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        components: {
            nav: TheNavBar,
            main: Home,
            // footer:,
        }
    },
    {
        path: '/tasks',
        name: 'Tasks',
        components: {
            nav: TheNavBar,
            main: TheTasks,
            // footer:,
        }
    },
    {
        path: '/list',
        name: 'List',
        components: {
            nav: TheNavBar,
            main: TheTasks,
            // footer:,
        }
    },
    {
        path: '/objects',
        name: 'Objekte',
        components: {
            nav: TheNavBar,
            main: TheObjekts,
            // footer:,
        }
    }
]