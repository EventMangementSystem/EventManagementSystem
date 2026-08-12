import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import eventService from "../../services/eventService";
import EventCard from "../../components/EventCard/EventCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function Events() {

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [city, setCity] = useState("");

    const [minPrice, setMinPrice] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

    const [sortBy, setSortBy] = useState("eventDate");

    const [direction, setDirection] = useState("asc");

    const [appliedFilters, setAppliedFilters] = useState({
        search: "",
        category: "",
        city: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "eventDate",
        direction: "asc",
    });

    const fetchEvents = useCallback(async () => {

        try {

            setLoading(true);

            const response = await eventService.getAllEvents({
                page,
                size: 3,
                ...appliedFilters,
            });

            setEvents(response.data.content);

            setTotalPages(response.data.totalPages);

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Failed to load events"
            );

        } finally {

            setLoading(false);

        }

    }, [page, appliedFilters]);

    useEffect(() => {

        const load = async () => {
            await fetchEvents();
        };

        load();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, appliedFilters]);

    const handleSearch = () => {

        setPage(0);

        setAppliedFilters({
            search,
            category,
            city,
            minPrice,
            maxPrice,
            sortBy,
            direction,
        });

    };

    const handleReset = () => {

        setSearch("");
        setCategory("");
        setCity("");
        setMinPrice("");
        setMaxPrice("");
        setSortBy("eventDate");
        setDirection("asc");

        setPage(0);

        setAppliedFilters({
            search: "",
            category: "",
            city: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "eventDate",
            direction: "asc",
        });

    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>

            <h2 className="text-center mb-4">
                Events
            </h2>

            <div className="card mb-4 shadow-sm">

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-md-3">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Event"
                                value={search}
                                onChange={(e) => {
                                    setPage(0);
                                    setSearch(e.target.value);
                                }}
                            />

                        </div>

                        <div className="col-md-2">

                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) => {
                                    setPage(0);
                                    setCategory(e.target.value);
                                }}
                            >

                                <option value="">
                                    All Categories
                                </option>

                                <option value="MUSIC">Music</option>

                                <option value="SPORTS">Sports</option>

                                <option value="TECH">Tech</option>

                                <option value="WORKSHOP">Workshop</option>

                                <option value="CULTURAL">Cultural</option>

                                <option value="EDUCATION">Education</option>

                            </select>

                        </div>

                        <div className="col-md-2">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="City"
                                value={city}
                                onChange={(e) => {
                                    setPage(0);
                                    setCity(e.target.value);
                                }}
                            />

                        </div>

                        <div className="col-md-2">

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={(e) => {
                                    setPage(0);
                                    setMinPrice(e.target.value);
                                }}
                            />

                        </div>

                        <div className="col-md-2">

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={(e) => {
                                    setPage(0);
                                    setMaxPrice(e.target.value);
                                }}
                            />

                        </div>

                        <div className="col-md-2">

                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => {
                                    setPage(0);
                                    setSortBy(e.target.value);
                                }}
                            >
                                <option value="eventDate">Event Date</option>
                                <option value="price">Price</option>
                                <option value="title">Title</option>
                            </select>

                        </div>

                        <div className="col-md-1">

                            <select
                                className="form-select"
                                value={direction}
                                onChange={(e) => {
                                    setPage(0);
                                    setDirection(e.target.value);
                                }}
                            >
                                <option value="asc">↑</option>
                                <option value="desc">↓</option>
                            </select>

                        </div>

                    </div>

                </div>

            </div>

            {events.length === 0 ? (

                <div className="alert alert-info text-center">
                    No Events Available
                </div>

            ) : (

                <>
                    <div className="row">

                        {events.map((event) => (

                            <EventCard
                                key={event.id}
                                event={event}
                                onDelete={(deletedId) =>
                                    setEvents((previousEvents) =>
                                        previousEvents.filter(
                                            (event) => event.id !== deletedId
                                        )
                                    )
                                }
                            />

                        ))}

                    </div>

                    <div className="mt-3 d-flex gap-2">

                        <button
                            className="btn btn-primary"
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={handleReset}
                        >
                            Reset
                        </button>

                    </div>

                    <div className="d-flex justify-content-center mt-4">

                        <button
                            className="btn btn-outline-primary me-2"
                            disabled={page === 0}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>

                        <span className="align-self-center">
                            Page {page + 1} of {totalPages}
                        </span>

                        <button
                            className="btn btn-outline-primary ms-2"
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>

                    </div>

                </>

            )}

        </>
    );

}