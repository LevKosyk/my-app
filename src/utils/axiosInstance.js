import axios from "axios";
import { getToken, removeToken } from "./auth";


const axiosInstance = axios.create({
    baseURL: "http://localhost:3005/api",
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) =>{
        const token = getToken()
        if (token) {
            config.headers["Authorization"] = token
        }
        return config
    }, 
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status == 401) {
            removeToken();
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)
export default axiosInstance;