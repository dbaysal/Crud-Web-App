using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NLayer.Core.DTOs;
using NLayer.Core.Models;
using NLayer.Core.Services;
using NLayer.Repository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace NLayer.API.Controllers
{
    public class LoginController : CustomBaseController
    {
        private readonly IService<User> _userService;
        private readonly IService<UserRole> _userRoleService;
        private readonly IMapper _mapper;
        private IConfiguration _config;
        private readonly AppDbContext _context;



        public LoginController(AppDbContext context, IConfiguration config, IService<User> userService, IMapper mapper, IService<UserRole> userRoleService)
        {
            _config = config;
            _userService = userService;
            _mapper = mapper;
            _context = context;
            _userRoleService = userRoleService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserDto userLogin)
        {
            var user = await Authenticate(userLogin);

            if (user != null)
            {
                var token = Generate(user);
                return CreateActionResult(CustomResponseDto<TokenDto>.Success(200, new TokenDto(token)));
            }

            return CreateActionResult(CustomResponseDto<UserDto>.Fail(404, "User not found"));


        }

        private  string Generate(UserDto user)
        {


            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var userRoles = _userRoleService.Where(x=> x.UserId == user.Id).ToList();

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Username));

            foreach(var userRole in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, userRole.RoleId.ToString()));
            }

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<UserDto?> Authenticate(UserDto userLogin)
        {
            var users = await _userService.GetAllAsync();
            var userDtos = _mapper.Map<List<UserDto>>(users.ToList());

            foreach (UserDto user in userDtos)
            {
                if ((userLogin.Username == user.Username) && (userLogin.Password == user.Password))
                {
                    return user;
                }
            }
            return null;
        }
    }
}
