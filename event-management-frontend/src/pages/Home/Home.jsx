import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaTicketAlt,
    FaMusic,
    FaLaptopCode,
    FaFutbol,
    FaTheaterMasks,
    FaArrowRight
} from "react-icons/fa";
import eventService from "../../services/eventService";
import "./Home.css";

export default function Home() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let ignore = false;

        async function loadHome() {

            try {

                const response = await eventService.getAllEvents();

                if (!ignore) {
                    setEvents(response.data.content.slice(0, 6));
                }

            } catch (error) {

                console.error("Failed to load events:", error);

            } finally {

                if (!ignore) {
                    setLoading(false);
                }

            }

        }

        loadHome();

        return () => {
            ignore = true;
        };

    }, []);

    return (

        <div className="home-page">

            {/* HERO */}

            <section className="hero-section">

                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-lg-6">

                            <span className="hero-badge">
                                EVENT MANAGEMENT SYSTEM
                            </span>

                            <h1 className="hero-title">
                                Find & Book
                                <span> Amazing Events</span>
                            </h1>

                            <p className="hero-text">
                                Discover concerts, conferences, workshops,
                                sports tournaments and cultural festivals
                                happening around you.
                            </p>

                            <div className="hero-buttons">

                                <Link
                                    to="/events"
                                    className="btn btn-primary hero-btn"
                                >
                                    Browse Events
                                </Link>

                            </div>

                        </div>

                        <div className="col-lg-6">

                            <div className="hero-illustration">

                                <div className="circle circle1"></div>
                                <div className="circle circle2"></div>
                                <div className="circle circle3"></div>

                                <div className="ticket-card">
                                    <FaTicketAlt />
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* FEATURED EVENTS */}

            <section className="featured-section">

                <div className="container">

                    <div className="section-title">

                        <h2>Featured Events</h2>

                        <p>
                            Explore some of the hottest events happening near you.
                        </p>

                    </div>

                    {loading ? (

                        <div className="text-center py-5">

                            <h5>Loading events...</h5>

                        </div>

                    ) : events.length === 0 ? (

                        <div className="text-center py-5">

                            <h5>No events available.</h5>

                        </div>

                    ) : (

                        <div className="row g-4">

                            {events.map((event) => (

                                <div
                                    className="col-lg-4 col-md-6"
                                    key={event.id}
                                >

                                    <div className="event-card">

                                        <div className="event-image">
                                            🎉
                                        </div>

                                        <div className="event-body">

                                            <h4>{event.title}</h4>

                                            <p>
                                                📍 {event.location}
                                            </p>

                                            <p>
                                                📅 {new Date(event.eventDate).toLocaleDateString()}
                                            </p>

                                            <h5>
                                                ₹ {event.price}
                                            </h5>

                                            <Link
                                                to={`/events/${event.id}`}
                                                className="btn btn-primary w-100"
                                            >
                                                View Details
                                                <FaArrowRight className="ms-2" />
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </section>

            {/* CATEGORIES */}

            <section className="category-section">

                <div className="container">

                    <div className="section-title">

                        <h2>Browse By Category</h2>

                        <p>Choose your favourite type of event.</p>

                    </div>

                    <div className="row g-4">

                        <div className="col-lg-3 col-md-6">

                            <div className="category-card">

                                <FaMusic className="category-icon" />

                                <h5>Music</h5>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6">

                            <div className="category-card">

                                <FaLaptopCode className="category-icon" />

                                <h5>Technology</h5>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6">

                            <div className="category-card">

                                <FaFutbol className="category-icon" />

                                <h5>Sports</h5>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6">

                            <div className="category-card">

                                <FaTheaterMasks className="category-icon" />

                                <h5>Cultural</h5>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* WHY CHOOSE US */}

            <section className="why-section">

                <div className="container">

                    <div className="section-title">

                        <h2>Why Choose Us?</h2>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-3">

                            <div className="why-card">

                                <h3>🔒</h3>

                                <h5>Secure Payments</h5>

                                <p>100% secure payment gateway.</p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="why-card">

                                <h3>⚡</h3>

                                <h5>Instant Booking</h5>

                                <p>Book tickets within seconds.</p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="why-card">

                                <h3>🎫</h3>

                                <h5>Verified Events</h5>

                                <p>Only trusted organizers.</p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="why-card">

                                <h3>💬</h3>

                                <h5>24×7 Support</h5>

                                <p>Always here to help you.</p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* FOOTER */}

            <footer className="home-footer">

                <div className="container text-center">

                    <h3>Event Management System</h3>

                    <p>Discover • Book • Enjoy</p>

                    <hr />

                    <p>
                        © 2026 Event Management System. All Rights Reserved.
                    </p>

                </div>

            </footer>

        </div>

    );

}