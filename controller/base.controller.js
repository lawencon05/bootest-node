export class BaseController {

    resSuccess(res, data) {
        res.json(data);
    }

    resError(res, status, msg) {
        res.status(status).send(msg);
    }

}