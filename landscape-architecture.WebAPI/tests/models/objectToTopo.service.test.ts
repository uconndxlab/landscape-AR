import { objectToTopoService } from "../../src/services/model.service";
import InternalServerError from "../../src/errors/InternalServerError";

describe('objectToTopoService', () => {
    const TEST_FILE_PATH = __dirname + '../../testFiles/testFile1.obj';
    const NON_EXISTENT_FILE_PATH = __dirname + '../../testFiles/FileThatDoesntExist.obj';
    it("should throw InternalServerError if file is not found", async () => {
        expect(async () => {
            await objectToTopoService(NON_EXISTENT_FILE_PATH)
        }).rejects.toThrow(InternalServerError);
    })
});