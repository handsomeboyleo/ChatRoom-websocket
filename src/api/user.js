import api from "./api";

 /**
 * 用户登录
  * @param {string} account
  * @param {string} password
 */
export const userLogin = (account, password) => api.post("/login", {
    account: account,
    password: password
})

//使用token登录
export const tokenLogin = () => api.get('/tokenLogin')

/**
  * 用户注册
  * @param {string} email
  * @param {string} mobile
  * @param {string} userName
  * @param {string} password
  */
export const userRegister = (email,mobile,userName,password) => api.post("/register", {
         email,
         mobile,
         userName,
         password
 })

//获取当前所有在线用户
export const getOnlineUsers = () => api.get("/getOnlineUsers")