import { api } from "./api"
 /**
  * 用户注册
  * @returns store.dialogs
  */
 const userRegister = (email,mobile,userName,password) => api("/register", {
     method: "POST",
     body:{
         email,
         mobile,
         userName,
         password
     }
 })

 export default userRegister