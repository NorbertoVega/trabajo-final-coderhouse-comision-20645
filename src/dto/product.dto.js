export class ProductDTO {
    constructor(code, name, unitPrice, stock, imageUrl) {
        this.code = code;
        this.name = name;
        this.unitPrice = unitPrice;
        this.stock = stock;
        this.creationTimestamp = Date.now();
        this.imageUrl = imageUrl;
    }
}