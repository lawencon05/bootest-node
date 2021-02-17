import { UserDao } from '../dao/user.dao.js';
import { hashPwd, comparePwd } from '../config/encrypt.js';
import { getJwt } from '../config/jwt.js';

let userDao = new UserDao();

export class UserService {

    async login(username, pwd) {
        try {
            let user = await userDao.getByEmail(username);
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
            userDao.createUser(user);
        } catch (error) {
            throw error;
        }
    }

    getUserById(id) {
        try {
            return userDao.getById(id);
        } catch (error) {
            throw error;
        }
    }
}