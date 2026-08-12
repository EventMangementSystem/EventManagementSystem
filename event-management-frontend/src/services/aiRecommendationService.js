import axiosInstance from "../utils/axiosConfig";

const recommend = async (eventId) => {

    const response = await axiosInstance.post(
        `/ai/recommend/${eventId}`
    );

    return response.data;
};

export default {
    recommend,
};