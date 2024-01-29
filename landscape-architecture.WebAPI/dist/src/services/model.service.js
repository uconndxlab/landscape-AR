"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToTopoService = void 0;
const InternalServerError_1 = __importDefault(require("../errors/InternalServerError"));
const files_service_1 = require("./files.service");
const fs_1 = __importDefault(require("fs"));
const objectToTopo = require("../../../build/Release/ObjectToTopo");
const stageFile = (fileId) => {
    return new Promise((resolve, reject) => {
        (0, files_service_1.downloadFileService)(fileId)
            .then((fileData) => {
            if (!fileData) {
                throw new Error('File not found');
            }
            const currentDir = __dirname;
            const filePath = `${currentDir}/../../src/services/conversion-scripts/stagedFiles/${fileId}.obj`;
            fs_1.default.writeFile(filePath, fileData.toString(), (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(); // File is written successfully
                }
            });
        })
            .catch((error) => {
            reject(error);
        });
    });
};
const deleteFile = (fileId) => {
    return new Promise((resolve, reject) => {
        const currentDir = __dirname;
        const filePath = `${currentDir}/../../src/services/conversion-scripts/stagedFiles/${fileId}.obj`;
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(); // File is deleted successfully
            }
        });
    });
};
const objectToTopoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield stageFile(id);
    }
    catch (stagingError) {
        throw new InternalServerError_1.default({ message: "File not properly staged for conversion", logging: true });
    }
    const inputParams = {
        "xSize": 32,
        "ySize": 32,
        "zSize": 32,
        "fileName": id + ".obj"
    };
    let gridBuffer = null;
    try {
        gridBuffer = objectToTopo(inputParams);
        if (!gridBuffer) {
            throw new InternalServerError_1.default({ message: "File Conversion Failed", logging: true });
        }
    }
    catch (conversionError) {
        throw new InternalServerError_1.default({ message: "File Conversion Failed", logging: true });
    }
    if (!gridBuffer) {
        throw new InternalServerError_1.default({ message: "Conversion failed ", logging: true });
    }
    try {
        yield deleteFile(id);
    }
    catch (deleteFileError) {
        throw new InternalServerError_1.default({ logging: true });
    }
    return {
        "xSize": inputParams.xSize,
        "ySize": inputParams.ySize,
        "zSize": inputParams.zSize,
        "gridBuffer": gridBuffer
    };
});
exports.objectToTopoService = objectToTopoService;
