import axiosInstance from "../utils/axiosConfig";

const BASE_URL = "/events";

const getAllEvents = async ({
    page = 0,
    size = 6,
    search = "",
    category = "",
    city = "",
    minPrice = "",
    maxPrice = "",
    sortBy = "eventDate",
    direction = "asc",
} = {}) => {

    const response = await axiosInstance.get(`${BASE_URL}/search`, {
        params: {
            page,
            size,
            search,
            category,
            city,
            minPrice,
            maxPrice,
            sortBy,
            direction,
        },
    });

    return response.data;
};

const getEventById = async (id) => {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
};

const createEvent = async (event) => {
    const response = await axiosInstance.post(BASE_URL, event);
    return response.data;
};

const updateEvent = async (id, event) => {
    const response = await axiosInstance.put(`${BASE_URL}/${id}`, event);
    return response.data;
};

const deleteEvent = async (id) => {
    const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return response.data;
};

const eventService = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};

export default eventService;