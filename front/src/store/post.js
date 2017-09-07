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
        // GET_POST_DATA(store, route){
        //     return new Promise((resolve)=>{
        //         Promise.all([store.dispatch('GET_USER_INFO', route.query.token), store.dispatch('GET_MY_ARTICLES', route.query.token)]).then(()=>resolve())
        //     })
        // },
        GET_MY_TAGS: (store, token) => {
            return new Promise((resolve, reject) => {
                axios.get(baseUrl + `/api/tag?token=${token}`).then(function (res) {
                    store.commit('UPDATE_MY_TAG', res.data.data)
                    resolve()
                }).catch(err => console.log(err));
            })
        },
        ADD_MY_ARTICLE:(store, token)=>{
            return new Promise((resolve, reject) => {
               let at={
                   'title': "无标题",
                   'content': "写点什么呢...",
                   'tags': [],
                   // 'author':'59b0c3f339b75522048d4590',
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
                    store.commit('UPDATE_MY_ARTICLES', res.data.data)
                    resolve()
                }).catch(err => console.log(err));
            })
        }
    },
    mutations: {
        ADD_MY_ARTICLES:(state,article)=>{
            state.myList.unshift(article)
        },
        UPDATE_MY_ARTICLES:(state, args)=>{
            state.myList = args||[];
            console.log("dadadadadadadada",state.myList.length)

        },
        UPDATE_MY_TAG: (state, args) => {
            state.myTags = args;
        },

    }

}
export  default articel
