using UsersApi.Models;

namespace UsersApi.Data.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task CreateUserAsync(User user);
        Task UpdateUserAsync(int id, User user);
        Task<bool> DeleteUserAsync(User user);
    }
}
