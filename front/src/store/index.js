import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import user from './user'
import post from './post'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
      modules: {
          home,
          user,
          post
      },



  })
}
