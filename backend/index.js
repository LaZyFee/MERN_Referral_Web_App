import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user-route.js';
import productRoutes from './routes/product-route.js';
import dashboardRoutes from './routes/dashboard-route.js';
import checkoutRoutes from './routes/checkout-route.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: 'Server error', error: err.message });
});


app.get('/', (req, res) => {
    res.send('The backend API of referral app is running...');
});
// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/checkout', checkoutRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;