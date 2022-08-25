export class CartDTO {
    constructor(email, deliveryAddress) {
        this.email = email;
        this.products = [];
        this.timestamp = Date.now();
        this.deliveryAddress = deliveryAddress;
    }
}