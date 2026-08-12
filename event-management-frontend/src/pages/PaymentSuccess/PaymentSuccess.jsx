import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaDownload, FaHome, FaCreditCard } from "react-icons/fa";

import { downloadTicket } from "../../services/ticketService";

export default function PaymentSuccess() {

    const navigate = useNavigate();

    const { state } = useLocation();

    const paymentId = state?.paymentId;

    if (!paymentId) {

        navigate("/");

        return null;

    }

    return (

        <div className="row justify-content-center">

            <div className="col-lg-6">

                <div className="card shadow text-center">

                    <div className="card-body p-5">

                        <FaCheckCircle
                            size={70}
                            className="text-success mb-3"
                        />

                        <h2 className="fw-bold">
                            Payment Successful
                        </h2>

                        <p className="text-muted">
                            Your payment has been completed successfully.
                        </p>

                        <div className="d-grid gap-3 mt-4">

                            <button
                                className="btn btn-success"
                                onClick={() => downloadTicket(paymentId)}
                            >
                                <FaDownload className="me-2" />
                                Download Ticket
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/my-payments")}
                            >
                                <FaCreditCard className="me-2" />
                                View My Payments
                            </button>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => navigate("/")}
                            >
                                <FaHome className="me-2" />
                                Back to Home
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}