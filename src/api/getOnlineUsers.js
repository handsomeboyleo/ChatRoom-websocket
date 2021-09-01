import store from '../store/index.js'
/**
 * 获取当前所有在线用户
 * @returns store.onlineUser
 */
const getOnlineUsers = () => fetch("http://127.0.0.1:5050/getOnlineUsers", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json;charset=UTF-8",
        },
    }).then((res) => res.json())
    .then((data) => {
        store.commit('updateOnlineUser', data.data.filter((item) => item !== store.state.user))
    })
export default getOnlineUsers