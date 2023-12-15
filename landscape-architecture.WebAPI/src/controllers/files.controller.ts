import { Request, Response } from "express";
import { downloadFileService, uploadFileService } from "../services/files.service";

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

export const downloadFile = async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
        const id: string | null = req.query.id as string;
        if (!id) {
            res.status(400).send("No file id provided");
        }
        const fileData: Buffer = await downloadFileService(id);
        if (!fileData) {
            res.status(404).send("File not found");
        }
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'content-disposition': 'attachment; filename=' + id + '.obj'
        });
        res.end(fileData);

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
        next(err);
    }
}