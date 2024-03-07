import {
    createRouter
    , createWebHistory
} from 'vue-router'

import frontPage from '@/components/pages/FrontPage.vue'
import signIn from '@/components/pages/SignIn.vue'

const routes = [{
    name: 'signin',
    path: '/signin',
    component: signIn
}, {
    name: 'home',
    path: '/',
    component: frontPage
}]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router