using AutoMapper;
using landscape_architecture.WebAPI.DTO;
using landscape_architecture.WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Specialized;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.SignalR;

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

        /*
         * Uploads a file to the database
         * Takes an IFormFile from the controller, for now we are assuming this is a .obj 3D model file.
         * This file will be stored in the database as a byte array, with a generated GUID as the file name and the file extension.
         * Then we want to return the GUID to the controller as validation that the file was uploaded successfully.
         */
        public async Task<string> UploadFile(FileUploadDTO fileDto)
        {
            string fileName = "";
            try
            {
                FileInfo fileInfo = new FileInfo(fileDto.FormFile.FileName);
                string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileDto.FileName);
                // Milliseconds since epoch, to ensure unique file names
                long milliseconds = DateTimeOffset.Now.ToUnixTimeMilliseconds();
                fileName = fileNameWithoutExtension + "_" + milliseconds + fileInfo.Extension; 
                using (MemoryStream stream = new MemoryStream())
                {
                    await fileDto.FormFile.CopyToAsync(stream);
                    Models.File uploadedFile = new Models.File()
                    {
                        FileName = fileName,
                        FileData = stream.ToArray(),
                        FileExtension = fileInfo.Extension
                    };
                    _context.UploadedFiles.Add(uploadedFile);
                    await _context.SaveChangesAsync();
                }
                return fileName;
            }
            catch (Exception)
            {
                throw;
            }
        }


        /*
         * Takes a file from the database to download
         */
        public async Task<FileDownloadDTO?> DownloadFile(int fileId)
        {
            try
            {
                // Get the file from the database where the fileId matches the id of the file we want to download
                Models.File file = await _context.UploadedFiles.Where(f => f.Id == fileId).FirstOrDefaultAsync();
                if (file == null)
                {
                    return null;
                }

                // Create a FileDownloadDTO to return to the controller
                FileDownloadDTO fileDto = new FileDownloadDTO()
                {
                    FileName = file.FileName,
                    FileType = "application/octet-stream",
                    FileData = file.FileData
                };

                return fileDto;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
