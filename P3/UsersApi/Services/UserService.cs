using UsersApi.Data.Repositories;
using UsersApi.DTOs;
using UsersApi.Models;

namespace UsersApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }
        public async Task<UserResponse> CreateUserAsync(CreateUserDto createUserDto)
        {
            await _repository.CreateUserAsync(new User
            {
                Name = createUserDto.Name,
                Email = createUserDto.Email,
                Password = createUserDto.Password
            });
            return new UserResponse
            {
                Name = createUserDto.Name,
                Email = createUserDto.Email,
                Password = createUserDto.Password
            };
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _repository.GetUserByIdAsync(id);
            if (user == null)
            {
                return false;
            }
            return await _repository.DeleteUserAsync(user);
        }

        public async Task<IEnumerable<UserResponse>> GetUsersAsync()
        {
            var users = await _repository.GetUsersAsync();
            return users.Select(u => new UserResponse
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email
            });
        }

        public async Task<UserResponse> UpdateUserAsync(int id, CreateUserDto updateUserDto)
        {
            if( updateUserDto == null)
            {
                throw new ArgumentNullException(nameof(updateUserDto));
            }
            var user = new User
            {
                Id = id,
                Name = updateUserDto.Name,
                Email = updateUserDto.Email,
                Password = updateUserDto.Password
            };
            await _repository.UpdateUserAsync(id, user);
            return new UserResponse
            {
                Id = id,
                Name = updateUserDto.Name,
                Email = updateUserDto.Email,
                Password = updateUserDto.Password
            };
        }
    }
}
