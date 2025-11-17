import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { buyProduct } from '../controllers/checkout-controller.js';

const router = express.Router();

// Buy Product
router.post('/buy', authMiddleware, buyProduct);

export default router;