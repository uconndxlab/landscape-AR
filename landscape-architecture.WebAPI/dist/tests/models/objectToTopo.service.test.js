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
const model_service_1 = require("../../src/services/model.service");
const InternalServerError_1 = __importDefault(require("../../src/errors/InternalServerError"));
describe('objectToTopoService', () => {
    const TEST_FILE_PATH = __dirname + '../../testFiles/testFile1.obj';
    const NON_EXISTENT_FILE_PATH = __dirname + '../../testFiles/FileThatDoesntExist.obj';
    it("should throw InternalServerError if file is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, model_service_1.objectToTopoService)(NON_EXISTENT_FILE_PATH);
        })).rejects.toThrow(InternalServerError_1.default);
    }));
});
