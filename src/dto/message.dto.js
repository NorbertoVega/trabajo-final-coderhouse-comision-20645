export class MessageDTO {
    constructor(emailSender, emailReceiver, text, type) {
        this.emailSender = emailSender; 
        this.emailReceiver = emailReceiver;  
        this.text = text; 
        this.timestamp = Date.now();
        this.type = type;
    }
}