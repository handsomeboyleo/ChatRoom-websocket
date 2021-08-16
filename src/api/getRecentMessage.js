 /**
  * 获取指定用户聊天记录
  * @returns store.dialogs
  */
 const getRecentMessages = (name) => fetch("http://127.0.0.1:8000/getRecentMessages", {
     method: "POST",
     mode: "cors",
     headers: {
         "Content-Type": "application/json",
         Accept: "application/json;charset=UTF-8",
     },
     body:JSON.stringify({
         name:name
     })
 }).then((res) => res.json())

 export default getRecentMessages