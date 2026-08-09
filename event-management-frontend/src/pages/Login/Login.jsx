import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import authService from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { login, isAuthenticated, role } = useAuth();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    if (isAuthenticated) {
        switch (role) {
            case "ADMIN":
                return <Navigate to="/dashboard" replace />;
            default:
                return <Navigate to="/events" replace />;
        }
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const response = await authService.login(data);

            login(
                response.data.token,
                response.data.role
            );

            toast.success(response.message);

            switch (response.data.role) {
                case "ADMIN":
                    navigate("/dashboard", { replace: true });
                    break;

                default:
                    navigate("/events", { replace: true });
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" />

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Login
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        {...register("email", {
                                            required: "Email is required",
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.email?.message}
                                    </small>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        {...register("password", {
                                            required: "Password is required",
                                        })}
                                    />

                                    <small className="text-danger">
                                        {errors.password?.message}
                                    </small>

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                            ></span>

                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}