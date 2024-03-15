import {
    createRouter
    , createWebHistory
} from 'vue-router'

import frontPage from '@/components/pages/FrontPage/FrontPage.vue'
import signInPage from '@/components/pages/SignInPage.vue'
import pageContent from '@/components/pages/FrontPage/Content/Content.vue'
import accountContent from '@/components/pages/FrontPage/AccountContent/AccountContent.vue'

const routes = [{
    name: 'signin',
    path: '/signin',
    component: signInPage
}, {
    name: 'home',
    path: '/',
    component: frontPage,
    children: [{
        path: '',
        component: pageContent
    }, {
        path: 'account',
        component: accountContent
    }]
}]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router