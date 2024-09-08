import express from 'express';
import Sales from '../models/salesModel.js';

const router = express.Router();

// Route to update sales data
router.post('/update-sales', async (req, res) => {
    const { items, cost } = req.body;
    const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

    try {
        const sales = await Sales.findOne();

        if (!sales) {
            const newSales = new Sales({
                totalItems: items,
                totalCost: cost,
                customerCount: 1,
                dailySales: [{ date: currentDate, items, cost, customer: 0 }], 
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

            await sales.save();
        }

        res.status(200).json({ msg: 'Sales data updated successfully' });
    } catch (error) {
        console.error('Error updating sales data:', error);
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
