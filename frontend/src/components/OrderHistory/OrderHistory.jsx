import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../Spinner/Spinner'; 
import './OrderHistory.css';

const OrderHistory = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchRecentOrders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASEURL}/sales/get-recent-orders/${user.id}`);
                setRecentOrders(response.data);
            } catch (error) {
                console.error('Error fetching recent orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user.isLoggedIn) {
            fetchRecentOrders();
        }
    }, [user]);

    return (
        <div className="order-history">
            <h2>Order History</h2>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Total Price</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.productName}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.customerName}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderHistory;
