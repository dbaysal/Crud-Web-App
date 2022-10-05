using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NLayer.Core.DTOs;
using NLayer.Core.Models;
using NLayer.Core.Services;
using NLayer.Service.Services;

namespace NLayer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : CustomBaseController
    {

        private readonly IMapper _mapper;
        private readonly IService<Role> _service;

        public RoleController(IMapper mapper,IService<Role> service)
        {
            _mapper = mapper;
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoleById(int id)
        {
            var role =  await _service.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Role>.Success(200, role));
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {

            var roles = await _service.GetAllAsync();
            var rolesDto = _mapper.Map<List<RoleDto>>(roles.ToList());
            return CreateActionResult(CustomResponseDto<List<RoleDto>>.Success(200, rolesDto));
        }
    }
}
