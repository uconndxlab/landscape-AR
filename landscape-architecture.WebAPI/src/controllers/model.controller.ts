import BadRequestError from "../errors/BadRequestError";
import { objectToTopoService } from "../services/model.service";
import { Request, Response } from "express"

export const objectToTopo = async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
        const id: string | null = req.query.id?.toString() || null;
        if (!id) {
            throw new BadRequestError({ message: "id is required", logging: true })
        }

        res.json(await objectToTopoService(id, 32, 32 ,32));
    } catch (err) {
        console.error("error");
        next(err);
    }
}