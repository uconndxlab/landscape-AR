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
exports.addTest = exports.getTest = void 0;
const getTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        console.error("error");
        next(err);
    }
});
exports.getTest = getTest;
const addTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const name = (_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString();
        console.log("name: ", name);
        if (!name) {
            throw new Error("Name is required");
        }
    }
    catch (err) {
        console.log("error");
        next(err);
    }
});
exports.addTest = addTest;
