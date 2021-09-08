const hostname ='http://127.0.0.1'
const port = '5050'
/**
 * 
 * @param {string} url 请求路径
 * @param {fetchprops} param fetch请求参数
 * @returns 
 */

export const api = async (url, param) => {
    const {
        method ,
        body,
        query = {},
        header = {},
    } = param;
    try {
        const headers = {
            "Content-Type": "application/json",
            ...header,
        };
        const token = localStorage.getItem('token')
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const queryPath = Object.entries(query)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
        const finalUrl = [`${hostname}:${port}${url}`, queryPath]
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
            body: JSON.stringify(body),
            method:method||'GET',
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