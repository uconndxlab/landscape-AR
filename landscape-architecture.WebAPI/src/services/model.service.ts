const objectToTopo = require("../../build/Release/ObjectToTopo")

interface IinputParams {
    xSize: number;
    ySize: number;
    zSize: number;
}

export const objectToTopoService = (): object => {
    let inputParams: IinputParams = {
        "xSize": 8,
        "ySize": 8,
        "zSize": 13,
    }
    const gridBuffer: number[] = new Array<number> (inputParams.xSize * inputParams.ySize);
    console.log(inputParams.xSize, inputParams.ySize, inputParams.zSize);
    objectToTopo(inputParams, gridBuffer);
    console.log(gridBuffer);
    return inputParams;
}