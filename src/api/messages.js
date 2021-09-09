import  api  from "./api"

/**
 * 获取所有用户聊天记录
 */
export const msgGetAllMessageList = () => api.get("/getAllMessagesList")

/**
  * 获取指定用户聊天记录
  * @param {string} name
  * @param {string} selectTargetUser
  */
export const msgGetRecentMessages = (name,selectTargetUser) => api.post("/getRecentMessages", {
    name:name,
    target:selectTargetUser
})
