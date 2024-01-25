import { BaseError } from "./BaseError";

export default class InternalServerError extends BaseError {
    private static readonly DEFAULT_STATUS_CODE = 500;
    private readonly _statusCode: number;
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };

    constructor(params?: { statusCode?: number, message?: string, logging?: boolean, context?: [key: string] | any }) {
        const { statusCode, message, logging } = params || {};
        super(message || "Internal Server Error");

        this._statusCode = statusCode || InternalServerError.DEFAULT_STATUS_CODE;
        this._logging = logging || false;
        this._context = params?.context || {};

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