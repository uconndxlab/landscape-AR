import { v4 as uuidv4, v4 } from 'uuid';
import { prisma } from '..';

interface UploadedFile {
    id: string;
    name: string;
    data: Buffer;
    updatedAt: Date;
}

export const uploadFileService = async (file: Express.Multer.File): Promise<string> => {
    try {
        const blobData = file.buffer;
        const fileToUpload: UploadedFile = {
            id: uuidv4(),
            name: file.originalname,
            data: blobData,
            updatedAt: new Date()
        };
        const createFile = await prisma.uploadedFile.create({ data: fileToUpload });
        console.log(createFile);
        return fileToUpload.id;
    } catch (err: any) {
        throw new Error(err);
    }
};