import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './AdminDashboard.css';

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
                const response = await axios.get(`${import.meta.env.VITE_BASEURL}/sales/get-sales`);
                setSalesData(response.data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, []);

    if (!salesData) {
        return <div>Loading...</div>;
    }

    const getMonthlyData = (data) => {
        const monthlyData = {};
        data.forEach(sale => {
            const date = new Date(sale.date);
            const month = date.toLocaleString('default', { month: 'long' });
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
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    const customerData = {
        labels: Object.keys(monthlyData[currentMonth] || {}).map(day => `${day} ${currentMonth}`),
        datasets: [
            {
                label: 'Total Customers Purchased(daily)',
                data: Object.values(monthlyData[currentMonth] || {}).map(dayData => dayData.customer),  
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const salesCostData = {
        labels: Object.keys(monthlyData[currentMonth] || {}).map(day => `${day} ${currentMonth}`),
        datasets: [
            {
                label: 'Total Sales (BDT) (daily)',
                data: Object.values(monthlyData[currentMonth] || {}).map(dayData => dayData.cost),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const productSalesData = {
        labels: Object.keys(monthlyData[currentMonth] || {}).map(day => `${day} ${currentMonth}`),
        datasets: [
            {
                label: 'Total Product Sales (daily)',
                data: Object.values(monthlyData[currentMonth] || {}).map(dayData => dayData.items),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='admin-dashboard'>
            <h2>Admin Dashboard</h2>
            <div className='stats'>
                <div className='stat'>
                    <h3>Total Customers Purchased</h3>
                    <p>{salesData.customerCount}</p>
                </div>
                <div className='stat'>
                    <h3>Total Sales (BDT)</h3>
                    <p>{salesData.totalCost.toFixed(2)}</p>
                </div>
                <div className='stat'>
                    <h3>Total Product Sales</h3>
                    <p>{salesData.totalItems}</p>
                </div>
            </div>
            <div className='chart'>
                <h3>Total Customers Purchased(daily)</h3>
                <Line data={customerData} />
            </div>
            <div className='chart'>
                <h3>Total Sales (BDT) (daily)</h3>
                <Line data={salesCostData} />
            </div>
            <div className='chart'>
                <h3>Total Product Sales (daily)</h3>
                <Line data={productSalesData} />
            </div>
        </div>
    );
};

export default AdminDashboard;
