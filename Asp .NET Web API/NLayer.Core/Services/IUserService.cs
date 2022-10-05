using NLayer.Core.DTOs;
using NLayer.Core.Models;

namespace NLayer.Core.Services
{
    public interface IUserService : IService<User>
    {
        Task<User> AddUser(User entity);
        Task<UserDto> GetUserById(int id);
        Task AddRole(int UserId, int RoleId);
        Task RemoveRole(int UserId, int RoleId);


    }
}
