using landscape_architecture.WebAPI.DTO;

namespace landscape_architecture.WebAPI.Services
{
    public interface IUsersService
    {
        public Task<List<UserDTO>> GetAllUsers();

        public Task<UserDTO> GetUserById(int id);

        public void DeleteUserById(int id);

        public void AddUser(UserDTO userDTO);

        public void UpdateUser(UserDTO userDTO);
    }
}
