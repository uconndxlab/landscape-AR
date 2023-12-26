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
const files_service_1 = require("./files.service");
const fs_1 = __importDefault(require("fs"));
const objectToTopo = require("../../build/Release/ObjectToTopo");
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
        let inputParams = {
            "xSize": 16,
            "ySize": 16,
            "zSize": 16,
            "fileName": id + ".obj"
        };
        const gridBuffer = objectToTopo(inputParams);
        yield deleteFile(id);
        return {
            "xSize": inputParams.xSize,
            "ySize": inputParams.ySize,
            "zSize": inputParams.zSize,
            "gridBuffer": gridBuffer
        };
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
exports.objectToTopoService = objectToTopoService;
