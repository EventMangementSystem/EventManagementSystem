import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import paymentService from "../../services/paymentService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function MyPayments() {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let ignore = false;

        async function fetchPayments() {

            try {

                const response = await paymentService.getMyPayments();

                if (!ignore) {
                    setPayments(response.data);
                }

            } catch (error) {

                if (!ignore) {

                    toast.error(
                        error.response?.data?.message ??
                        "Unable to load payments"
                    );

                }

            } finally {

                if (!ignore) {
                    setLoading(false);
                }

            }

        }

        fetchPayments();

        return () => {
            ignore = true;
        };

    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (

        <div className="container">

            <h2 className="text-center mb-4">
                My Payments
            </h2>

            {payments.length === 0 ? (

                <div className="alert alert-info text-center">
                    No payment history found.
                </div>

            ) : (

                <div className="row">

                    {payments.map((payment) => (

                        <div
                            key={payment.paymentId}
                            className="col-lg-6 mb-4"
                        >

                            <div className="card shadow h-100">

                                <div className="card-body">

                                    <h4>
                                        {payment.eventName}
                                    </h4>

                                    <hr />

                                    <p>
                                        <strong>Payment ID :</strong>{" "}
                                        {payment.paymentId}
                                    </p>

                                    <p>
                                        <strong>Customer :</strong>{" "}
                                        {payment.customerName}
                                    </p>

                                    <p>
                                        <strong>Amount :</strong>{" "}
                                        ₹ {payment.amount}
                                    </p>

                                    <p>
                                        <strong>Payment Mode :</strong>{" "}
                                        {payment.paymentMode}
                                    </p>

                                    <p>
                                        <strong>Status :</strong>{" "}
                                        <span className="badge bg-success">
                                            {payment.paymentStatus}
                                        </span>
                                    </p>

                                    <p>
                                        <strong>Transaction ID :</strong>
                                        <br />
                                        <small className="text-break">
                                            {payment.transactionId}
                                        </small>
                                    </p>

                                    <p>
                                        <strong>Payment Date :</strong>
                                        <br />
                                        {new Date(
                                            payment.paymentDate
                                        ).toLocaleString()}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}