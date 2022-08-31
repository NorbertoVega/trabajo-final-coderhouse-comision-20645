export class ProductDTO {
    constructor(code, name, description, category, unitPrice, stock, imageUrl) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.category = category;
        this.unitPrice = Number(unitPrice);
        this.stock = Number(stock);
        this.creationTimestamp = Date.now();
        this.imageUrl = imageUrl;
    }
}