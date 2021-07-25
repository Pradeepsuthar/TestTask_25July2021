import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    color: { type: String, required: true },
    stockQty: { type: Number, required: true },
    profileImage: { type: String },
}, { timestamps: true });

export default mongoose.model('Products', productSchema, 'products');