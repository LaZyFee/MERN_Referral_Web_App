import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            amount: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },

}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
