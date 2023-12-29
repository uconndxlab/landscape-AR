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
exports.downloadFile = exports.uploadFile = void 0;
const files_service_1 = require("../services/files.service");
const uploadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            throw new Error("No file provided");
        }
        const id = yield (0, files_service_1.uploadFileService)(file);
        if (!id) {
            throw new Error("File not successfully uploaded");
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
            res.status(400).send("No file id provided");
        }
        const fileData = yield (0, files_service_1.downloadFileService)(id);
        if (!fileData) {
            res.status(404).send("File not found");
        }
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'content-disposition': 'attachment; filename=' + id + '.obj'
        });
        res.end(fileData);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
        next(err);
    }
});
exports.downloadFile = downloadFile;
