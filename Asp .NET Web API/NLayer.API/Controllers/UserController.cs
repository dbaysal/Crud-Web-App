using Microsoft.AspNetCore.Mvc;
using NLayer.Core.DTOs;
using NLayer.Core;
using AutoMapper;
using NLayer.Core.Services;
using NLayer.Core.Models;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using NLayer.Repository;

namespace NLayer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : CustomBaseController
    {

        private readonly IUserService _userService;
        private readonly IService<UserRole> _userRoleService;
        private readonly IMapper _mapper;
        AppDbContext _appDbContext;

        public UserController(IUserService service, IMapper mapper, IService<UserRole> userRoleService, AppDbContext appDbContext)
        {
            _userService = service;
            _mapper = mapper;
            _userRoleService = userRoleService;
            _appDbContext = appDbContext;
        }


        //add user
        [HttpPost]
        public async Task<IActionResult> Save(UserDto userDto)
        {
            var user = await _userService.AddAsync(_mapper.Map<User>(userDto));

            var usersDto = _mapper.Map<UserDto>(user);

            return CreateActionResult(CustomResponseDto<UserDto>.Success(201, usersDto));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserById(id);
            return CreateActionResult(CustomResponseDto<UserDto>.Success(200, user));
        }

        [HttpGet("[action]/{UserId}/{RoleId}")]
        public async Task<IActionResult> AddRole(int UserId, int RoleId)
        {
            await _userService.AddRole(UserId, RoleId);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(204));
        }

        [HttpGet("[action]/{UserId}/{RoleId}")]
        public async Task RemoveRole(int UserId, int RoleId)
        {
            await _userService.RemoveRole(UserId, RoleId);

        }

        [HttpGet]
        public async Task<IActionResult> All()
        {

            var users = await _userService.GetAllAsync();

             

            var userDtos = _mapper.Map<List<UserDto>>(users.ToList());

            foreach(UserDto userDto in userDtos)
            {
                var UserRoleDtos = _mapper.Map<List<UserRoleDto>>(_userRoleService.Where(x => x.UserId == userDto.Id).ToList());
                userDto.RoleIds = new List<int>();

                foreach(UserRoleDto userRole in UserRoleDtos)
                {
                    userDto.RoleIds.Add(userRole.RoleId);
                }

                
       
            }
            return CreateActionResult(CustomResponseDto<List<UserDto>>.Success(200, userDtos));
        }


        [HttpGet("GetUserRoles/{id}")]
        public  async Task<IActionResult> GetUserRoles(int id)
        {
            var userRoles =  _userRoleService.Where(x => x.UserId == id);

            var userRoleDtos = _mapper.Map<List<UserRoleDto>>(userRoles.ToList());

            return CreateActionResult(CustomResponseDto<List<UserRoleDto>>.Success(200, userRoleDtos));
        }



    }
}
