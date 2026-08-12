import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import eventService from "../../services/eventService";

const categories = [
    "MUSIC",
    "SPORTS",
    "TECH",
    "WORKSHOP",
    "CULTURAL",
    "EDUCATION",
];

export default function CreateEvent() {

    const navigate = useNavigate();

    const [saving, setSaving] = useState(false);

    const {

        register,

        handleSubmit,

        formState: { errors },

    } = useForm({

        defaultValues: {

            title: "",

            description: "",

            category: "",

            venue: "",

            city: "",

            eventDate: "",

            eventTime: "",

            price: "",

            totalSeats: "",

        },

    });

    const onSubmit = async (data) => {

        try {

            setSaving(true);

            const response = await eventService.createEvent({

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

                "Unable to create event"

            );

        } finally {

            setSaving(false);

        }

    };

    return (

        <div className="row justify-content-center">

            <div className="col-lg-8">

                <div className="card shadow">

                    <div className="card-body">

                        <h2 className="text-center mb-4">

                            Create Event

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

                                        <option value="">

                                            Select Category

                                        </option>

                                        {categories.map((category) => (

                                            <option
                                                key={category}
                                                value={category}
                                            >

                                                {category}

                                            </option>

                                        ))}

                                    </select>

                                    <small className="text-danger">

                                        {errors.category?.message}

                                    </small>

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

                                    <small className="text-danger">

                                        {errors.venue?.message}

                                    </small>

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

                                    <small className="text-danger">

                                        {errors.city?.message}

                                    </small>

                                </div>

                                <div className="col-md-3 mb-3">

                                    <label className="form-label">

                                        Event Date

                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        {...register("eventDate", {

                                            required: "Date is required",

                                        })}
                                    />

                                    <small className="text-danger">

                                        {errors.eventDate?.message}

                                    </small>

                                </div>

                                <div className="col-md-3 mb-3">

                                    <label className="form-label">

                                        Event Time

                                    </label>

                                    <input
                                        type="time"
                                        className="form-control"
                                        {...register("eventTime", {

                                            required: "Time is required",

                                        })}
                                    />

                                    <small className="text-danger">

                                        {errors.eventTime?.message}

                                    </small>

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
                                        min="0"
                                        className="form-control"
                                        {...register("price", {

                                            required: "Price is required",

                                            min: {

                                                value: 0,

                                                message: "Price cannot be negative",

                                            },

                                        })}
                                    />

                                    <small className="text-danger">

                                        {errors.price?.message}

                                    </small>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Total Seats

                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        className="form-control"
                                        {...register("totalSeats", {

                                            required: "Seats are required",

                                            min: {

                                                value: 1,

                                                message: "Minimum 1 seat",

                                            },

                                        })}
                                    />

                                    <small className="text-danger">

                                        {errors.totalSeats?.message}

                                    </small>

                                </div>

                            </div>

                            <button
                                className="btn btn-primary w-100"
                                disabled={saving}
                            >

                                {saving ? (

                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>

                                        Creating Event...
                                    </>

                                ) : (

                                    "Create Event"

                                )}

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}