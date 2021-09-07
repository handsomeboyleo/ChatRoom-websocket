 /**
  * 用户登录
  * @returns store.dialogs
  */
 const userLogin = (account, password) => fetch("http://127.0.0.1:5050/login", {
     method: "POST",
     mode: "cors",
     headers: {
         "Content-Type": "application/json",
         Accept: "application/json;charset=UTF-8",
     },
     body:JSON.stringify({
         account:account,
         password:password
     })
 }).then((res) => res.json())

 export default userLogin