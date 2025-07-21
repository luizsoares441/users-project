using UsersApi.DTOs;

namespace UsersApi.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponse>> GetUsersAsync();
        Task<UserResponse> CreateUserAsync(CreateUserDto createUserDto);
        Task<UserResponse> UpdateUserAsync(int id, CreateUserDto updateUserDto);
        Task<bool> DeleteUserAsync(int id);
    }
}
