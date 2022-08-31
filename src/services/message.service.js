import MessageRepository from '../db/repository/message.repository.js';

const messageRepository = new MessageRepository();

export async function saveMessage(message) {
    const id = await messageRepository.save(message);
    return id;
}

export async function getMessagesByEmailSrv(email) {
    const messagesByEmail = await messageRepository.getMessagesByEmail(email);
    return messagesByEmail;
}

export async function getAllMessages() {
    const Allmessages = await messageRepository.getAll();
    return Allmessages;
}
