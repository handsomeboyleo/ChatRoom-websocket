 /**
  * 用户注册
  * @returns store.dialogs
  */
 const userRegister = (email,mobile,userName,password) => fetch("http://127.0.0.1:5050/register", {
     method: "POST",
     mode: "cors",
     headers: {
         "Content-Type": "application/json",
         Accept: "application/json;charset=UTF-8",
     },
     body:JSON.stringify({
         email,
         mobile,
         userName,
         password
     })
 }).then((res) => res.json())

 export default userRegister