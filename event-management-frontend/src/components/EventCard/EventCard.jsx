import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import eventService from "../../services/eventService";
import { useAuth } from "../../hooks/useAuth";

export default function EventCard({ event, onDelete }) {

    const { role } = useAuth();

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await eventService.deleteEvent(event.id);

            toast.success(response.message);

            if (onDelete) {
                onDelete(event.id);
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Unable to delete event"
            );

        }

    };

    return (

        <div className="col-lg-4 mb-4">

            <div className="card shadow h-100">

                <div className="card-body">

                    <h4>{event.title}</h4>

                    <span className="badge bg-primary mb-3">
                        {event.category}
                    </span>

                    <p>{event.description}</p>

                    <hr />

                    <p>
                        <strong>Venue:</strong> {event.venue}
                    </p>

                    <p>
                        <strong>City:</strong> {event.city}
                    </p>

                    <p>
                        <strong>Date:</strong> {event.eventDate}
                    </p>

                    <p>
                        <strong>Time:</strong> {event.eventTime}
                    </p>

                    <p>
                        <strong>Price:</strong> ₹ {event.price}
                    </p>

                    <p>
                        <strong>Available Seats:</strong>{" "}
                        {event.availableSeats} / {event.totalSeats}
                    </p>

                </div>

                <div className="card-footer bg-white">

                    <div className="d-grid gap-2">

                        <Link
                            to={`/events/${event.id}`}
                            className="btn btn-primary"
                        >
                            View Details
                        </Link>

                        {(role === "ADMIN") && (

                            <>
                                <Link
                                    to={`/edit-event/${event.id}`}
                                    className="btn btn-warning"
                                >
                                    Edit Event
                                </Link>

                                <button
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                    Delete Event
                                </button>
                            </>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}