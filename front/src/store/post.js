/**
 * Created by ing670 on 2017/9/7.
 */

import axios from "axios"
var baseUrl=typeof host == "undefined"?global.host:host
var articel = {
    state: {
        myList:[],
        searchTags:[],
        tags:[],
        index:0
    },
    actions: {
        SAVE_ARTICLE(){

        },
        UPLOAD_FILE(store,params){
            return new Promise((resolve,reject)=>{
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                axios.post(baseUrl +`/api/upload`,params,config).then((res)=>{
                    res.data.code ===0&&store.commit("UPDATE_MY_ARTICLE",{data:{cover:res.data.data.cover},index:store.state.index})
                    resolve();
                }).catch(err => console.log(err));
            })
        },
        SEARCH_TAG_LIST(store,keyword){
            return new Promise((resolve,reject)=>{
                axios.get(baseUrl +`/api/searchTag/${keyword}`).then((res)=>{
                    res.data.code == 0&&store.commit('UPDATE_SEARCH_TAG_LIST',res.data.data)
                }).catch(err => console.log(err));
            })
        },
        DELETE_MY_ARTICLE(store, {id,token,index}){
            return new Promise((resolve, reject) => {
                axios.delete(baseUrl + `/api/article/${id}?token=${token}`).then(function (res) {
                    res.data.code == 0&&store.commit('DELETE_MY_ARTICLE',index)
                    resolve()
                }).catch(err => console.log(err));
            })
        },
        GET_MY_TAGS: (store, token) => {
            return new Promise((resolve, reject) => {
                axios.get(baseUrl + `/api/tag?token=${token}`).then(function (res) {
                    store.commit('UPDATE_MY_TAG', res.data.data)
                    resolve()
                }).catch(err => console.log(err));
            })
        },
        UPDATE_MY_ARTICLE:(store,params)=>{
            return new Promise((resolve, reject) => {
                axios.patch(baseUrl + `/api/article/${params.id}?token=${params.token}`,params.data).then(function (res) {
                    let data = {data:res.data.data,index:store.state.index};
                    store.commit('UPDATE_MY_ARTICLE', data)
                    resolve()
                }).catch(err => console.log(err));
            })
        },
        ADD_MY_ARTICLE:(store, token)=>{
            return new Promise((resolve, reject) => {
               let at={
                   'state':0,
                   'title': "我是标题",
                   'content': "写点什么呢...",
                   'tags': [],
                   'cover': "",
                   'createTime': new Date().getTime()
               }
               axios.post(baseUrl + `/api/article?token=${token}`,at).then((res)=>{
                   store.commit('ADD_MY_ARTICLES', res.data.data)
                   resolve()
               })
            })
        },
        GET_MY_ARTICLES: (store, token) => {
            return new Promise((resolve, reject) => {
                axios.get(baseUrl + `/api/myArticles?token=${token}`).then(function (res) {
                    if(res.data.data&&res.data.data.length>0){
                        store.commit('UPDATE_MY_ARTICLES', res.data.data)
                        resolve()
                    }else {
                        console.log("mytoken",token)

                        store.dispatch('ADD_MY_ARTICLE',token).then(()=>{
                            resolve()
                        })
                    }

                }).catch(err => console.log(err));
            })
        }
    },
    mutations: {
        UPDATE_SEARCH_TAG_LIST(state,data){
            state.searchTags  = data;
        },
        DELETE_MY_ARTICLE(state,index){
            state.myList.splice(index,1)
        },
        ADD_MY_ARTICLES:(state,article)=>{
            state.myList.unshift(article)
        },
        UPDATE_MY_ARTICLE:(state,{data,index})=>{
            Object.assign(state.myList[index],data)

        },
        UPDATE_MY_ARTICLES:(state, args)=>{
            if(args&&Array.isArray(args)){
                state.myList = args
            }
        },
        UPDATE_MY_TAG: (state, args) => {
            state.tags = args;
        },

    }

}
export  default articel
