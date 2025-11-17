import { Product } from '../model/product-model.js';
import { Order } from '../model/order-model.js';
import { User } from '../model/user-model.js';

export const buyProduct = async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ msg: "No purchase items provided" });
    }

    try {
        // user's previous orders BEFORE saving current order
        const previousOrderCount = await Order.countDocuments({
            user: req.user.id,
        });

        let totalOrderAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const { productId, quantity } = item;
            const product = await Product.findById(productId);
            if (!product) continue;

            const amount = product.price * quantity;
            totalOrderAmount += amount;

            orderItems.push({
                product: productId,
                quantity,
                price: product.price,
                amount,
            });
        }

        const newOrder = new Order({
            user: req.user.id,
            items: orderItems,
            totalAmount: totalOrderAmount,
        });

        await newOrder.save();

        // Apply referral bonus
        const user = await User.findById(req.user.id);

        if (user?.referredBy) {
            const referrer = await User.findById(user.referredBy);

            const isFirstPurchase = previousOrderCount === 0;
            const bonusPercent = isFirstPurchase ? 0.10 : 0.03;
            const bonus = totalOrderAmount * bonusPercent;

            referrer.walletBalance += bonus;
            await referrer.save();
        }

        res.status(200).json({
            msg: "Order placed successfully",
            order: newOrder,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
