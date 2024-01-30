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
exports.downloadFileService = exports.uploadFileService = void 0;
const uuid_1 = require("uuid");
const __1 = require("..");
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const InternalServerError_1 = __importDefault(require("../errors/InternalServerError"));
const uploadFileService = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blobData = file.buffer;
        const fileToUpload = {
            Id: (0, uuid_1.v4)(),
            Name: file.originalname,
            Data: blobData,
            UpdatedAt: new Date()
        };
        const createFile = yield __1.prisma.uploadedFiles.create({ data: fileToUpload });
        console.log(createFile);
        return fileToUpload.Id;
    }
    catch (err) {
        throw new InternalServerError_1.default({ message: "File Failed to Upload to Server", logging: true });
    }
});
exports.uploadFileService = uploadFileService;
const downloadFileService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield __1.prisma.uploadedFiles.findUnique({ where: { Id: id } });
    if (!file) {
        throw new NotFoundError_1.default({ message: "File Not Found", logging: true });
    }
    return file.Data;
});
exports.downloadFileService = downloadFileService;
