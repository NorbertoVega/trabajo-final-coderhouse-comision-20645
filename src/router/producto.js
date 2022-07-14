import { Router } from 'express';
import { validateProductBodyAndAuthenticate } from '../utils/validation.js';
import { 
    getProductosController,
    getProductoByIdController,
    saveProductController,
    updateProductController,
    deleteProductController } from '../controller/producto.controller.js';

const router = Router();

router.get('/', getProductosController);
router.get('/:id', getProductoByIdController);
router.post('/', validateProductBodyAndAuthenticate, saveProductController);
router.put('/:id', validateProductBodyAndAuthenticate, updateProductController);
router.delete('/:id', validateProductBodyAndAuthenticate, deleteProductController);

export default router;
