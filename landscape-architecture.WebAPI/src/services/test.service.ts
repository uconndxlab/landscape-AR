
const nativeAdd = require("../../build/Release/test");

export const getTestService = (): object => {
    return  {nativeCodeTest: nativeAdd(3, 5)}
}


