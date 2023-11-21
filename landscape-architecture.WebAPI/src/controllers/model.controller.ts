import { objectToTopoService } from "../services/model.service";
import { Request, Response } from "express"

export const objectToTopo = async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
        res.json(objectToTopoService());
    } catch (err) {
        console.error("error");
        next(err);
    }
}