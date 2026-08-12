import axiosInstance from "../utils/axiosConfig";

const BASE_URL = "/bookings";

const bookTickets = async (booking) => {
    const response = await axiosInstance.post(BASE_URL, booking);
    return response.data;
};

const getMyBookings = async () => {
    const response = await axiosInstance.get(`${BASE_URL}/my-bookings`);
    return response.data;
};

const cancelBooking = async (bookingId) => {
    const response = await axiosInstance.put(
        `${BASE_URL}/cancel/${bookingId}`
    );

    return response.data;
};

const bookingService = {
    bookTickets,
    getMyBookings,
    cancelBooking,
};

export default bookingService;