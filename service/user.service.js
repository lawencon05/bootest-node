import { UserDao } from '../dao/user.dao.mongo.js';
import { hashPwd, comparePwd } from '../config/encrypt.js';
import { getJwt } from '../config/jwt.js';
import { redis } from '../config/db.js';
import { promisify } from 'util';

export class UserService {

    userDao = new UserDao();

    async login(username, pwd) {
        try {
            let key = `login-${username}`;
            let get = await promisify(redis().get).bind(redis());
            let data = await get(key);
            if (data) {
                return data;
            } else {
                let user = await this.userDao.getByEmail(username);
                if (user) {
                    let check = await comparePwd(pwd, user.pwd);
                    if (check) {
                        let jwt = getJwt(username);
                        redis().setex(key, 600, jwt);
                        return jwt;
                    }
                }
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

    async getUserById(id) {
        try {
            let key = `getUserById-${id}`;
            let get = await promisify(redis().get).bind(redis());
            let data = await get(key);
            if (data) {
                return JSON.parse(data);
            } else {
                let user = await this.userDao.getById(id);
                redis().setex(key, 600, JSON.stringify(user));
                return user;
            }
        } catch (error) {
            throw error;
        }
    }
}