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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok("Successfully uploaded file " + result);
        }

        [HttpGet]
        [Route("DownloadFile")]
        public async Task<ActionResult> DownloadFile(string fileName)
        {
            var result = await _filesService.DownloadFile(fileName);
            if (result == null)
            {
                return NotFound("File does not exist");
            }
            // return File(); How do we return a file?
            return Ok();
        }
    }
}
