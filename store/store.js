import { createStore } from "vuex";
import axios from '../src/axios-auth'

const store = createStore({
    state() {
        return {
            token: null,
            username: null
        }

    },
    getters: {

    },
    mutations: {
        authenticateUser(state, parameters) {
            state.token = parameters.token,
                state.username = parameters.username
        }
    },
    actions: {
        login({ commit }, parameters) {
            return new Promise((resolve, reject) => {
                axios.post('/users/login', {
                        username: parameters.username,
                        password: parameters.password,
                    })
                    .then(result => {
                        axios.defaults.headers.common['Authorization'] =
                            `Bearer ${result.data.JWT}`
                        localStorage.setItem('token', result.data.JWT);
                        localStorage.setItem('username', result.data.JWT);
                        commit('AuthenticateUser', result.data);
                        resolve();
                    })
                    .catch(error => reject(error));
            })
        },
        autoLogin({ commit }) {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

            if (token && username) {
                axios.defaults.headers.common['Authorization'] = "Bearer" + token
            }

            commit('authenticateUser', {
                token: token,
                username: username,
            })
        }
    },

})

export default store;