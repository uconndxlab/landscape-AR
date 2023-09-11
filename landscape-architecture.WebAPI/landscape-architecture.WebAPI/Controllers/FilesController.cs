using Microsoft.AspNetCore.Mvc;
using landscape_architecture.WebAPI.Services;
using landscape_architecture.WebAPI.DTO;

namespace landscape_architecture.WebAPI.Controllers
{
    [ApiController]
    [Route("api/v0/[controller]")]

    public class FilesController : ControllerBase
    {
        readonly ILogger<FilesController> _logger;

        readonly IFilesService _filesService;

        public FilesController(ILogger<FilesController> logger, IFilesService filesService)
        {
            _logger = logger;
            _filesService = filesService;
        }

        [HttpPost]
        [Route("UploadFile")]
        public async Task<ActionResult> UploadFile(IFormFile file)
        {
            var result = await _filesService.UploadFile(file);
            if (result == null)
            {
                // TODO: Add more specific exception handling
                return BadRequest("Invalid file upload");
            }
            return Ok();
        }

        [HttpGet]
        [Route("DownloadFile")]
        public async Task<ActionResult> DownloadFile(string fileName)
        {
            var result = await _filesService.DownloadFile(fileName);
            return File(result, "application/octet-stream"); // What content type do we want?
        }
    }
}
