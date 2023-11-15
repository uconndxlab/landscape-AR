const objectToTopo = require("../../build/Release/ObjectToTopo")

interface IinputParams {
    xSize: number;
    ySize: number;
    zSize: number;
    grid: number[][]; // 2D array
}

export const objectToTopoService = (): object => {
    let inputParams: IinputParams = {
        "xSize": 64,
        "ySize": 64,
        "zSize": 64,
        "grid": []
    }
    objectToTopo(inputParams);
    return inputParams;
}