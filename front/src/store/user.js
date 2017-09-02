/**
 * Created by sdsd on 2017/9/1.
 */
import axios from "axios"
var baseUrl=typeof host == "undefined"?global.host:host
export default {

    state: {
       user:{},
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
        REGISTER:()=>{

        },
        LOGOUT:()=>{

        }

    },
    mutations: {
        UPDATE_USER_INFO:(state,user)=>{
            state.user = user;
        }
    }
}