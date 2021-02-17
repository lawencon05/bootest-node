import { UserService } from '../service/user.service.js';
import { BaseController } from './base.controller.js';
import { isAuth } from '../config/jwt.js';

let userService = new UserService();

export class UserController extends BaseController {

    constructor(router) {
        super();
        router.post('/user', this.createUser);
        router.post('/user/login', this.login);
        router.get('/user/:id', isAuth, this.getUserById);
    }

    createUser(req, res) {
        try {
            let user = req.body;
            userService.createUser(user);
            super.resSuccess(res, user);
        } catch (error) {
            super.resError(res, error);
        }
    }

    async login(req, res) {
        try {
            let user = req.body;
            let jwt = await userService.login(user.email, user.pwd);
            if (jwt) {
                super.resSuccess(res, { token: jwt });
            } else {
                super.resError(res, 401, "Username/password not match");
            }
        } catch (error) {
            super.resError(res, error);
        }
    }

    async getUserById(req, res) {
        try {
            let user = await userService.getUserById(req.params.id);
            super.resSuccess(res, user);
        } catch (error) {
            super.resError(res, error);
        }
    }

}