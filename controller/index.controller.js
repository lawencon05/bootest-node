import { UserController } from "./user.controller.js";

export class IndexController {

    //register all controller
    init(router) {
        router.get('/', (req, res) => {
            res.status(200).json('Hello World!')
        })

        new UserController(router);
    }
}