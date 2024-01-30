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
exports.downloadFile = exports.uploadFile = void 0;
const files_service_1 = require("../services/files.service");
const BadRequestError_1 = __importDefault(require("../errors/BadRequestError"));
const InternalServerError_1 = __importDefault(require("../errors/InternalServerError"));
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const uploadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            throw new BadRequestError_1.default({ message: "No File Provided", logging: true });
        }
        const id = yield (0, files_service_1.uploadFileService)(file);
        if (!id) {
            throw new InternalServerError_1.default({ message: "File upload failed", logging: true });
        }
        res.status(200).json({
            message: "File uploaded successfully",
            id: id
        });
    }
    catch (err) {
        next(err);
    }
});
exports.uploadFile = uploadFile;
const downloadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        if (!id) {
            throw new BadRequestError_1.default({ message: "Id is required", logging: true });
        }
        const fileData = yield (0, files_service_1.downloadFileService)(id);
        if (!fileData) {
            throw new NotFoundError_1.default({ message: "File Not Found", logging: true });
        }
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'content-disposition': 'attachment; filename=' + id + '.obj'
        });
        res.end(fileData);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
exports.downloadFile = downloadFile;
