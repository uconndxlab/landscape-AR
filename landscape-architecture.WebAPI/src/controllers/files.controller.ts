import { Request, Response } from "express";
import {downloadFileService, uploadFileService, deleteFileService, getFileDataService} from "../services/files.service";
import BadRequestError from "../errors/BadRequestError";
import InternalServerError from "../errors/InternalServerError";
import NotFoundError from "../errors/NotFoundError";

export const uploadFile = async (req: any, res: Response, next: Function): Promise<void> => {
        const file = req.file;
        if (!file) {
            throw new BadRequestError({ message: "No File Provided", logging: true });
        }
        const id = await uploadFileService(file);
        if (!id) {
            throw new InternalServerError({ message: "File upload failed", logging: true });
        }
        res.status(200).json({
            message: "File uploaded successfully",
            id: id
        });
}

export const downloadFile = async (req: Request, res: Response, next: Function): Promise<void> => {
    const id: string | null = req.query.id as string;
    if (!id) {
        throw new BadRequestError({ message: "Id is required", logging: true });
    }
    const fileData: Buffer = await downloadFileService(id);
    if (!fileData) {
        throw new NotFoundError({ message: "File Not Found", logging: true });
    }
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'content-disposition': 'attachment; filename=' + id + '.obj'
    });
    res.end(fileData);
}

export const deleteFile = async (req: Request, res: Response, next: Function): Promise<void> => {
    const id: string | undefined = req.query.id as string;
    console.log(id);
    if (!id) {
        throw new BadRequestError({message: "Id is required", logging: true});
    }
    if (await deleteFileService(id)) {
        res.status(200).json({
            message: "File successfully deleted"
        });
    } else {
        throw new InternalServerError({message: "file deletion failed", logging: true});
    }
}

export const getAllFiles = async(req: Request, res: Response, next: Function): Promise<void> => {
    if (await getFileDataService()) {
        res.status(200).json({

        })
    }
}
