using landscape_architecture.WebAPI.DTO;

namespace landscape_architecture.WebAPI.Services
{
    public interface IFilesService
    {
        Task<int> UploadFile(FileUploadDTO formFile);

        Task<(byte[], string, string)?> DownloadFile(string fileName);
    }
}
