using AutoMapper;
using landscape_architecture.WebAPI.DTO;
using landscape_architecture.WebAPI.Models;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace landscape_architecture.WebAPI.Services
{
    public class UsersService : IUsersService
    {

        private readonly LandscapeContext _context;
        private readonly IMapper _mapper;
        public UsersService(LandscapeContext context, IMapper mapper) 
        {
            this._context = context;
            this._mapper = mapper;
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDTO>();
                cfg.CreateMap<UserDTO, User>();
            });

            mapper = config.CreateMapper();
        }

        public async void AddUser(UserDTO userDTO)
        {
            // add a new user to the database
            // TODO: add error checking to make sure the userDTO has all the required fields
            if (userDTO == null)
            {
                throw new System.Exception("User cannot be null");
            }
            var user = _mapper.Map<User>(userDTO);
            await _context.Users.AddAsync(user);
            _context.SaveChanges();
        }

        public async void DeleteUserById(int id)
        {
            // delete a user from the database
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
            else
            {
                throw new System.Exception("User not found");
            }
        }

        public async Task<List<UserDTO>> GetAllUsers()
        {
            // Get all the users from the database
            var users = await _context.Users.ToListAsync();
            var usersDTO = _mapper.Map<List<UserDTO>>(users);
            return usersDTO;
        }

        public async Task<UserDTO> GetUserById(int id)
        {
            // Get a user by their id
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                var userDTO = _mapper.Map<UserDTO>(user);
                return userDTO;
            }
            else
            {
                throw new System.Exception("User not found");
            }
        }

        public async void UpdateUser(UserDTO userDTO)
        {
            // Update a user in the database
            var user = await _context.Users.FindAsync(userDTO.Id);
            if (user != null)
            {
                _mapper.Map(userDTO, user);
                _context.SaveChanges();
            }
            else
            {
                throw new System.Exception("User not found");
            }
        }
    }
}
