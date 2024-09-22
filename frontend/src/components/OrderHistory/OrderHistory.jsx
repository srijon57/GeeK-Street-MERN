import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASEURL}/auth/order-history`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setOrderHistory(response.data.orderHistory);
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };

        fetchOrderHistory();
    }, [user]);

    return (
        <div className="order-history">
            <h2>Order History</h2>
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
                    {orderHistory.map((order, index) => (
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
        </div>
    );
};

export default OrderHistory;
