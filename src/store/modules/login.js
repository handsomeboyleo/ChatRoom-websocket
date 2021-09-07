export const moduleLogin = {
    state: () => ({
        user: {},
        onlineUser: [],
        isLogin: false
    }),
    mutations: {
        loginChatroom(state, payload) {
            state.user = payload
            state.isLogin = true
        },
        logoutChatroom(state) {
            state.user = null
            state.isLogin = false
        },
        updateOnlineUser(state, payload) {
            state.onlineUser = payload
        }
    },
    actions: {},
    getters: {},
};