using AutoMapper;
using landscape_architecture.WebAPI.DTO;
using landscape_architecture.WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Specialized;
using System.Runtime.CompilerServices;

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
        public async Task<string> UploadFile(IFormFile formFile)
        {
            string fileName = "";
            try
            {
                FileInfo fileInfo = new FileInfo(formFile.FileName);
                fileName = formFile.FileName + "_" + Guid.NewGuid().ToString() + fileInfo.Extension;
                using (MemoryStream stream = new MemoryStream())
                {
                    await formFile.CopyToAsync(stream);
                    UploadedFile uploadedFile = new UploadedFile()
                    {
                        FileName = fileName,
                        FileData = stream.ToArray(),
                        FileExtension = fileInfo.Extension
                    };
                    _context.UploadedFiles.Add(uploadedFile);
                }

                await _context.SaveChangesAsync();
                return fileName;
            }
            catch (Exception)
            {
                throw;
            }
        }


        /*
         * Takes a file from the database to download
         * TODO: Implement this, we likely want to use a DTO to pass the file data back to the controller
         */
        public async Task<(byte[], string, string)?> DownloadFile(string fileName)
        {
            var file = await _context.UploadedFiles.FirstOrDefaultAsync(f => f.FileName == fileName);
            return null;
        }
    }
}
