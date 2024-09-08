import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
    totalItems: { type: Number, default: 0 },
    totalCost: { type: Number, default: 0 },
    customerCount: { type: Number, default: 0 },
    dailySales: [{
        date: { type: String, default: new Date().toISOString().slice(0, 10) },
        items: { type: Number, default: 0 },
        cost: { type: Number, default: 0 },
        customer: { type: Number, default: 0 },
    }],
});

const Sales = mongoose.model('Sales', salesSchema);

export default Sales;