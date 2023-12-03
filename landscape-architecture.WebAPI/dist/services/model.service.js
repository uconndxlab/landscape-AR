"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToTopoService = void 0;
const objectToTopo = require("../../build/Release/ObjectToTopo");
const objectToTopoService = () => {
    let inputParams = {
        "xSize": 16,
        "ySize": 16,
        "zSize": 16,
        "fileName": "test.obj"
    };
    console.log(inputParams.xSize, inputParams.ySize, inputParams.zSize);
    const gridBuffer = objectToTopo(inputParams);
    console.log("converted");
    return {
        "xSize": inputParams.xSize,
        "ySize": inputParams.ySize,
        "zSize": inputParams.zSize,
        "gridBuffer": gridBuffer
    };
};
exports.objectToTopoService = objectToTopoService;
