using landscape_architecture.WebAPI.DTO;
using landscape_architecture.WebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace landscape_architecture.WebAPI.Controllers
{
    [ApiController]
    [Route("api/v0/[controller]")]
    public class UsersController : ControllerBase
    {
        readonly ILogger<UsersController> _logger;
        public UsersController(ILogger<UsersController> logger) 
        {
            _logger = logger;
        }
    }

/*    [HttpGet]
    [Route("GetUsers")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public List<ActionResult<UserDTO>> GetAllUsers()
    {

    }*/
}
