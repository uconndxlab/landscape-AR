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
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileService = exports.uploadFileService = void 0;
const uuid_1 = require("uuid");
const __1 = require("..");
const uploadFileService = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blobData = file.buffer;
        const fileToUpload = {
            id: (0, uuid_1.v4)(),
            name: file.originalname,
            data: blobData,
            updatedAt: new Date()
        };
        const createFile = yield __1.prisma.uploadedFile.create({ data: fileToUpload });
        console.log(createFile);
        return fileToUpload.id;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.uploadFileService = uploadFileService;
const downloadFileService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield __1.prisma.uploadedFile.findUnique({ where: { id: id } });
    if (!file) {
        throw new Error("File not found");
    }
    return file.data;
});
exports.downloadFileService = downloadFileService;
