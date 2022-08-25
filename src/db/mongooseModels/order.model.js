import mongoose from 'mongoose';
import { productSchema } from './product.model.js';

const orderCollection = 'order';

const orderItemSchema = new mongoose.Schema({
    product: { type: productSchema, requiered: true},
    quantity: { type: Number, required: true },
});

export const orderSchema = new mongoose.Schema({
    productos: { type: [orderItemSchema], required: true },
    orderNumber: { type: String, required: true },
    status: { type: String, required: true },
    email: { type: String, required: true },
    timestamp: { type: Number, required: true },
});

export const OrderModel = mongoose.model(orderCollection, orderSchema);