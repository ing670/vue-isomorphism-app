/**
 * Created by sdsd on 2017/7/11.
 */
// import Types from "./motations-types"
import axios from "axios"
import Vue from 'vue'
var baseUrl=typeof host == "undefined"?global.host:host
var articel = {
    state: {
        lists: [],
        tags: [],
        articelDetial: null
    },
    actions: {
        GET_ARTICLE_DATA: (store,{path}) => {
            return new Promise((resolve,reject)=>{
                axios.get(`${baseUrl}/api${path}`).then((res)=>{
                    store.commit('UPDATE_ARTICLE_DETAIL', res.data.data)
                    resolve()
                })

            })
        },
        ARTICLE_LIKE(store,params){
            return new Promise((resolve, reject) => {
                axios.patch(baseUrl + `/api/article/${params.id}?token=${params.token}`,params.data).then(function (res) {
                    console.log(res)
                    let data = {data:res.data.data,index:params.index};
                    store.commit('UPDATE_ARTICLE_LIST', data)
                    resolve()
                }).catch(err => console.log(err));
            })
        },
        GET_HOME_DATA: (store, args) => {
            return Promise.all([store.dispatch("GET_TAGS"), store.dispatch("GET_ARTICLES"),store.dispatch("GET_USER_INFO",args.query.token)])
        },
        GET_TAGS: (store, args) => {
            return new Promise((resolve, reject) => {
                axios.get(baseUrl + '/api/tags').then(function (res) {
                    store.commit('UPDATE_TAG', res.data.data)
                    resolve()
                }).catch(err => console.log(err));
            })
        },
        GET_ARTICLES: (store, args) => {
            return new Promise((resolve, reject) => {
                axios.get(baseUrl + '/api/articles').then(function (res) {
                    store.commit('UPDATE_ARTICLES', res.data.data)
                    resolve()
                }).catch(err => console.log(err));
            })
        },

    },
    mutations: {

        UPDATE_ARTICLE_DETAIL:(state, args)=>{
            state.articelDetial = args;
        },
        UPDATE_TAG: (state, args) => {
            state.tags = args;
        },
        UPDATE_ARTICLE_LIST:(state,args)=>{
            Vue.set(state.lists,args.index,args.data)
        },
        UPDATE_ARTICLES: (state, args) => {
            state.lists = args?[].concat(args):[];
        }
    }

}
export  default articel
