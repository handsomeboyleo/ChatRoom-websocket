import store from '../store/index.js'
import getOnlineUsers from '../api/getOnlineUsers.js'
const initWebsocketServer = (name) => {
        const ws = new WebSocket("ws://10.18.82.22:8000?" + name)
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
                await getOnlineUsers()
            }
            store.commit('updateDialogs',message)
        }
        return ws
}
    
export default initWebsocketServer