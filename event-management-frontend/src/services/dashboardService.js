import axiosInstance from "../utils/axiosConfig";

const getDashboard = async () => {

    const response = await axiosInstance.get("/dashboard");

    return response.data;

};

export default {

    getDashboard,

};