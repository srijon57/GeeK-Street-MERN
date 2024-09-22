import express from 'express';
import Sales from '../models/salesModel.js';
import User from '../models/userModel.js';

const router = express.Router();

// Route to update sales data
router.post('/update-sales', async (req, res) => {
    const { items, cost, productId, productName, totalPrice, customerName, userId } = req.body;
    const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

    try {
        const sales = await Sales.findOne();

        if (!sales) {
            const newSales = new Sales({
                totalItems: items,
                totalCost: cost,
                customerCount: 1,
                dailySales: [{ date: currentDate, items, cost, customer: 0 }],
                recentOrders: [{ productId, productName, totalPrice, customerName, date: new Date(), userId }],
            });
            await newSales.save();
        } else {
            sales.totalItems += items;
            sales.totalCost += cost;
            sales.customerCount += 1;

            const existingDate = sales.dailySales.find(sale => sale.date === currentDate);
            if (existingDate) {
                existingDate.items += items;
                existingDate.cost += cost;
                existingDate.customer += 1;
            } else {
                sales.dailySales.push({ date: currentDate, items, cost, customer: 0 });
            }

            sales.recentOrders.push({ productId, productName, totalPrice, customerName, date: new Date(), userId });
            if (sales.recentOrders.length > 15) {
                sales.recentOrders.shift(); // Remove the oldest order
            }

            await sales.save();
        }

        // Add order history to user
        const user = await User.findById(userId);
        if (user) {
            user.orderHistory.push({
                productName,
                totalPrice,
                customerName,
                date: new Date(),
                status: "Pending"
            });
            await user.save();
        }

        res.status(200).json({ msg: 'Sales data updated successfully' });
    } catch (error) {
        console.error('Error updating sales data:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Route to update order status
router.put('/update-order-status/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const sales = await Sales.findOne();
        if (!sales) {
            return res.status(404).json({ msg: 'No sales data found' });
        }

        const order = sales.recentOrders.id(orderId);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        order.status = status;
        await sales.save();

        // Update user order history status
        const user = await User.findById(order.userId);
        if (user) {
            const userOrder = user.orderHistory.id(orderId);
            if (userOrder) {
                userOrder.status = status;
                await user.save();
            }
        }

        res.status(200).json({ msg: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Route to get sales data
router.get('/get-sales', async (req, res) => {
    try {
        const sales = await Sales.findOne();
        if (!sales) {
            return res.status(404).json({ msg: 'No sales data found' });
        }
        res.status(200).json(sales);
    } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

export { router as salesRouter };
