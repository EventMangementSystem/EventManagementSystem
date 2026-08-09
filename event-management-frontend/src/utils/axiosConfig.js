import axios from "axios";
import { getToken } from "./tokenUtils";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;