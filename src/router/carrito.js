import { Router } from 'express';
import { 
    crearCarritoController,
    borrarCarritoController,
    agregarProductoACarritoController,
    obtenerProductosCarritoController,
    borrarProductoDelCarritoController } from '../controller/carrito.controller.js';

const router = Router();

router.post('/', crearCarritoController);
router.delete('/:id', borrarCarritoController);
router.post('/:id/productos/:id_prod', agregarProductoACarritoController);
router.get('/:id/productos', obtenerProductosCarritoController);
router.delete('/:id/productos/:id_prod', borrarProductoDelCarritoController);

export default router;