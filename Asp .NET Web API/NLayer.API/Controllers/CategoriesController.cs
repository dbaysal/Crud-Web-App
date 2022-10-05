using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NLayer.Core;
using NLayer.Core.DTOs;
using NLayer.Core.Services;

namespace NLayer.API.Controllers
{
    //1:default
    //2:intern
    //3:admin
    //16:employee
    //17:manager
    public class CategoriesController : CustomBaseController
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoriesController(IMapper mapper, IService<Category> service, ICategoryService productService)
        {
            _mapper = mapper;
            _categoryService = productService;
        }


        //get a category with its products
        [HttpGet("[action]")]
        public async Task<IActionResult> GetSingleCategoryByIdWithProductsAsync(int categoryId)
        {
            return CreateActionResult(await _categoryService.GetSingleCategoryByIdWithProductsAsync(categoryId));
        }


        //get a category according to its id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            var categoriesDto = _mapper.Map<CategoryDto>(category);
            return CreateActionResult(CustomResponseDto<CategoryDto>.Success(200, categoriesDto));
        }


        //get all categories
        [HttpGet]
        public async Task<IActionResult> All()
        {
            var category = await _categoryService.GetAllAsync();
            var categoryDtos = _mapper.Map<List<CategoryDto>>(category.ToList());
            return CreateActionResult(CustomResponseDto<List<CategoryDto>>.Success(200, categoryDtos));
        }

        //update a category
        [HttpPost]
        [Authorize(Roles = "3, 17")] //admin, manager
        public async Task<IActionResult> Save(CategoryDto categoryDto)
        {
            categoryDto.CreatedDate = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");
            var category = await _categoryService.AddAsync(_mapper.Map<Category>(categoryDto));
            var categoriesDto = _mapper.Map<CategoryDto>(category);


            return CreateActionResult(CustomResponseDto<CategoryDto>.Success(201, categoriesDto));
        }


    }
}
