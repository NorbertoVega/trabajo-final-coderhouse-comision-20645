import UserRepository from '../db/repository/user.repository.js';

const userRepository = new UserRepository();

export async function saveMessage(message) {
    const id = await userRepository.save(message);
    console.log({id});
    return id;
}
