import { Request, Response } from "express";

export const uploadFile = async (req: any, res: Response, next: Function): Promise<void> => {
    try {
        const file = req.body;
        const { oringinalname, buffer } = req.file;
        if (!file) {
            throw new Error("No file provided");
        }
        res.status(200).json({ message: "File uploaded successfully" });
    } catch (err) {
        next(err);
    }
}