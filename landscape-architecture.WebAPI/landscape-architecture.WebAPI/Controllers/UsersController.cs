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
        public ActionResult<List<UserDTO>> GetAllUsers()
        {
            return _usersService.GetAllUsers();
        }

        [HttpGet]
        [Route("GetUserById")]
        public ActionResult<UserDTO> GetUserById(int id)
        {
            return _usersService.GetUserById(id);
        }

        [HttpPut]
        [Route("AddUser")]
        public void AddUser(UserDTO user)
        {
            _usersService.AddUser(user);
        }

        [HttpPost]
        [Route("UpdateUser")]
        public void UpdateUser(UserDTO user)
        {
            _usersService.UpdateUser(user);
        }

        [HttpDelete]
        [Route("DeleteUser")]
        public void DeleteUser(int id)
        {
            _usersService.DeleteUserById(id);
        }
    }

}
