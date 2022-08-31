export class MessageDTO {
    constructor(email, text) {
        this.email = email; 
        this.text = text; 
        this.timestamp = Date.now();
    }
}