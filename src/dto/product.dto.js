export class ProductDTO {
    constructor(code, name, description, unitPrice, stock, imageUrl) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.stock = stock;
        this.creationTimestamp = Date.now();
        this.imageUrl = imageUrl;
    }
}