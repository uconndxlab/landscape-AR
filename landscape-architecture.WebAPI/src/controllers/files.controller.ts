import { Request, Response } from "express";
import { uploadFileService } from "../services/files.service";

export const uploadFile = async (req: any, res: Response, next: Function): Promise<void> => {
    try {
        const file = req.file;
        if (!file) {
            throw new Error("No file provided");
        }
        const id = await uploadFileService(file);
        if (!id) {
            throw new Error("File not successfully uploaded");
        }
        res.status(200).json({
            message: "File uploaded successfully",
            id: id
        });
    } catch (err) {
        next(err);
    }
}