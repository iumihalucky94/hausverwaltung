// import NavBar from '@/components/Static/StaticNavBar.vue'
// import Header from '@/views/TheHomePage.vue'

import Home from '@/view/Home.vue'
// import Calendar from '@/view/TheCalendar.vue'
import TheNavBar from '@/components/static/TheNavBar.vue'
import TheTasks from '@/view/TheTasks.vue'

import TheObjekts from '@/view/object/TheObjekts.vue'
import TheCreateObject from '@/view/object/TheCreateObject.vue'
import TheEditObject from '@/view/object/TheEditObject.vue'

import TheLogin from '@/view/TheLogin.vue'

import TheMandantList from '@/view/mandant/TheMandants.vue'

import TheSupplierList from '@/view/supplier/TheSupplierList.vue'
import TheCreateNewSupplier from '@/components/static/tables/supplier/create/TheCreateNewSupplier.vue'

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
            // footer:1,
        }
    },
    // Objects 
    {
        path: '/objects',
        name: 'Objekte',
        components: {
            nav: TheNavBar,
            main: TheObjekts,
            // footer:,
        },
    },
    {
        path: '/objects/edit/:object_id',
        name: 'Edit_object',
        components: {
            nav: TheNavBar,
            main: TheEditObject
        }
    },
    {
        path: '/objects/create',
        name: 'Create_object',
        components: {
            nav: TheNavBar,
            main: TheCreateObject
        }
    },
    // Mandants
    {
        path: '/mandant',
        name: 'Mandant_List',
        components: {
            nav: TheNavBar,
            main: TheMandantList,
            // footer:,
        },
    },
    {
        path: '/mandant/edit/:object_id',
        name: 'Mandant_Edit',
        components: {
            nav: TheNavBar,
            main: TheMandantList,
            // footer:,
        },
    },
    {
        path: '/mandant/create/:object_id',
        name: 'Mandant_Create',
        components: {
            nav: TheNavBar,
            main: TheMandantList,
            // footer:,
        },
    },
    // Suppliers
    {
        path: '/supplier/list',
        name: 'supplier_list',
        components: {
            nav: TheNavBar,
            main: TheSupplierList,
            // footer:,
        },
    },
    {
        path: '/supplier/create_new',
        name: 'create_supplier',
        components: {
            nav: TheNavBar,
            main: TheCreateNewSupplier,
            // footer:,
        },
    },
    {
        path: '/login',
        name: 'Login',
        components: {
            main: TheLogin,
        }
    }
]