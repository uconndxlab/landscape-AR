using landscape_architecture.WebAPI.DTO;

namespace landscape_architecture.WebAPI.Services
{
    public interface IFilesService
    {
        Task<string> UploadFile(FileUploadDTO formFile);

        Task<FileDownloadDTO?> DownloadFile(int fileId);
    }
}
