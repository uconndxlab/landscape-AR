"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("./BaseError");
class NotFoundError extends BaseError_1.BaseError {
    constructor(params) {
        const { message, logging } = params || {};
        super(message || "Not Found");
        this._statusCode = NotFoundError.DEFAULT_STATUS_CODE;
        this._logging = logging || false;
        this._context = (params === null || params === void 0 ? void 0 : params.context) || {};
        Object.setPrototypeOf(this, NotFoundError.prototype);
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
NotFoundError.DEFAULT_STATUS_CODE = 404;
exports.default = NotFoundError;
