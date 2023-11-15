"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToTopoService = void 0;
const objectToTopo = require("../../build/Release/ObjectToTopo");
const objectToTopoService = () => {
    let inputParams = {
        "xSize": 64,
        "ySize": 64,
        "zSize": 64,
        "grid": []
    };
    objectToTopo(inputParams);
    return inputParams;
};
exports.objectToTopoService = objectToTopoService;
