import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
    const { isAuthenticated, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const closeNavbar = () => {
        const navbar = document.getElementById("navbarNav");

        if (navbar?.classList.contains("show")) {
            navbar.classList.remove("show");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
            <div className="container">

                <NavLink
                    to="/"
                    className="navbar-brand fw-bold"
                    onClick={closeNavbar}
                >
                    Event Management
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active fw-bold" : ""}`
                                }
                                onClick={closeNavbar}
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/events"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active fw-bold" : ""}`
                                }
                                onClick={closeNavbar}
                            >
                                Events
                            </NavLink>
                        </li>

                        {role === "CUSTOMER" && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to="/my-bookings"
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? "active fw-bold" : ""}`
                                        }
                                        onClick={closeNavbar}
                                    >
                                        My Bookings
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        to="/my-payments"
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? "active fw-bold" : ""}`
                                        }
                                        onClick={closeNavbar}
                                    >
                                        My Payments
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {(role === "ADMIN") && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to="/create-event"
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? "active fw-bold" : ""}`
                                        }
                                        onClick={closeNavbar}
                                    >
                                        Create Event
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {role === "ADMIN" && (
                            <li className="nav-item">
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active fw-bold" : ""}`
                                    }
                                    onClick={closeNavbar}
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        )}

                    </ul>

                    <ul className="navbar-nav align-items-lg-center">

                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? "active fw-bold" : ""}`
                                        }
                                        onClick={closeNavbar}
                                    >
                                        Login
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        to="/register"
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? "active fw-bold" : ""}`
                                        }
                                        onClick={closeNavbar}
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item me-lg-3 my-2 my-lg-0">
                                    <span className="badge bg-light text-primary fs-6">
                                        {role}
                                    </span>
                                </li>

                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}

                    </ul>

                </div>

            </div>
        </nav>
    );
}