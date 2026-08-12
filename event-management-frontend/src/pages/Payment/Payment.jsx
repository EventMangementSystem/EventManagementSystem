import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import bookingService from "../../services/bookingService";
import paymentService from "../../services/paymentService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function Payment() {

    const { bookingId } = useParams();

    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);

    const [loading, setLoading] = useState(true);

    const [processing, setProcessing] = useState(false);

    const [paymentMode, setPaymentMode] = useState("UPI");

    useEffect(() => {

        let ignore = false;

        async function fetchBooking() {

            try {

                const response = await bookingService.getMyBookings();

                if (!ignore) {

                    const selectedBooking = response.data.find(
                        (b) => b.bookingId === Number(bookingId)
                    );

                    if (!selectedBooking) {

                        toast.error("Booking not found");

                        navigate("/my-bookings", {
                            replace: true,
                        });

                        return;
                    }

                    if (selectedBooking.status !== "BOOKED") {

                        toast.error("Only booked tickets can be paid.");

                        navigate("/my-bookings", {
                            replace: true,
                        });

                        return;
                    }

                    if (selectedBooking.paymentStatus === "SUCCESS") {

                        toast.info("Payment already completed.");

                        navigate("/my-payments", {
                            replace: true,
                        });

                        return;
                    }

                    setBooking(selectedBooking);
                }

            } catch (error) {

                if (!ignore) {

                    toast.error(
                        error.response?.data?.message ??
                        "Unable to load booking"
                    );

                    navigate("/my-bookings", {
                        replace: true,
                    });
                }

            } finally {

                if (!ignore) {
                    setLoading(false);
                }

            }

        }

        fetchBooking();

        return () => {
            ignore = true;
        };

    }, [bookingId, navigate]);

    const handlePayment = async () => {

        try {

            setProcessing(true);

            const response = await paymentService.makePayment({

                bookingId: booking.bookingId,

                paymentMode,

            });

            toast.success(response.message);

            navigate("/payment-success", {
                replace: true,
                state: {
                    paymentId: response.data.paymentId
                }
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Payment failed"
            );

        } finally {

            setProcessing(false);

        }

    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!booking) {
        return null;
    }

    return (

        <div className="row justify-content-center">

            <div className="col-lg-6">

                <div className="card shadow">

                    <div className="card-body">

                        <h2 className="mb-4 text-center">
                            Payment
                        </h2>

                        <hr />

                        <p>

                            <strong>Event</strong>

                            <br />

                            {booking.eventName}

                        </p>

                        <p>

                            <strong>Tickets</strong>

                            <br />

                            {booking.numberOfTickets}

                        </p>

                        <p>

                            <strong>Total Amount</strong>

                            <br />

                            ₹ {booking.totalAmount}

                        </p>

                        <div className="mb-4">

                            <label className="form-label">

                                Payment Mode

                            </label>

                            <select
                                className="form-select"
                                value={paymentMode}
                                onChange={(e) =>
                                    setPaymentMode(e.target.value)
                                }
                            >

                                <option value="UPI">
                                    UPI
                                </option>

                                <option value="CARD">
                                    Card
                                </option>

                                <option value="NET_BANKING">
                                    Net Banking
                                </option>

                                <option value="CASH">
                                    Cash
                                </option>

                            </select>

                        </div>

                        <button
                            className="btn btn-success w-100"
                            disabled={processing}
                            onClick={handlePayment}
                        >

                            {processing ? (

                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>

                                    Processing Payment...
                                </>

                            ) : (

                                "Pay Now"

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}