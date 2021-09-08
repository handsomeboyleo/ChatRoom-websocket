import store from '../store/index.js'
import { api } from './api.js'
/**
 * 获取当前所有在线用户
 * @returns store.onlineUser
 */
const getOnlineUsers = () => api("/getOnlineUsers")
    .then((data) => {
        store.commit('updateOnlineUser', data.data.filter((item) => item !== store.state.user))
    })
export default getOnlineUsers