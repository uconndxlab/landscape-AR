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
const model_service_1 = require("../../services/model.service");
const InternalServerError_1 = __importDefault(require("../../errors/InternalServerError"));
const files_service_1 = require("../../services/files.service");
jest.mock('../../services/files.service', () => ({
    downloadFileService: jest.fn(),
}));
jest.mock('fs', () => ({
    writeFile: jest.fn((path, data, callback) => callback(null)),
    unlink: jest.fn((path, callback) => callback(null)),
}));
describe('objectToTopoService', () => {
    const TEST_FILE_ID = 'test _id';
    const NON_EXISTENT_FILE_ID = 'non_existent_id';
    const mockFileData = Buffer.from('test');
    it("should throw InternalServerError if file is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, model_service_1.objectToTopoService)(NON_EXISTENT_FILE_ID, 1, 1, 1);
        })).rejects.toThrow(InternalServerError_1.default);
    }));
    it("should call fileDownloadService when staging file", () => __awaiter(void 0, void 0, void 0, function* () {
        require('../../services/files.service').downloadFileService.mockResolvedValue(mockFileData);
        yield (0, model_service_1.objectToTopoService)(TEST_FILE_ID, 1, 1, 1);
        expect(files_service_1.downloadFileService).toHaveBeenCalled();
    }));
    it("returned grid should have proper size", () => __awaiter(void 0, void 0, void 0, function* () {
        require('../../services/files.service').downloadFileService.mockResolvedValue(mockFileData);
        const result = yield (0, model_service_1.objectToTopoService)(TEST_FILE_ID, 32, 32, 32);
        expect(result).toEqual({
            xSize: 32,
            ySize: 32,
            zSize: 32,
            gridBuffer: expect.anything()
        });
        expect(result.gridBuffer.length).toBe(32);
        result.gridBuffer.forEach((row) => {
            expect(row.length).toBe(32);
        });
    }));
    it("should throw InternalServerError on file deletion failure", () => __awaiter(void 0, void 0, void 0, function* () {
        require('../../services/files.service').downloadFileService.mockResolvedValue(mockFileData);
        require('fs').unlink.mockImplementation((path, callback) => callback(new Error('test'))); // Force deleteFile to error
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, model_service_1.objectToTopoService)(TEST_FILE_ID, 1, 1, 1);
        })).rejects.toThrow(InternalServerError_1.default);
    }));
    it("should delete file after converting", () => __awaiter(void 0, void 0, void 0, function* () {
        require('../../services/files.service').downloadFileService.mockResolvedValue(mockFileData);
        require('fs').unlink.mockImplementation((path, callback) => callback(null));
        yield (0, model_service_1.objectToTopoService)(TEST_FILE_ID, 1, 1, 1);
        expect(require('fs').unlink).toHaveBeenCalled();
    }));
    it("should throw InternalServerError on invalid input parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        require('../../services/files.service').downloadFileService.mockResolvedValue(mockFileData);
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, model_service_1.objectToTopoService)(TEST_FILE_ID, 0, 1, 1);
        })).rejects.toThrow(InternalServerError_1.default);
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, model_service_1.objectToTopoService)(TEST_FILE_ID, 1, 0, 1);
        })).rejects.toThrow(InternalServerError_1.default);
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, model_service_1.objectToTopoService)(TEST_FILE_ID, 1, 1, 0);
        })).rejects.toThrow(InternalServerError_1.default);
    }));
});
