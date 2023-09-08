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

        readonly IUsersService _usersService;
        public UsersController(ILogger<UsersController> logger, IUsersService usersService)
        {
            _logger = logger;
            _usersService = usersService;
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<ActionResult<List<UserDTO>>> GetAllUsers()
        {
            return await _usersService.GetAllUsers();
        }

        [HttpGet]
        [Route("GetUserById")]
        public async Task<ActionResult<UserDTO>> GetUserById(int id)
        {
            var result = await _usersService.GetUserById(id);
            if (result == null)
            {
                return NotFound("User not found");
            }
            return result;
        }

        [HttpPost]
        [Route("AddUser")]
        public async Task<ActionResult<UserDTO>> AddUser(UserDTO userDto)
        {
            var result = await _usersService.AddUser(userDto);
            if (result == false)
            {
                return BadRequest("Invalid request parameters");
            }
            return Ok();
        }

        [HttpPut]
        [Route("UpdateUser")]
        public async Task<ActionResult<UserDTO>> UpdateUser(UserDTO userDto)
        {
            var result = await _usersService.UpdateUser(userDto);
            if (result == false)
            {
                return BadRequest("Invalid request parameters");
            }
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteUser")]
        public async Task<ActionResult<UserDTO>> DeleteUser(int id)
        {
            var result = await _usersService.DeleteUserById(id);
            if (result == false)
            {
                return NotFound("User not found");
            }
            return Ok();
        }
    }

}
