import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { renderMessages, renderUserMessages } from '../controller/chat.controller.js';

const router = express();

router.set('views', './views');
router.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use(express.static(__dirname + '/views'));
router.use(express.static('./public'))

router.get('/', renderMessages);
router.get('/:email', renderUserMessages);

export default router;