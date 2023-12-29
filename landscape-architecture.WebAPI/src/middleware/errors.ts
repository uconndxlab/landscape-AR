import { NextFunction, Request, Response } from "express";
import { BaseError } from "../errors/BaseError";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) { //handled errors
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