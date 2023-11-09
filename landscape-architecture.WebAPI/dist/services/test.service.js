"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestService = void 0;
const nativeAdd = require("../../build/Release/test");
const getTestService = () => {
    return { nativeCodeTest: nativeAdd(3, 5) };
};
exports.getTestService = getTestService;
