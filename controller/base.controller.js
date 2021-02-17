export class BaseController {

    resSuccess(res, data) {
        res.json(data);
    }

    resError(res, error) {
        // console.error(error);
        res.status(500).send(error.stack);
    }

    resError(res, status, msg) {
        res.status(status).send(msg);
    }

}