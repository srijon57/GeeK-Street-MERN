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
    recentOrders: [{
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        productName: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        customerName: { type: String, required: true },
        status: { type: String, default: 'Pending' },
        date: { type: Date, default: Date.now },
    }],
});


const Sales = mongoose.model('Sales', salesSchema);

export default Sales;
