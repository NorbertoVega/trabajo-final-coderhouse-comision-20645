import UserFactory from "../factory/user.factory.js";

class UserRepository {
    
    constructor() {
        this.userDao = new UserFactory().create();
    }

    async save(userToSave) {
        return await this.userDao.save(userToSave);
    }

    async getById(id) {
        return await this.userDao.getById(id);
    }

    async getByEmail(email) {
        return await this.userDao.getByEmail(email);
    }

    async getAll() {
        return await this.userDao.getAll();
    }

    async deleteById(id) {
        return await this.userDao.deleteById(id);
    }

    async deleteAll() {
        return await this.userDao.deleteAll();
    }

    async updateById(id, userToSave) {
        return await this.userDao.updateById(id, userToSave);
    }

    async updateByEmail(email, userToSave) {
        return await this.userDao.updateByEmail(email, userToSave);
    }
}

export default UserRepository;