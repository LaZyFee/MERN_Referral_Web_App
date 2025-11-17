import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ msg: 'No token' });

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ msg: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;

        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid token' });
    }
};
