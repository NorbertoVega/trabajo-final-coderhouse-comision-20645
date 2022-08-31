import express from 'express';
import { getServerInfo } from '../controller/info.controller.js';

const router = express();

router.get('/', getServerInfo);

export default router;