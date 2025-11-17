import { User } from '../model/user-model.js';
import { Purchase } from '../model/purchase-model.js';

import bcrypt from 'bcryptjs';
import shortid from 'shortid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Registration controller
export const Register = async (req, res) => {
    const { username, password, referralCode } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: 'User exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newreferralCode = shortid.generate();

        user = new User({ username, password: hashedPassword, referralCode: newreferralCode });

        if (referralCode) {
            const referrer = await User.findOne({ referralCode });
            if (referrer) {
                user.referredBy = referrer._id;
                referrer.referredUsers.push(user._id);
                await referrer.save();
            }
        }

        await user.save();

        const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            msg: 'Registered',
            token,
            referralCode: newreferralCode,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
}

// Login controller
export const Login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            token,
            referralCode: user.referralCode,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
}

// Logout controller
export const Logout = async (req, res) => {
    try {
        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMe = async (req, res) => {
    try {
        // current user with referredBy and referredUsers
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('referredBy', 'username email referralCode walletBalance')
            .populate('referredUsers', 'username email referralCode walletBalance');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // purchases of referred users
        const referralsWithPurchases = await Promise.all(
            user.referredUsers.map(async (refUser) => {
                const purchases = await Purchase.find({ user: refUser._id }).populate(
                    'product',
                    'name price'
                );
                return {
                    username: refUser.username,
                    email: refUser.email,
                    referralCode: refUser.referralCode,
                    walletBalance: refUser.walletBalance,
                    purchases,
                };
            })
        );

        res.status(200).json({
            user,
            referrals: referralsWithPurchases,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
