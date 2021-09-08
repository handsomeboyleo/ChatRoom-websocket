import { api } from "./api"

 /**
  * 获取所有用户聊天记录
  * @returns store.dialogs
  */
 const getAllMessageList = () => api("/getAllMessagesList")

 export default getAllMessageList