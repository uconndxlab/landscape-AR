import { BaseError } from "./BaseError";


export default class NotFoundError extends BaseError {
    private static readonly DEFAULT_STATUS_CODE = 404;
    private readonly _statusCode: number;
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };

    constructor(params?: { message?: string, logging?: boolean, context?: { [key: string]: any } }) {
        const { message, logging } = params || {};
        super(message || "Not Found");

        this._statusCode = NotFoundError.DEFAULT_STATUS_CODE;
        this._logging = logging || false;
        this._context = params?.context || {};

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