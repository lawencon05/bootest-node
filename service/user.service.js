import { UserDao } from '../dao/user.dao.mongo.js';
import { hashPwd, comparePwd } from '../config/encrypt.js';
import { getJwt } from '../config/jwt.js';

export class UserService {
    
    userDao = new UserDao();
    
    async login(username, pwd) {
        try {
            let user = await this.userDao.getByEmail(username);
            if (user) {
                let check = await comparePwd(pwd, user.pwd);
                if (check) return getJwt(username);
            }
        } catch (error) {
            throw error;
        }
    }

    async createUser(user) {
        try {
            user.pwd = await hashPwd(user.pwd);
            await this.userDao.createUser(user);
        } catch (error) {
            throw error;
        }
    }

    getUserById(id) {
        try {
            return this.userDao.getById(id);
        } catch (error) {
            throw error;
        }
    }
}