import axiosInstance from "../utils/axiosConfig";

const chat = async (message) => {

    const response = await axiosInstance.post("/ai/chat", {
        message,
    });

    return response.data;
};

const aiService = {
    chat,
};

export default aiService;