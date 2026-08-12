import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import eventService from "../../services/eventService";
import bookingService from "../../services/bookingService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function BookEvent() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [event, setEvent] = useState(null);

    const [tickets, setTickets] = useState(1);

    const [loading, setLoading] = useState(true);

    const [booking, setBooking] = useState(false);

    useEffect(() => {

        let ignore = false;

        const loadEvent = async () => {

            try {

                const response = await eventService.getEventById(id);

                if (!ignore) {
                    setEvent(response.data);
                }

            } catch (error) {

                if (!ignore) {
                    toast.error(
                        error.response?.data?.message ??
                        "Unable to load event"
                    );

                    navigate("/events", { replace: true });
                }

            } finally {

                if (!ignore) {
                    setLoading(false);
                }

            }

        };

        loadEvent();

        return () => {
            ignore = true;
        };

    }, [id, navigate]);

    const handleBooking = async () => {

        try {

            setBooking(true);

            const response = await bookingService.bookTickets({

                eventId: Number(id),

                numberOfTickets: tickets,

            });

            toast.success(response.message);

            navigate("/my-bookings", {
                replace: true,
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Booking failed"
            );

        } finally {

            setBooking(false);

        }

    };

    if (loading) {
        return <LoadingSpinner />;
    }

    const total = tickets * event.price;

    return (

        <div className="row justify-content-center">

            <div className="col-lg-6">

                <div className="card shadow">

                    <div className="card-body">

                        <h3 className="mb-4">
                            Book Tickets
                        </h3>

                        <h4>
                            {event.title}
                        </h4>

                        <hr />

                        <p>

                            <strong>Price Per Ticket :</strong>

                            ₹ {event.price}

                        </p>

                        <p>

                            <strong>Available Seats :</strong>

                            {event.availableSeats}

                        </p>

                        <div className="mb-3">

                            <label className="form-label">

                                Number Of Tickets

                            </label>

                            <input
                                type="number"
                                min="1"
                                max={event.availableSeats}
                                value={tickets}
                                onChange={(e) =>
                                    setTickets(Number(e.target.value))
                                }
                                className="form-control"
                            />

                        </div>

                        <h4 className="text-primary">

                            Total : ₹ {total}

                        </h4>

                        <button
                            className="btn btn-success w-100 mt-4"
                            disabled={booking}
                            onClick={handleBooking}
                        >

                            {booking ? (

                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>

                                    Booking...
                                </>

                            ) : (

                                "Confirm Booking"

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}