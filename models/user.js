import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');