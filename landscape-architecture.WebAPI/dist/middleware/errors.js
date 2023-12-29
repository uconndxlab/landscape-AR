"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const BaseError_1 = require("../errors/BaseError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof BaseError_1.BaseError) { //handled errors
        const { statusCode, errors, logging } = err;
        if (logging) {
            console.error(JSON.stringify({
                code: err.statusCode,
                errors: err.errors
            }));
            res.status(statusCode).send({ errors });
        }
    }
    //unhandled errors
    console.error(JSON.stringify(err));
    return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
exports.errorHandler = errorHandler;
