/**
 * Created by sdsd on 2017/9/1.
 */
import axios from "axios"
var baseUrl=typeof host == "undefined"?global.host:host
export default {

    state: {
        info:null
    },
    actions: {
        LOGIN: (store,user) => {
            return new Promise((resolve,reject)=>{
                console.log(user)
                axios.post(`${baseUrl}/api/login`,user).then((res)=>{
                    store.commit('UPDATE_USER_INFO', res.data.data)
                    resolve()
                })
            })
        },
        LOGOUT(store){
            return new Promise((resolve,reject)=>{
                axios.get(`${baseUrl}/api/logOut`).then((res)=>{
                    store.commit('UPDATE_USER_INFO', null)
                    resolve()
                })
            })
        },
        GET_USER_INFO(store){
            return new Promise((resolve,reject)=>{
                axios.get(`${baseUrl}/api/getUserInfo`).then((res)=>{
                    store.commit('UPDATE_USER_INFO', res.data.data)
                    resolve()
                })
            })
        },
        REGISTER:()=>{

        },

    },
    mutations: {
        UPDATE_USER_INFO:(state,user)=>{
            state.info =user;
        }
    }
}