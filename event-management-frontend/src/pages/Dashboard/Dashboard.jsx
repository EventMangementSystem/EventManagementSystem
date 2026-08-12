import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";

import dashboardService from "../../services/dashboardService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import "./Dashboard.css";

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let ignore = false;

        async function loadDashboard() {

            try {

                const response = await dashboardService.getDashboard();

                if (!ignore) {
                    setDashboard(response.data);
                }

            } catch (error) {

                if (!ignore) {
                    toast.error(
                        error.response?.data?.message ??
                        "Unable to load dashboard"
                    );
                }

            } finally {

                if (!ignore) {
                    setLoading(false);
                }

            }

        }

        loadDashboard();

        return () => {
            ignore = true;
        };

    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!dashboard) {
        return null;
    }

    const bookingChart = {
        labels: dashboard.bookingStatus.map(item => item.label),
        datasets: [
            {
                data: dashboard.bookingStatus.map(item => item.value),
                backgroundColor: [
                    "#198754",
                    "#dc3545",
                    "#0d6efd",
                    "#ffc107",
                    "#6f42c1",
                    "#20c997",
                ],
            },
        ],
    };

    const paymentChart = {
        labels: dashboard.paymentModes.map(item => item.label),
        datasets: [
            {
                label: "Payments",
                data: dashboard.paymentModes.map(item => item.value),
                backgroundColor: "#0d6efd",
            },
        ],
    };

    const revenueChart = {
        labels: dashboard.monthlyRevenue.map(item => item.month),
        datasets: [
            {
                label: "Revenue",
                data: dashboard.monthlyRevenue.map(item => item.revenue),
                borderColor: "#198754",
                backgroundColor: "rgba(25,135,84,0.2)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    return (

        <div className="container dashboard-container">

            <h2 className="dashboard-title">
                Admin Dashboard
            </h2>

            <div className="row g-4">

                <div className="col-lg-3 col-md-6">

                    <div className="card dashboard-card events-card">

                        <div className="card-body text-center">

                            <h6>Total Events</h6>

                            <h2>{dashboard.totalEvents}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card dashboard-card bookings-card">

                        <div className="card-body text-center">

                            <h6>Total Bookings</h6>

                            <h2>{dashboard.totalBookings}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card dashboard-card customers-card">

                        <div className="card-body text-center">

                            <h6>Total Customers</h6>

                            <h2>{dashboard.totalCustomers}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card dashboard-card payments-card">

                        <div className="card-body text-center">

                            <h6>Total Payments</h6>

                            <h2>{dashboard.totalPayments}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-12">

                    <div className="card shadow revenue-card">

                        <div className="card-body text-center">

                            <h5 className="revenue-title">
                                Total Revenue
                            </h5>

                            <div className="revenue-amount">
                                ₹ {dashboard.totalRevenue.toLocaleString()}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card shadow chart-card">

                        <div className="card-header">
                            Booking Status
                        </div>

                        <div className="card-body">

                            <Pie
                                data={bookingChart}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "bottom",
                                        },
                                    },
                                }}
                            />

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card shadow chart-card">

                        <div className="card-header">
                            Payment Modes
                        </div>

                        <div className="card-body">

                            <Bar
                                data={paymentChart}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                }}
                            />

                        </div>

                    </div>

                </div>

                <div className="col-12">

                    <div className="card shadow chart-card">

                        <div className="card-header">
                            Monthly Revenue
                        </div>

                        <div className="card-body">

                            <Line
                                data={revenueChart}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                        },
                                    },
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}