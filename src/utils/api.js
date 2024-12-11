import axios from "axios";
import { getToken } from "./localStorage";

export const BASE_URL = "https://dashboardbackend-production-cb33.up.railway.app/api/";

const baseInstance = axios.create({
    baseURL: BASE_URL,
})

export const getApiWithAuth = async (url) => {
    setApiHeaders(baseInstance);
    try {
        const response = await baseInstance.get(url);
        return {
            data: response.data,
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
}

const setApiHeaders = () => {
    baseInstance.defaults.headers.common["Authorization"] = "Bearer" + getToken();
}

export default baseInstance;