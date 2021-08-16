 /**
  * 获取所有用户聊天记录
  * @returns store.dialogs
  */
 const getAllMessageList = () => fetch("http://127.0.0.1:8000/getAllMessagesList", {
     method: "GET",
     mode: "cors",
     headers: {
         "Content-Type": "application/json",
         Accept: "application/json;charset=UTF-8",
     },
 }).then((res) => res.json())

 export default getAllMessageList