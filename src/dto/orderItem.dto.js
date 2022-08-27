export class OrderItemDTO {
    constructor(productId, code, name, unitPrice, description, quantity) {
        this.productId = productId;
        this.code = code;
        this.name = name;
        this.unitPrice = unitPrice;
        this.description = description;
        this.quantity = quantity;
    }
}