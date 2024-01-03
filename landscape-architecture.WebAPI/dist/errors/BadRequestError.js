"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("./BaseError");
class BadRequestError extends BaseError_1.BaseError {
    constructor(params) {
        const { statusCode, message, logging } = params || {};
        super(message || "Bad Request");
        this._statusCode = statusCode || BadRequestError.DEFAULT_STATUS_CODE;
        this._logging = logging || false;
        this._context = (params === null || params === void 0 ? void 0 : params.context) || {};
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    get errors() {
        return [{ message: this.message, context: this._context }];
    }
    get statusCode() {
        return this._statusCode;
    }
    get logging() {
        return this._logging;
    }
}
BadRequestError.DEFAULT_STATUS_CODE = 400;
exports.default = BadRequestError;
