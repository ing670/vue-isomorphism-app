/**
 * Created by sdsd on 2017/9/7.
 */
/**
 * Created by sdsd on 2017/7/11.
 */
// import Types from "./motations-types"
import axios from "axios"
var baseUrl=typeof host == "undefined"?global.host:host
var articel = {
    state: {
        myList:[],
        myTags:[],
    },
    actions: {

        GET_MY_TAGS: (store, token) => {
            return new Promise((resolve, reject) => {
                axios.get(baseUrl + `/api/tag?token=${token}`).then(function (res) {
                    store.commit('UPDATE_MY_TAG', res.data.data)
                    resolve()
                }).catch(err => console.log(err));
            })
        },

        GET_MY_ARTICLES: (store, token) => {
            return new Promise((resolve, reject) => {
                axios.get(baseUrl + `/api/myArticles?token=${token}`).then(function (res) {
                    store.commit('UPDATE_MY_ARTICLES', res.data.data)
                    resolve()
                }).catch(err => console.log(err));
            })
        }
    },
    mutations: {
        UPDATE_MY_ARTICLES:(state, args)=>{
            state.myList = args||[];
        },
        UPDATE_MY_TAG: (state, args) => {
            state.myTags = args;
        },

    }

}
export  default articel
