import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import bookingService from "../../services/bookingService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        async function fetchBookings() {
            try {
                const response = await bookingService.getMyBookings();

                if (!ignore) {
                    setBookings(response.data);
                }
            } catch (error) {
                if (!ignore) {
                    toast.error(
                        error.response?.data?.message ??
                            "Unable to load bookings"
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        fetchBookings();

        return () => {
            ignore = true;
        };
    }, []);

    async function handleCancelBooking(bookingId) {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) {
            return;
        }

        try {
            const response = await bookingService.cancelBooking(bookingId);

            toast.success(response.message);

            // Update only the cancelled booking instead of reloading
            setBookings((previousBookings) =>
                previousBookings.map((booking) =>
                    booking.bookingId === bookingId
                        ? {
                              ...booking,
                              status: "CANCELLED",
                          }
                        : booking
                )
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ??
                    "Unable to cancel booking"
            );
        }
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container">
            <h2 className="text-center mb-4">
                My Bookings
            </h2>

            {bookings.length === 0 ? (
                <div className="alert alert-info text-center">
                    No bookings found.
                </div>
            ) : (
                <div className="row">
                    {bookings.map((booking) => (
                        <div
                            key={booking.bookingId}
                            className="col-lg-6 mb-4"
                        >
                            <div className="card shadow h-100">
                                <div className="card-body">
                                    <h4>{booking.eventName}</h4>

                                    <hr />

                                    <p>
                                        <strong>Booking ID:</strong>{" "}
                                        {booking.bookingId}
                                    </p>

                                    <p>
                                        <strong>Customer:</strong>{" "}
                                        {booking.customerName}
                                    </p>

                                    <p>
                                        <strong>Tickets:</strong>{" "}
                                        {booking.numberOfTickets}
                                    </p>

                                    <p>
                                        <strong>Total:</strong> ₹{" "}
                                        {booking.totalAmount}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`badge ${
                                                booking.status === "BOOKED"
                                                    ? "bg-success"
                                                    : booking.status === "PAID"
                                                    ? "bg-primary"
                                                    : "bg-danger"
                                            }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </p>

                                    <p>
                                        <strong>Booking Date:</strong>
                                        <br />
                                        {new Date(
                                            booking.bookingDate
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <div className="card-footer bg-white">
                                    {booking.status === "BOOKED" && (
                                        <div className="d-flex gap-2">
                                            <Link
                                                to={`/payments/${booking.bookingId}`}
                                                className="btn btn-primary flex-fill"
                                            >
                                                Pay Now
                                            </Link>
                                            <button
                                                className="btn btn-danger flex-fill"
                                                onClick={() => handleCancelBooking(booking.bookingId)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                    {booking.status === "PAID" && (
                                        <button
                                            className="btn btn-success w-100"
                                            disabled
                                        >
                                            ✅ Payment Completed
                                        </button>

                                    )}

                                    {booking.status === "CANCELLED" && (

                                        <button
                                            className="btn btn-secondary w-100"
                                            disabled
                                        >
                                            Booking Cancelled
                                        </button>

                                    )}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}