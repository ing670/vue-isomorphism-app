import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
// const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
// const ItemView = () => import('../views/ItemView.vue')
// const UserView = () => import('../views/UserView.vue')
const Home = () => import('../views/Home.vue')
const Article = () => import('../views/Article.vue')
const Main = () => import('../views/Main.vue')
const Post = () => import('../views/Post.vue')

export function createRouter() {
    return new Router({
        mode: 'history',
        scrollBehavior: () => ({y: 0}),
        routes: [
            {
                path: '/', component: Main,
                children: [
                    {path: '/article/:id', component: Article},
                    {path: '/', component: Home},
                ]
            },
            {
                path: '/post', component: Post,

            },
        ]
    })
}
