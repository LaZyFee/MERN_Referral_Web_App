import { Product } from '../model/product-model.js';
import { Purchase } from '../model/purchase-model.js';
import { User } from '../model/user-model.js';

// Buy Product
export const buyProduct = async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ msg: "No purchase items provided" });
    }

    try {
        let totalOrderAmount = 0;
        const purchaseRecords = [];

        for (const item of items) {
            const { productId, quantity } = item;

            const product = await Product.findById(productId);
            if (!product) continue;

            const amount = product.price * quantity;
            totalOrderAmount += amount;

            const purchase = new Purchase({
                user: req.user.id,
                product: productId,
                quantity,
                amount,
            });

            await purchase.save();
            purchaseRecords.push(purchase);
        }

        // Apply referral bonus
        const user = await User.findById(req.user.id).populate("referredBy");

        if (user?.referredBy) {
            const referrer = await User.findById(user.referredBy);

            // Count previous purchases (before these)
            const userPurchasesBefore = await Purchase.countDocuments({
                user: req.user.id,
            });

            // Bonus rule:
            // First lifetime purchase = 10%
            // All others = 3%
            const isFirstPurchase = userPurchasesBefore === 0;
            const bonusPercent = isFirstPurchase ? 0.1 : 0.03;

            const bonus = totalOrderAmount * bonusPercent;
            referrer.walletBalance += bonus;
            await referrer.save();
        }

        res.status(200).json({
            msg: "Order purchased successfully",
            totalAmount: totalOrderAmount,
            itemsPurchased: purchaseRecords,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

