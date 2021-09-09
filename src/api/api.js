const hostname ='http://127.0.0.1'
const port = '5050'
/**
 * 
 * @param {string} url 请求路径
 * @param {fetchprops} param fetch请求参数
 * @returns 
 */

const api = async (url,body=undefined,param) => {
    try {
        let headers = {
            "Content-Type": "application/json",
        };
        const token = localStorage.getItem('token')
        if (token) {
            headers["Authorization"] = token;
        }
        const finalUrl = [`${hostname}:${port}${url}`]
            .filter(Boolean)
            .join("?");

        /**
         * 增加Mock处理
         */
        // if (mock && mockAble)
        //     fetchMock.mock(
        //         finalUrl, {
        //             code: "200",
        //             data: mock,
        //         }, {
        //             method: method
        //         }
        //     );
        /**
         * 发送请求
         */
        const response = await fetch(finalUrl, {
            body: body&&JSON.stringify(body),
            method:param.method,
            mode: "cors",
            headers,
        }).then((response) => response.json());
        // const {
        //     code,
        //     data,
        //     message,
        //     status
        // } = response;

        /**
         * 对Code处理
         */
        // handleApiCode(code);
        /**
         * 对Operation处理
         */
        // doOperation(operation);

        // if (code !== "200") throw new Error(message)
        return {
            ...response,
            // data
        }
    } catch (message) {
        console.warn(message);
        throw new Error(message || "未知错误");
    }
}
const post = async (url,body,options={})=>{
    return new Promise((resolve,reject)=>{
        api(url,body,{
            method:'POST',
            ...options
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}
const get = async (url,options={})=>{
    return new Promise((resolve,reject)=>{
        api(url,undefined,{
            method:'GET',
            ...options
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}
export default{
    get,
    post
}