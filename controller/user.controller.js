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
        let user = req.body;
        userService.createUser(user)
            .then(() => super.resSuccess(res, user))
            .catch(error => super.resError(res, 500, error));
    }

    login(req, res) {
        let user = req.body;
        userService.login(user.email, user.pwd)
            .then(
                jwt => {
                    if (jwt) {
                        super.resSuccess(res, { token: jwt });
                    } else {
                        super.resError(res, 401, "Username/password not match")
                    }
                }
            ).catch(error => super.resError(res, 500, error));
    }

    getUserById(req, res) {
        userService.getUserById(req.params.id)
            .then(user => super.resSuccess(res, user))
            .catch(error => super.resError(res, 500, error));
    }

}