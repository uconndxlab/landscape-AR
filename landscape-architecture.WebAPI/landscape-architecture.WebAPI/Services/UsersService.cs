using AutoMapper;
using landscape_architecture.WebAPI.DTO;
using landscape_architecture.WebAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System.ComponentModel;

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

            this._mapper = config.CreateMapper();
        }

        public async Task<List<UserDTO>> GetAllUsers()
        {
            // Get all the users from the database
            var users = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserDTO>>(users);
        }

        public async Task<UserDTO?> GetUserById(int id)
        {
            // Get a user by their id
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return null;
            }
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<bool> AddUser(UserDTO userDto)
        {
            // TODO: Add checks for if user exists and if userDto is valid
            // add a new user to the database
            var user = _mapper.Map<User>(userDto);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteUserById(int id)
        {
            // delete a user from the database
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateUser(UserDTO userDto)
        {
            // TODO: Add checks for if user exists and if userDto is valid
            // Update a user in the database
            var user = _mapper.Map<User>(userDto);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
