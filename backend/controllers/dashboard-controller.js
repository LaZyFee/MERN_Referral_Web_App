import { User } from '../model/user-model.js';
import { Purchase } from '../model/purchase-model.js';

// Get Dashboard Data (Current User Purchases Only)
export const getDashboardData = async (req, res) => {
    try {
        // Get current user
        const user = await User.findById(req.user.id).select('username walletBalance');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Get purchases of current user
        const purchases = await Purchase.find({ user: user._id }).populate('product', 'name price quantity');

        res.status(200).json({
            user: {
                username: user.username,
                walletBalance: user.walletBalance,
            },
            purchases,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
