import {
    api
} from "./api";

/**
 * 使用token登录
 * @returns 
 */
const tokenLogin = () => api('/tokenLogin')

export default tokenLogin