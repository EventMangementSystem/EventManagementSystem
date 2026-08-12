import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import eventService from "../../services/eventService";
import aiRecommendationService from "../../services/aiRecommendationService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

export default function EventDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { isAuthenticated, role } = useAuth();

    const [event, setEvent] = useState(null);

    const [loading, setLoading] = useState(true);

    const [recommendations, setRecommendations] = useState([]);

    const [loadingRecommendations, setLoadingRecommendations] = useState(false);

    useEffect(() => {

        let ignore = false;

        const fetchEvent = async () => {

            try {

                const response = await eventService.getEventById(id);

                if (!ignore) {
                    setEvent(response.data);
                }

            } catch (error) {

                if (!ignore) {

                    toast.error(
                        error.response?.data?.message ??
                        "Failed to load event"
                    );

                    navigate("/events", {
                        replace: true,
                    });

                }

            } finally {

                if (!ignore) {
                    setLoading(false);
                }

            }

        };

        fetchEvent();

        return () => {
            ignore = true;
        };

    }, [id, navigate]);

    const getRecommendations = async () => {

        try {

            setLoadingRecommendations(true);

            const response =
                await aiRecommendationService.recommend(event.id);

            setRecommendations(
                response.data.recommendations
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Failed to load recommendations"
            );

        } finally {

            setLoadingRecommendations(false);

        }

    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!event) {
        return null;
    }

    return (

        <div className="row justify-content-center">

            <div className="col-lg-8">

                <div className="card shadow">

                    <div className="card-body p-4">

                        <h2 className="mb-3">
                            {event.title}
                        </h2>

                        <span className="badge bg-primary fs-6 mb-4">
                            {event.category}
                        </span>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <h6>Venue</h6>

                                <p>{event.venue}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <h6>City</h6>

                                <p>{event.city}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <h6>Date</h6>

                                <p>{event.eventDate}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <h6>Time</h6>

                                <p>{event.eventTime}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <h6>Price</h6>

                                <p>₹ {event.price}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <h6>Available Seats</h6>

                                <p>

                                    {event.availableSeats} / {event.totalSeats}

                                </p>

                            </div>

                        </div>

                        <hr />

                        <h5>Description</h5>

                        <p>

                            {event.description}

                        </p>

                        <div className="mt-4">

                            {!isAuthenticated && (

                                <Link
                                    to="/login"
                                    className="btn btn-primary"
                                >

                                    Login to Book Tickets

                                </Link>

                            )}

                            {isAuthenticated &&
                                role === "CUSTOMER" &&
                                event.availableSeats > 0 && (

                                    <Link
                                        to={`/book-event/${event.id}`}
                                        className="btn btn-success"
                                    >

                                        Book Ticket

                                    </Link>

                                )}

                            {event.availableSeats === 0 && (

                                <button
                                    className="btn btn-danger"
                                    disabled
                                >

                                    Sold Out

                                </button>

                            )}
                        </div>
                        <hr />

                        <h4 className="mt-4">
                            🤖 AI Recommendations
                        </h4>

                        <button
                            className="btn btn-outline-primary mb-3"
                            onClick={getRecommendations}
                            disabled={loadingRecommendations}
                        >

                            {
                                loadingRecommendations
                                    ? "Generating..."
                                    : "Get AI Recommendations"
                            }

                        </button>

                        {
                            recommendations.length > 0 && (

                                <div className="mt-3">

                                    {
                                        recommendations.map((item, index) => (

                                            <div
                                                key={index}
                                                className="card shadow-sm mb-3"
                                            >

                                                <div className="card-body">

                                                    <h5>
                                                        ⭐ {item.title}
                                                    </h5>

                                                    <p className="mb-0">
                                                        {item.reason}
                                                    </p>

                                                </div>

                                            </div>

                                        ))
                                    }

                                </div>

                            )
                        }

                    </div>

                </div>

            </div>

        </div>

    );

}