import axiosInstance from "../utils/axiosConfig";

const BASE_URL = "/payments";

const makePayment = async (payment) => {
    const response = await axiosInstance.post(BASE_URL, payment);
    return response.data;
};

const getMyPayments = async () => {
    const response = await axiosInstance.get(`${BASE_URL}/my-payments`);
    return response.data;
};

const getPayment = async (paymentId) => {
    const response = await axiosInstance.get(
        `${BASE_URL}/${paymentId}`
    );

    return response.data;
};

const paymentService = {
    makePayment,
    getMyPayments,
    getPayment,
};

export default paymentService;