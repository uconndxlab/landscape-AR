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
exports.objectToTopo = void 0;
const BadRequestError_1 = __importDefault(require("../errors/BadRequestError"));
const model_service_1 = require("../services/model.service");
const objectToTopo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = ((_a = req.query.id) === null || _a === void 0 ? void 0 : _a.toString()) || null;
        if (!id) {
            throw new BadRequestError_1.default({ message: "id is required", logging: true });
        }
        res.json(yield (0, model_service_1.objectToTopoService)(id));
    }
    catch (err) {
        console.error("error");
        next(err);
    }
});
exports.objectToTopo = objectToTopo;
