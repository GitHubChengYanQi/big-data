import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/UserInfo'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userInfo,
    },
})
