import { Request, Response, Router } from "express"
import { getTestService } from "../services/test.service"

export const getTest = async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
        res.json(getTestService());
    } catch (err) {
        console.error("error");
        next(err);
    }
}