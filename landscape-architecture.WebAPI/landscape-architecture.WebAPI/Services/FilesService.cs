using AutoMapper;
using landscape_architecture.WebAPI.DTO;
using landscape_architecture.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace landscape_architecture.WebAPI.Services
{
    public class FilesService : IFilesService
    {
        private readonly ILogger<FilesService> _logger;
        private readonly LandscapeContext _context;

        public FilesService(ILogger<FilesService> logger, LandscapeContext context, IMapper mapper)
        {
            this._logger = logger;
            this._context = context;
        }

        public async Task<string> UploadFile(IFormFile formFile)
        {
            string fileName = "";
            try
            {
                FileInfo fileInfo = new FileInfo(formFile.FileName);
                fileName = formFile.FileName + "_" + DateTime.Now.ToString("yyyyMMddHHmmss") + fileInfo.Extension;
                // Get the file path of the fileName
                var filePath = Path.GetFullPath(fileName);
          
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await formFile.CopyToAsync(fileStream);
                }
                return fileName;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return fileName;
            }

        }

        public async Task<(byte[], string, string)> DownloadFile(string fileName)
        {
            // Implement file download
        }


    }
}
