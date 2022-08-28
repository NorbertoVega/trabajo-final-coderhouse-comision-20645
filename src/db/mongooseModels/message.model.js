import mongoose from 'mongoose';

const messageCollection = "message";

const messageSchema = new mongoose.Schema({
    emailSender: { type: String, required: true },
    emailReceiver: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: String, required: true },
    type: { type: String, required: true }
});

export const MessageModel = mongoose.model(messageCollection, messageSchema);

