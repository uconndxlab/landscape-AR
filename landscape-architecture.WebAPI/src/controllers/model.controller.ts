import { objectToTopoService } from "../services/model.service";
import { Request, Response } from "express"

export const objectToTopo = async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
        const id: string | null = req.params.id;
        if (!id) {
            res.status(400).send("No file id provided");
        }

        res.json(await objectToTopoService(id));
    } catch (err) {
        console.error("error");
        next(err);
    }
}