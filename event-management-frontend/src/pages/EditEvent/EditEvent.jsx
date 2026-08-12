import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import eventService from "../../services/eventService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const categories = [
    "MUSIC",
    "SPORTS",
    "TECH",
    "WORKSHOP",
    "CULTURAL",
    "EDUCATION",
];

export default function EditEvent() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const {

        register,

        handleSubmit,

        reset,

        formState: { errors },

    } = useForm();

    useEffect(() => {

        let ignore = false;

        async function loadEvent() {

            try {

                const response = await eventService.getEventById(id);

                if (!ignore) {

                    const event = response.data;

                    reset({

                        title: event.title,

                        description: event.description,

                        category: event.category,

                        venue: event.venue,

                        city: event.city,

                        eventDate: event.eventDate,

                        eventTime: event.eventTime,

                        price: event.price,

                        totalSeats: event.totalSeats,

                    });

                }

            } catch (error) {

                if (!ignore) {

                    toast.error(
                        error.response?.data?.message ??
                        "Unable to load event"
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

        }

        loadEvent();

        return () => {
            ignore = true;
        };

    }, [id, navigate, reset]);

    const onSubmit = async (data) => {

        try {

            setSaving(true);

            const response = await eventService.updateEvent(id, {

                ...data,

                price: Number(data.price),

                totalSeats: Number(data.totalSeats),

            });

            toast.success(response.message);

            navigate("/events", {
                replace: true,
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Unable to update event"
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (

        <div className="row justify-content-center">

            <div className="col-lg-8">

                <div className="card shadow">

                    <div className="card-body">

                        <h2 className="text-center mb-4">
                            Edit Event
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-3">

                                <label className="form-label">
                                    Title
                                </label>

                                <input
                                    className="form-control"
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                />

                                <small className="text-danger">
                                    {errors.title?.message}
                                </small>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                />

                                <small className="text-danger">
                                    {errors.description?.message}
                                </small>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Category
                                    </label>

                                    <select
                                        className="form-select"
                                        {...register("category", {
                                            required: "Category is required",
                                        })}
                                    >

                                        {categories.map(category => (

                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Venue
                                    </label>

                                    <input
                                        className="form-control"
                                        {...register("venue", {
                                            required: "Venue is required",
                                        })}
                                    />

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        City
                                    </label>

                                    <input
                                        className="form-control"
                                        {...register("city", {
                                            required: "City is required",
                                        })}
                                    />

                                </div>

                                <div className="col-md-3 mb-3">

                                    <label className="form-label">
                                        Date
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        {...register("eventDate", {
                                            required: "Date is required",
                                        })}
                                    />

                                </div>

                                <div className="col-md-3 mb-3">

                                    <label className="form-label">
                                        Time
                                    </label>

                                    <input
                                        type="time"
                                        className="form-control"
                                        {...register("eventTime", {
                                            required: "Time is required",
                                        })}
                                    />

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        {...register("price", {
                                            required: "Price is required",
                                        })}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Total Seats
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        {...register("totalSeats", {
                                            required: "Seats are required",
                                        })}
                                    />

                                </div>

                            </div>

                            <button
                                className="btn btn-warning w-100"
                                disabled={saving}
                            >

                                {saving ? (

                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>

                                        Updating...
                                    </>

                                ) : (

                                    "Update Event"

                                )}

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}