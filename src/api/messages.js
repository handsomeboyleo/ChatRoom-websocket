import  api  from "./api"

// 获取所有用户聊天记录
export const getAllMessageList = () => api.get("/getAllMessagesList")

/**
  * 获取指定用户聊天记录
  * @param {string} name
  * @param {string} selectTargetUser
*/
export const getRecentMessages = (name,selectTargetUser) => api.post("/getRecentMessages", {
         name:name,
         target:selectTargetUser
 })
