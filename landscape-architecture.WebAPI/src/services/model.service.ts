import InternalServerError from "../errors/InternalServerError";
import {downloadFileService} from "./files.service";
import fs from 'fs';

const objectToTopo = require("@cpp/ObjectToTopo")


interface IinputParams {
    xSize: number;
    ySize: number;
    zSize: number;
    fileName: string;
}

export interface ObjectToTopoResponse {
    xSize: number;
    ySize: number;
    zSize: number;
    gridBuffer: number[][];
}

const stageFile = (fileId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        downloadFileService(fileId)
            .then((fileData: Buffer) => {
                if (!fileData) {
                    throw new Error('File not found');
                }

                const filePath: string = `${__dirname}/../../../src/services/conversion-scripts/stagedFiles/${fileId}.obj`;

                fs.writeFile(filePath, fileData.toString(), (err) => {
                    if (err) {
                        console.log(err)
                        reject(err);
                    } else {
                        resolve(); // File is written successfully
                    }
                });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const deleteFile = (fileId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const filePath: string = `${__dirname}/../../../src/services/conversion-scripts/stagedFiles/${fileId}.obj`;
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(); // File is deleted successfully
            }
        });
    })
}


export const objectToTopoService = async (id: string, xs: number, ys: number, zs: number): Promise<ObjectToTopoResponse> => {
    if (xs <= 0 || ys <= 0 || zs <= 0) {
        throw new InternalServerError({ message: "Invalid input parameters", logging: true });
    }
    try {
        await stageFile(id);
    } catch (stagingError) {
        throw new InternalServerError({ message: "File not properly staged for conversion", logging: true });
    }
    const inputParams: IinputParams = {
        "xSize": xs,
        "ySize": ys,
        "zSize": zs,
        "fileName": id + ".obj"
    }
    let gridBuffer: number[][] | null = null;
    try {
        gridBuffer = objectToTopo(inputParams);
        if (!gridBuffer) {
            throw new InternalServerError({ message: "File Conversion Failed", logging: true });
        }
    } catch (conversionError) {
        throw new InternalServerError({ message: "File Conversion Failed", logging: true });
    }
    if (!gridBuffer) {
        throw new InternalServerError({ message: "Conversion failed ", logging: true });
    }
    try {
        await deleteFile(id);
    } catch (deleteFileError) {
        throw new InternalServerError({ logging: true });
    }
    const response: ObjectToTopoResponse = {
        "xSize": inputParams.xSize,
        "ySize": inputParams.ySize,
        "zSize": inputParams.zSize,
        "gridBuffer": gridBuffer
    };
    return response;
}