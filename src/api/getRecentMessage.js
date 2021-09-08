import { api } from "./api"

 /**
  * 获取指定用户聊天记录
  * @returns store.dialogs
  */
 const getRecentMessages = (name,selectTargetUser) => api("/getRecentMessages", {
     method: "POST",
     body:{
         name:name,
         target:selectTargetUser
     }
 })

 export default getRecentMessages