import { sendEmail } from '../utils/mailSender.js';

export async function sendCheckoutEmail(email, nombre, cart) {
    const subjectString = `Nuevo pedido de ${nombre}. Email: ${email}`;
        
    let bodyString = `<h1>Productos</h1><br>`;
    
    if(cart.productos.length > 0) {
        for (let i = 0; i < cart.productos.length; i++) {
            bodyString += `<p>Nombre: ${cart.productos[i].nombre}<br>Precio: ${cart.productos[i].precio}</p><br><br>`
        }
    }

    sendEmail(bodyString, subjectString, email);

}