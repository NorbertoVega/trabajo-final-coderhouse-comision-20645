import { Router } from 'express';
import { 
    saveCart,
    deleteCart,
    addProductToCart,
    getProductsFromCart,
    deleteProductFromCart } from '../controller/cart.controller.js';

const router = Router();

router.post('/', saveCart);
router.delete('/:id', deleteCart);
router.post('/:id/productos/:id_prod', addProductToCart);
router.get('/:id/productos', getProductsFromCart);
router.delete('/:id/productos/:id_prod', deleteProductFromCart);

export default router;