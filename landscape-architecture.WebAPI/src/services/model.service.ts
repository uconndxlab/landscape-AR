import { downloadFileService } from "./files.service";
import fs from 'fs';

const objectToTopo = require("../../build/Release/ObjectToTopo")


interface IinputParams {
    xSize: number;
    ySize: number;
    zSize: number;
    fileName: string;
}

const stageFile = (fileId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        downloadFileService(fileId)
            .then((fileData: Buffer) => {
                if (!fileData) {
                    throw new Error('File not found');
                }

                const currentDir: string = __dirname;
                const filePath: string = `${currentDir}/../../src/services/conversion-scripts/stagedFiles/${fileId}.obj`;

                fs.writeFile(filePath, fileData.toString(), (err) => {
                    if (err) {
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
        const currentDir: string = __dirname;
        const filePath: string = `${currentDir}/../../src/services/conversion-scripts/stagedFiles/${fileId}.obj`;
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(); // File is deleted successfully
            }
        });
    })
}


export const objectToTopoService = async (id: string): Promise<object> => {
    try {
        await stageFile(id);
        let inputParams: IinputParams = {
            "xSize": 16,
            "ySize": 16,
            "zSize": 16,
            "fileName": id + ".obj"
        }
        const gridBuffer = objectToTopo(inputParams);
        await deleteFile(id);
        return {
            "xSize": inputParams.xSize,
            "ySize": inputParams.ySize,
            "zSize": inputParams.zSize,
            "gridBuffer": gridBuffer
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
}