import logger from '../utils/logger/logger.js';
import { getCartByIdSrv } from '../services/cart.service.js';
import { sendCheckoutEmail, checkStock, generateOrder, saveOrder} from '../services/checkout.service.js';
import { getUserByEmail } from '../services/user.service.js';

export async function checkout(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/checkout${req.url}, Method: ${req.method}`);
        const idCart = req.params.idCart;
        const cart = await getCartByIdSrv(idCart);
        if (cart === null) {
            logger.error('Carrito no encontrado.');
            res.status(404).send({result: "ERROR", message: 'Carrito no encontrado.'});
        }
        const email = cart.email;
        const user = getUserByEmail(email);
        if (user === null) {
            logger.error('El usuario no existe.');
            res.status(404).send({result: "ERROR", message: 'El usuario no existe.'});
        }
        
        const itemsWhitoutStock = await checkStock(cart);
        if (itemsWhitoutStock.length > 0) {
            logger.error('Existen productos sin stock suficiente.');
            res.status(404).send({result: "ERROR", message: 'Existen productos sin stock suficiente.', itemsWhitoutStock: itemsWhitoutStock});
        }

        const order = await generateOrder(cart);

        if (order) {
            const id = await saveOrder(order);
            res.status(200).send({ result : "SUCCESS", idOrdengenerada: id });
            sendCheckoutEmail(user, cart);      
            return; 
        }
        
        res.status(400).send({ result : "ERROR", message: "Hubo un error al generar la orden."});
        
    }
    catch (err) {
        logger.error('Hubo un error al hacer el checkout.');
        res.status(400).send({result: "ERROR", message: 'Hubo un error al hacer el checkout.' });
    }
}