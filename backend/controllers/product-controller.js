import { Product } from '../model/product-model.js';


// Add Product
export const addProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        const product = new Product({ name, price });
        await product.save();
        res.status(200).json({ msg: 'Product added', product });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}


// Get Products
export const getProducts = async (req, res) => {
    let products = await Product.find();
    res.status(200).json(products);
}