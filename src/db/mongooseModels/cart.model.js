import mongoose from 'mongoose';
import { productSchema } from './product.model.js';

const cartCollection = 'cart';

const cartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true},
    code: { type: String, required: true},
    name: { type: String, required: true},
    unitPrice: { type: Number, required: true }, 
    quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
    email: { type: String, required: true}, 
    timestamp: { type: Number, required: true },
    products: { type: [cartItemSchema], required: true },
    deliveryAddress: { type: String, required: true}
});

export const CartModel = mongoose.model(cartCollection, cartSchema);