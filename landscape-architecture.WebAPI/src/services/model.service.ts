const objectToTopo = require("../../build/Release/ObjectToTopo")

interface IinputParams {
    xSize: number;
    ySize: number;
    zSize: number;
    fileName: string;
}

export const objectToTopoService = (): object => {
    let inputParams: IinputParams = {
        "xSize": 16,
        "ySize": 16,
        "zSize": 16,
        "fileName": "test.obj"
    }
    console.log(inputParams.xSize, inputParams.ySize, inputParams.zSize);
    const gridBuffer = objectToTopo(inputParams);
    console.log("converted");
    return {
        "xSize": inputParams.xSize,
        "ySize": inputParams.ySize,
        "zSize": inputParams.zSize,
        "gridBuffer": gridBuffer
    };
}