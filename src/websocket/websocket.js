import store from '../store/index.js'
import {getOnlineUsers} from '../api/user.js'
const initWebsocketServer = (name,token) => {
        const ws = new WebSocket("ws://10.18.82.22:5050?" + token)
        ws.onopen = () => {
            console.info(`%c-- ${name} websocket connected --`,'color:green');
        }
        ws.onclose = () => {
            console.warn('ws连接已断开！')
        }
        ws.onerror = () => {
            console.warn('ws连接异常！')
        }
        ws.onmessage =async (e) => {
            let message = JSON.parse(e.data)
            if (message.type === 'OPERATION') {
                await getOnlineUsers().then((data) => {
                    store.commit('updateOnlineUser', data.data.filter((item) => item !== store.state.user))
                })
            }
            store.commit('updateDialogs',message)
        }
        return ws
}
    
export default initWebsocketServer