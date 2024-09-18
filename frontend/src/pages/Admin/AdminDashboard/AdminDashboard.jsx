import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { MdDoneOutline, MdClose } from "react-icons/md";
import "./AdminDashboard.css";

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const [salesData, setSalesData] = useState(null);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASEURL}/sales/get-sales`
                );
                setSalesData(response.data);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, []);

    if (!salesData) {
        return <div>Loading...</div>;
    }

    const getMonthlyData = (data) => {
        const monthlyData = {};
        data.forEach((sale) => {
            const date = new Date(sale.date);
            const month = date.toLocaleString("default", { month: "long" });
            const day = date.getDate();
            if (!monthlyData[month]) {
                monthlyData[month] = {};
            }
            if (!monthlyData[month][day]) {
                monthlyData[month][day] = { items: 0, cost: 0, customer: 0 };
            }
            monthlyData[month][day].items += sale.items;
            monthlyData[month][day].cost += sale.cost;
            monthlyData[month][day].customer += sale.customer;
        });
        return monthlyData;
    };

    const monthlyData = getMonthlyData(salesData.dailySales);
    const currentMonth = new Date().toLocaleString("default", {
        month: "long",
    });

    const customerData = {
        labels: Object.keys(monthlyData[currentMonth] || {}).map(
            (day) => `${day} ${currentMonth}`
        ),
        datasets: [
            {
                label: "Total Customers Purchased(daily)",
                data: Object.values(monthlyData[currentMonth] || {}).map(
                    (dayData) => dayData.customer
                ),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const salesCostData = {
        labels: Object.keys(monthlyData[currentMonth] || {}).map(
            (day) => `${day} ${currentMonth}`
        ),
        datasets: [
            {
                label: "Total Sales (BDT) (daily)",
                data: Object.values(monthlyData[currentMonth] || {}).map(
                    (dayData) => dayData.cost
                ),
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    const productSalesData = {
        labels: Object.keys(monthlyData[currentMonth] || {}).map(
            (day) => `${day} ${currentMonth}`
        ),
        datasets: [
            {
                label: "Total Product Sales (daily)",
                data: Object.values(monthlyData[currentMonth] || {}).map(
                    (dayData) => dayData.items
                ),
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const handleUpdateStatus = async (orderId, status) => {
        try {
            await axios.put(
                `${
                    import.meta.env.VITE_BASEURL
                }/sales/update-order-status/${orderId}`,
                { status },
                config
            );

            // Update product quantity
            if (status === "Delivered") {
                const productId = salesData.recentOrders.find(order => order._id === orderId).productId;
                const product = await axios.get(`${import.meta.env.VITE_BASEURL}/product/${productId}`, config);
                const newQuantity = product.data.quantity - 1;
                await axios.put(`${import.meta.env.VITE_BASEURL}/product/update-quantity/${productId}`, { quantity: newQuantity }, config);
            }

            const response = await axios.get(
                `${import.meta.env.VITE_BASEURL}/sales/get-sales`,
                config
            );
            setSalesData(response.data);
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="stats">
                <div className="stat">
                    <h3>Total Customers Purchased</h3>
                    <p>{salesData.customerCount}</p>
                </div>
                <div className="stat">
                    <h3>Total Sales (BDT)</h3>
                    <p>{salesData.totalCost.toFixed(2)}</p>
                </div>
                <div className="stat">
                    <h3>Total Product Sales</h3>
                    <p>{salesData.totalItems}</p>
                </div>
            </div>
            <div className="chart">
                <h3>Total Customers Purchased(daily)</h3>
                <Line data={customerData} />
            </div>
            <div className="chart">
                <h3>Total Sales (BDT) (daily)</h3>
                <Line data={salesCostData} />
            </div>
            <div className="chart">
                <h3>Total Product Sales (daily)</h3>
                <Line data={productSalesData} />
            </div>
            <div className="recent-orders">
                <h3>Recent Orders</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Total Price</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.recentOrders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.productId}</td>
                                <td>{order.productName}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.customerName}</td>
                                <td>
                                    {new Date(order.date).toLocaleDateString()}
                                </td>
                                <td>{order.status}</td>
                                <td>
                                    {order.status === "Pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order._id,
                                                        "Delivered"
                                                    )
                                                }
                                            >
                                                <MdDoneOutline />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order._id,
                                                        "Canceled"
                                                    )
                                                }
                                            >
                                                <MdClose />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
