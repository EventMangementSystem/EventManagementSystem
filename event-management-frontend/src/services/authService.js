import axiosInstance from "../utils/axiosConfig";

const LOGIN_URL = "/auth/login";
const REGISTER_URL = "/auth/register";

const login = async (credentials) => {
    const response = await axiosInstance.post(LOGIN_URL, credentials);
    return response.data;
};

const register = async (user) => {
    const response = await axiosInstance.post(REGISTER_URL, user);
    return response.data;
};

const authService = {
    login,
    register,
};

export default authService;