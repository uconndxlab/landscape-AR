using landscape_architecture.WebAPI.DTO;

namespace landscape_architecture.WebAPI.Services
{
    public interface IUsersService
    {
        Task<List<UserDTO>> GetAllUsers();

        Task<UserDTO?> GetUserById(int id);

        Task<bool> DeleteUserById(int id);

        Task<bool> AddUser(UserDTO userDTO);

        Task<bool> UpdateUser(UserDTO userDTO);
    }
}
