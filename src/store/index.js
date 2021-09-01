import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        dialogs: [],
        user: {},
        selectTargetUser: 'everyone',
        onlineUser: [],
        isLogin:false
    },
    mutations: {
        updateDialogs(state, payload) {
            state.dialogs.push(payload)
        },
        loginChatroom(state, payload) {
            state.user = payload
            state.isLogin=true
        },
        logoutChatroom(state){
            state.user=null
            state.isLogin=false
        },
        selectTargetUser(state,payload) {
            state.selectTargetUser=payload
        },
        updateOnlineUser(state, payload) {
            state.onlineUser=payload
        }
    }
})

export default store