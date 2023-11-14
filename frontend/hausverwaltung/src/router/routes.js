// import NavBar from '@/components/Static/StaticNavBar.vue'
// import Header from '@/views/TheHomePage.vue'

import Home from '@/view/Home.vue'
import Calendar from '@/view/TheCalendar.vue'

export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        components: {
            // nav: NavBar,
            main: Home,
            // footer:,
        }
    },
    {
        path: '/calendar',
        name: 'Calendar',
        components: {
            // nav: NavBar,
            main: Calendar,
            // footer:,
        }
    }
]