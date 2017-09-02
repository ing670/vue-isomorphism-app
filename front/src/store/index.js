import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import user from './user'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
      modules: {
          home,
          user
      },



  })
}
