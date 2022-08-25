export class CartItemDTO {
    constructor(productId, code, name, unitPrice, quantity) {
        this.productId = productId;
        this.code = code;
        this.name = name;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }
}