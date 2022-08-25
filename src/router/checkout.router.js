import express from 'express';
import { checkout } from '../controller/checkout.controller.js';

const router = express();

router.post('/:id_cart', checkout);

export default router;