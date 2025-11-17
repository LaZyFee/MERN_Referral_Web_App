import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, unique: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    walletBalance: { type: Number, default: 0 },
    referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
export const User = mongoose.model('User', UserSchema);