import mongoose from 'mongoose';

const productCollection = 'product';

export const productSchema = new mongoose.Schema({
    code: { type: String, required: true, max: 100 },
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 500 },
    category: { type: String, required: true, max: 100 },
    unitPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    creationTimestamp: { type: Number, required: true },
    imageUrl: { type: String, required: true, max: 200 },
});

export const ProductModel = mongoose.model(productCollection, productSchema);