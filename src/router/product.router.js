import { Router } from 'express';
import { validFieldsAndAdmin } from '../utils/validation.js';
import { 
    getAllProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct } from '../controller/product.controller.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validFieldsAndAdmin, saveProduct);
router.put('/:id', validFieldsAndAdmin, updateProduct);
router.delete('/:id', validFieldsAndAdmin, deleteProduct);

export default router;
