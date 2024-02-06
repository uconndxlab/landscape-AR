import { ObjectToTopoResponse, objectToTopoService } from "../../src/services/model.service";
import InternalServerError from "../../src/errors/InternalServerError";
import { downloadFileService } from "../../src/services/files.service";


jest.mock('../../src/services/files.service', () => ({
    downloadFileService: jest.fn(),
}));

jest.mock('fs', () => ({
    writeFile: jest.fn((path, data, callback) => callback(null)),
    unlink: jest.fn((path, callback) => callback(null)),
}));

describe('objectToTopoService', () => {
    const TEST_FILE_ID = 'test _id';
    const NON_EXISTENT_FILE_ID = 'non_existent_id';
    const mockFileData = Buffer.from('test');

    it("should throw InternalServerError if file is not found", async () => {
        expect(async () => {
            await objectToTopoService(NON_EXISTENT_FILE_ID, 1, 1, 1)
        }).rejects.toThrow(InternalServerError);
    })
    it("should call fileDownloadService when staging file", async() => {
        (require('../../src/services/files.service').downloadFileService as jest.Mock).mockResolvedValue(mockFileData);
        await objectToTopoService(TEST_FILE_ID, 1, 1, 1);
        expect(downloadFileService).toHaveBeenCalled();
    })
    it("returned grid should have proper size", async () => {
        (require('../../src/services/files.service').downloadFileService as jest.Mock).mockResolvedValue(mockFileData);
        const result: ObjectToTopoResponse = await objectToTopoService(TEST_FILE_ID, 32, 32, 32);
        expect(result).toEqual({
            xSize: 32,
            ySize: 32,
            zSize: 32,
            gridBuffer: expect.anything()
        });
        expect(result.gridBuffer.length).toBe(32);
        result.gridBuffer.forEach((row) => {
            expect(row.length).toBe(32);
        });
    })
    it("should throw InternalServerError on file deletion failure", async () => {
        (require('../../src/services/files.service').downloadFileService as jest.Mock).mockResolvedValue(mockFileData);
        (require('fs').unlink as jest.Mock).mockImplementation((path, callback) => callback(new Error('test'))); // Force deleteFile to error
        expect(async () => {
            await objectToTopoService(TEST_FILE_ID, 1, 1, 1);
        }).rejects.toThrow(InternalServerError);
    })
    it("should delete file after converting", async () => {
        (require('../../src/services/files.service').downloadFileService as jest.Mock).mockResolvedValue(mockFileData);
        (require('fs').unlink as jest.Mock).mockImplementation((path, callback) => callback(null));
        await objectToTopoService(TEST_FILE_ID, 1, 1, 1);
        expect(require('fs').unlink).toHaveBeenCalled();
    })
    it("should throw InternalServerError on invalid input parameters", async () => {
        (require('../../src/services/files.service').downloadFileService as jest.Mock).mockResolvedValue(mockFileData);
        expect(async () => {
            await objectToTopoService(TEST_FILE_ID, 0, 1, 1);
        }).rejects.toThrow(InternalServerError);
        expect(async () => {
            await objectToTopoService(TEST_FILE_ID, 1, 0, 1);
        }).rejects.toThrow(InternalServerError);
        expect(async () => {
            await objectToTopoService(TEST_FILE_ID, 1, 1, 0);
        }).rejects.toThrow(InternalServerError);
    })
});