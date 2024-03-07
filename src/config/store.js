import { createStore } from 'vuex'
// import axios from 'axios'

// Vuex para criação de "global state" da aplicação
export default createStore({
    state() {
        return {
            user: null
        }
    },
    // {mutations} -> métodos para manipulação do estado
    mutations: {
        setUser(state, user) {
            state.user = user
            // if (user) {
            //     axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            //     state.menuVisible = true
            // } else {
            //     delete axios.defaults.headers.common['Authorization']
            //     state.menuVisible = false
            // }
        }
    }
})