import express from 'express';
import { Register, Login, Logout, getMe } from "../controllers/user-controller.js";
import { authMiddleware } from '../middleware/auth-middleware.js';

const router = express.Router();

// User registration
router.post('/register', Register);
// User login
router.post('/login', Login);
// User logout
router.post('/logout', Logout);
// Get current user
router.get('/me', authMiddleware, getMe);

export default router;
