import axiosInstance from "../utils/axiosConfig";

export const downloadTicket = async (paymentId) => {

    const response = await axiosInstance.get(
        `/tickets/${paymentId}`,
        {
            responseType: "blob"
        }
    );

    const url = window.URL.createObjectURL(
        new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.download = "EventTicket.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
};