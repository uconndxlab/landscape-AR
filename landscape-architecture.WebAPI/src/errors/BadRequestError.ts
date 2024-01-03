import { BaseError } from "./BaseError";


export default class BadRequestError extends BaseError {
    private static readonly DEFAULT_STATUS_CODE = 400;
    private readonly _statusCode: number;
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };

    constructor(params?: { statusCode?: number, message?: string, logging?: boolean, context?: { [key: string]: any } }) {
        const { statusCode, message, logging } = params || {};
        super(message || "Bad Request");

        this._statusCode = statusCode || BadRequestError.DEFAULT_STATUS_CODE;
        this._logging = logging || false;
        this._context = params?.context || {};

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