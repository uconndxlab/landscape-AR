"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToTopoService = void 0;
const objectToTopo = require("../../build/Release/ObjectToTopo");
const objectToTopoService = () => {
    let inputParams = {
        "xSize": 8,
        "ySize": 8,
        "zSize": 13,
    };
    const gridBuffer = new Array(inputParams.xSize * inputParams.ySize);
    console.log(inputParams.xSize, inputParams.ySize, inputParams.zSize);
    objectToTopo(inputParams, gridBuffer);
    console.log(gridBuffer);
    return inputParams;
};
exports.objectToTopoService = objectToTopoService;
