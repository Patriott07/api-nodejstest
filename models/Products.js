import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String },
    url: { type: String },
}, { timestamps: true });

export const Products = mongoose.model('products', productSchema);