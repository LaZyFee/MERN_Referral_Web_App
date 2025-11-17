import mongoose from 'mongoose';

 const PurchaseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
     product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
     quantity: Number,
    amount: Number,
    date: { type: Date, default: Date.now }
});
export const Purchase = mongoose.model('Purchase', PurchaseSchema);