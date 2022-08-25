import UserDaoMongoDB from '../daos/user.dao.mongoDB.js';

class UserFactory {
    create() {
        return UserDaoMongoDB.getInstance();
    }
}

export default UserFactory;