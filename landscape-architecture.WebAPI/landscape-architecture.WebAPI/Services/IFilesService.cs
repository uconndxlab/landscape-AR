namespace landscape_architecture.WebAPI.Services
{
    public interface IFilesService
    {
        Task<string> UploadFile(IFormFile formFile);

        Task<(byte[], string, string)> DownloadFile(string fileName);
    }
}
