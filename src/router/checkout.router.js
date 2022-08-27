import express from 'express';
import { checkout } from '../controller/checkout.controller.js';

const router = express();

router.post('/:idCart', checkout);

export default router;