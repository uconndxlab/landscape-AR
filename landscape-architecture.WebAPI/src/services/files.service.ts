import { v4 as uuidv4, v4 } from 'uuid';
import { prisma } from '..';
import NotFoundError from '../errors/NotFoundError';
import InternalServerError from '../errors/InternalServerError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import BadRequestError from "../errors/BadRequestError";

interface UploadedFile {
    Id: string;
    Name: string;
    Data: Buffer;
    UpdatedAt: Date | null;
}

export interface FileInfo {
    Id: string;
    Name: string;
    UpdatedAt: Date | null;
}

export const uploadFileService = async (file: Express.Multer.File): Promise<string> => {
    try {
        const blobData = file.buffer;
        const fileToUpload: UploadedFile = {
            Id: uuidv4(),
            Name: file.originalname,
            Data: blobData,
            UpdatedAt: new Date()
        };
        console.log(fileToUpload);
        const createFile = await prisma.uploadedFiles.create({ data: fileToUpload });
        console.log(createFile);
        return fileToUpload.Id;
    } catch (err: any) {
        throw new InternalServerError({ message: "File Failed to Upload to Server", logging: true });
    }
};

export const downloadFileService = async (id: string): Promise<Buffer> => {
    const file: UploadedFile | null = await prisma.uploadedFiles.findUnique({ where: { Id: id } });
    if (!file) {
        throw new NotFoundError({ message: "File Not Found", logging: true });
    }
    return file.Data;
}

export const deleteFileService = async  (id: string): Promise<boolean> => {
    console.log("deleteFileService");
    try {
        const deleteFile: UploadedFile = await prisma.uploadedFiles.delete({where: {Id: id}});
    } catch (err: any) {
        if (err.type === PrismaClientKnownRequestError) {
            throw new InternalServerError({message: "Requested File does not exist", logging: true});
        } else {
            throw new InternalServerError({message: "An unknown error occurred", logging: true});
        }
    }
    return true;
}

export const getFileDataService = async (): Promise<FileInfo[]> => {
    console.log("getting files");
    try {
        const files: UploadedFile[] = await prisma.uploadedFiles.findMany()
        if (!files) {
            throw new NotFoundError({message: "No files found", logging: true});
        }
        let fileInfo: FileInfo[] = [];
        files.forEach((file) => {
            fileInfo.push({
                Id: file.Id,
                Name: file.Name,
                UpdatedAt: file.UpdatedAt
            })
        })
        return fileInfo;
    } catch (err:any) {
        throw new InternalServerError({message: "Error fetching file data", logging: true});
    }
}
