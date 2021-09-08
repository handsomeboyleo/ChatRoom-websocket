import { api } from "./api"

 /**
  * 用户登录
  * @returns store.dialogs
  */
 const userLogin = (account, password) => api("/login", {
     method: "POST",
     body:{
         account:account,
         password:password
     }
 })

 export default userLogin