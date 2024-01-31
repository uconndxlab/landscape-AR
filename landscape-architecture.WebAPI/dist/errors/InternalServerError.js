"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("./BaseError");
class InternalServerError extends BaseError_1.BaseError {
    constructor(params) {
        const { statusCode, message, logging } = params || {};
        super(message || "Internal Server Error");
        this._statusCode = statusCode || InternalServerError.DEFAULT_STATUS_CODE;
        this._logging = logging || false;
        this._context = (params === null || params === void 0 ? void 0 : params.context) || {};
        Object.setPrototypeOf(this, InternalServerError.prototype);
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
InternalServerError.DEFAULT_STATUS_CODE = 500;
exports.default = InternalServerError;
