import { v4 as uuidv4, v4 } from 'uuid';
import { prisma } from '..';
import NotFoundError from '../errors/NotFoundError';
import InternalServerError from '../errors/InternalServerError';

interface UploadedFile {
    Id: string;
    Name: string;
    Data: Buffer;
    UpdatedAt: Date;
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