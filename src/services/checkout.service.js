import { sendEmail } from '../utils/mailSender.js';
import { getProductByIdSrv, updateProductByIdSrv } from './product.service.js';
import OrderRepository from '../db/repository/order.repository.js';
import { orderDTO } from '../dto/order.dto.js';
import { OrderItemDTO } from '../dto/orderItem.dto.js';

const orderRepository = new OrderRepository();

export async function sendCheckoutEmail(user, cart) {
    const { name, lastName, email } = user;
    const subjectString = `Nuevo pedido de ${name} ${lastName}. Email: ${email}`;

    let bodyString = `<h1>Productos</h1><br>`;

    if (cart.products.length > 0) {
        for (let i = 0; i < cart.products.length; i++) {
            bodyString += `<p>Nombre: ${cart.products[i].name}<br>Precio: $${cart.products[i].unitPrice}<br>Cantidad: ${cart.products[i].quantity}</p><br>`
        }
    }
    sendEmail(bodyString, subjectString, email);
}

export async function checkStock(cart) {
    const cartItems = cart.products;
    const itemsWhitoutStock = [];

    for (let i = 0; i < cartItems.length; i++) {
        const product = await getProductByIdSrv(cartItems[i].productId);
        if (product === null)
            itemsWhitoutStock.push({ name: cartItems[i].name, stock: -1 });
        else if (cartItems[i].quantity > product.stock) {
            itemsWhitoutStock.push({ name: cartItems[i].name, stock: product.stock })
        }
    }

    return itemsWhitoutStock;
}

export async function generateOrder(cart) {
    const cartItems = cart.products;
    const orderNumber = await orderRepository.countOrders();
    const order = new orderDTO(orderNumber + 1, cart.email);
    for (let i = 0; i < cartItems.length; i++) {
        const product = await getProductByIdSrv(cartItems[i].productId);
        product.stock -= cartItems[i].quantity;
        const id = await updateProductByIdSrv(cartItems[i].productId, product);
        if (id !== null) {
            const orderItem = new OrderItemDTO(
                cartItems[i].productId,
                cartItems[i].code,
                cartItems[i].name,
                cartItems[i].unitPrice,
                product.description,
                cartItems[i].quantity);
            order.items.push(orderItem);
        }
    }
    return order;
}

export async function saveOrder(order) {
    return await orderRepository.save(order);
}