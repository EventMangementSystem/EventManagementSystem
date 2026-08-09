import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "../context/AuthProvider";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Events from "../pages/Events/Events";
import EventDetails from "../pages/EventDetails/EventDetails";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import EditEvent from "../pages/EditEvent/EditEvent";
import MyBookings from "../pages/MyBookings/MyBookings";
import MyPayments from "../pages/MyPayments/MyPayments";
import NotFound from "../pages/NotFound/NotFound";
import BookEvent from "../pages/BookEvent/BookEvent";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/events/:id" element={<EventDetails />} />

                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute roles={["ADMIN"]}>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/create-event"
                            element={
                                <ProtectedRoute roles={["ADMIN"]}>
                                    <CreateEvent />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/edit-event/:id"
                            element={
                                <ProtectedRoute roles={["ADMIN"]}>
                                    <EditEvent />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/my-bookings"
                            element={
                                <ProtectedRoute roles={["CUSTOMER"]}>
                                    <MyBookings />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/my-payments"
                            element={
                                <ProtectedRoute roles={["CUSTOMER"]}>
                                    <MyPayments />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/book-event/:id"
                            element={
                                <ProtectedRoute roles={["CUSTOMER"]}>
                                    <BookEvent />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/payments/:bookingId"
                            element={
                                <ProtectedRoute roles={["CUSTOMER"]}>
                                    <Payment />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/my-payments"
                            element={
                                <ProtectedRoute roles={["CUSTOMER"]}>
                                    <MyPayments />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/payment-success"
                            element={
                                <ProtectedRoute roles={["CUSTOMER"]}>
                                    <PaymentSuccess />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}