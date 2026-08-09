import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import authService from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    const [loading, setLoading] = useState(false);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const onSubmit = async (data) => {

        try {

            setLoading(true);

            const response = await authService.register(data);

            toast.success(response.message);

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1500);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <>
            <ToastContainer position="top-right" />

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Register
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Name
                                    </label>

                                    <input
                                        className="form-control"
                                        {...register("name", {
                                            required: "Name is required"
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.name?.message}
                                    </small>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value:
                                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email"
                                            }
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.email?.message}
                                    </small>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        className="form-control"
                                        {...register("phone", {
                                            required: "Phone is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message:
                                                    "Phone must contain exactly 10 digits"
                                            }
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.phone?.message}
                                    </small>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message:
                                                    "Password must be at least 6 characters"
                                            }
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.password?.message}
                                    </small>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        {...register("confirmPassword", {
                                            required:
                                                "Confirm Password is required",
                                            validate: value =>
                                                value === getValues("password") ||
                                                "Passwords do not match"
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.confirmPassword?.message}
                                    </small>

                                </div>

                                <button
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Registering...
                                        </>
                                    ) : (
                                        "Register"
                                    )}
                                </button>

                            </form>

                            <hr />

                            <div className="text-center">

                                Already have an account?

                                <Link
                                    to="/login"
                                    className="ms-2"
                                >
                                    Login
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}