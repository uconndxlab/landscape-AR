import { Request, Response, Router } from "express"
import { getTestService } from "../services/test.service"
import { prisma } from "..";

export const getTest = async (req: Request, res: Response, next: Function): Promise<void> => {
    try {

    } catch (err) {
        console.error("error");
        next(err);
    }
}

export const addTest = async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
        const name: string | undefined = req.query.name?.toString();
        console.log("name: ", name);
        if (!name) {
            throw new Error("Name is required");
        }
    } catch (err) {
        console.log("error");
        next(err);
    }

};