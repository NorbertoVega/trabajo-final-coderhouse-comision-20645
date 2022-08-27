import mongoose from 'mongoose';

const orderCollection = 'order';

const orderItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
});

export const orderSchema = new mongoose.Schema({
    items: { type: [orderItemSchema], required: true },
    orderNumber: { type: String, required: true },
    status: { type: String, required: true },
    email: { type: String, required: true },
    timestamp: { type: Number, required: true },
});

export const OrderModel = mongoose.model(orderCollection, orderSchema);