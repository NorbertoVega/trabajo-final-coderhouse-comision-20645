export class orderDTO {
    constructor(orderNumber, email) {
        this.items = [];
        this.orderNumber = orderNumber;
        this.status = "GENERADA";
        this.email = email;
        this.timestamp = Date.now();
    }
}