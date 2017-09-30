/**
 * Created by sdsd on 2017/9/1.
 */
import axios from "axios"

var baseUrl = typeof host == "undefined" ? global.host : host
const inBrowser = typeof window !== 'undefined';

export default {

    state: {
        info: null,
    },
    actions: {
        LOGIN: (store, user) => {
            return new Promise((resolve, reject) => {
                // console.log(user)
                axios.post(`${baseUrl}/api/login`, user).then((res) => {
                    store.commit('UPDATE_USER_INFO', res.data.data)
                    // axios.defaults.headers
                    //     .common['authorization'] = res.data.data.token;
                    // inBrowser && localStorage.setItem('token', res.data.data.token)
                    resolve()
                })
            })
        },
        LOGOUT(store,token) {
            return new Promise((resolve, reject) => {
                axios.get(`${baseUrl}/api/logOut`,{
                    params: {token: token}
                }).then((res) => {
                    store.commit('UPDATE_USER_INFO', null)
                    resolve()
                })
            })
        },
        GET_USER_INFO(store, token) {
            return new Promise((resolve, reject) => {
                axios.get(`${baseUrl}/api/getUserInfo`, {
                    params: {token: token}
                }).then((res) => {
                    store.commit('UPDATE_USER_INFO', res.data.data)
                    resolve()
                })
            })
        },
        REGISTER: (store,user) => {
            return new Promise(async (resolve, reject) => {
                console.log(user)
                let res = await axios.post(`${baseUrl}/api/register`, user)
                resolve(res)
            })
        },

    },
    mutations: {
        UPDATE_USER_INFO: (state, user) => {
            state.info = user;
        }
    }
}