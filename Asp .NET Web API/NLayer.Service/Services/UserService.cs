using AutoMapper;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.EntityFrameworkCore;
using NLayer.Core.DTOs;
using NLayer.Core.Models;
using NLayer.Core.Repositories;
using NLayer.Core.Services;
using NLayer.Core.UnitOfWorks;
using NLayer.Repository;
using System.Data;
using System.Linq.Expressions;

namespace NLayer.Service.Services
{
    public class UserService : Service<User>, IUserService
    {
        private readonly IGenericRepository<User> _repository;
        private readonly IGenericRepository<UserRole> _userRoleRepository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
 

        public UserService(AppDbContext context, IGenericRepository<UserRole> userRoleRepository, IGenericRepository<User> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _repository = repository;
            _mapper = mapper;
            _userRoleRepository = userRoleRepository;
            _context = context;


        }

        public async Task AddRole(int UserId, int RoleId)
        {
            UserRole userRole = new UserRole
            {
                UserId = UserId,
                RoleId = RoleId
            };
            await _userRoleRepository.AddAsync(userRole);
            await _unitOfWork.CommitAsync();
        }

        public async Task<User> AddUser(User entity)
        {
            

            foreach (UserRole userRole in entity.UserRoles)
            {
                _context.Entry(userRole).State = EntityState.Unchanged;
            }
                     
            _context.Users.Add(entity);
            _context.SaveChanges();

            return entity;
        }
        public async Task RemoveRole(int UserId, int RoleId)
        {
            UserRole userRole = new UserRole
            {
                UserId = UserId,
                RoleId = RoleId
            };
            _userRoleRepository.Remove(userRole);
            await _unitOfWork.CommitAsync();
        }

        public Task<UserDto> GetUserById(int id)
        {
            throw new NotImplementedException();
        }


       

    }
}
