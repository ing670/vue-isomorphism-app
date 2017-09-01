/**
 * Created by sdsd on 2017/7/11.
 */
// import Types from "./motations-types"
import axios from "axios"
var baseUrl=typeof host == "undefined"?global.host:host

var articel = {
    state: {
        lists: [],
        categorys: [],
        articelDetial: null
    },
    actions: {
        GET_ARTICLE_DATA: (store,{path}) => {
            return new Promise((resolve,reject)=>{
                console.log("path",`${baseUrl}/api${path}`)
                axios.get(`${baseUrl}/api${path}`).then((res)=>{
                    store.commit('UPDATE_ARTICLE_DETAIL', res.data.data)
                    resolve()
                })
            })
        },
        GET_HOME_DATA: (store, args) => {
            return Promise.all([store.dispatch("GET_CATEGORYS"), store.dispatch("GET_ARTICELS")])

        },
        GET_CATEGORYS: (store, args) => {
            return new Promise((resolve, reject) => {
                axios.get(baseUrl + '/api/categorys').then(function (res) {
                    store.commit('UPDATE_CATEGORYS', res.data.data)
                    resolve()
                }).catch(err => console.log(err));
            })
        },
        GET_ARTICELS: (store, args) => {
            return new Promise((resolve, reject) => {
                axios.get(baseUrl + '/api/articles').then(function (res) {
                    store.commit('UPDATE_ARTICELS', res.data.data)
                    resolve()
                }).catch(err => console.log(err));
            })
        }
    },
    mutations: {
        UPDATE_ARTICLE_DETAIL:(state, args)=>{
            state.articelDetial = args;
        },
        UPDATE_CATEGORYS: (state, args) => {
            state.categorys = args;
        },
        UPDATE_ARTICELS: (state, args) => {
            state.lists = [].concat(args);
        }
    }

}
export  default articel
