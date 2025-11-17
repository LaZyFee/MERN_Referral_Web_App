import express from 'express';
import { getProducts, addProduct } from '../controllers/product-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

export const router = express.Router();


// Get Products
router.get('/get-products', getProducts);

// add Products
router.post('/add-products', authMiddleware, addProduct);

export default router;