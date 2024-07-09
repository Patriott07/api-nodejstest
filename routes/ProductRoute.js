import express from "express";
import { createProduct, getProducts, detailProduct, updateProduct, deleteProduct } from '../controllers/ProductsController.js';

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/:id', detailProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;