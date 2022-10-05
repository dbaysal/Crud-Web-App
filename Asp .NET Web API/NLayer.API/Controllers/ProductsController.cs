using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NLayer.Core;
using NLayer.Core.DTOs;
using NLayer.Core.Models;
using NLayer.Core.Services;
using System.Security.Claims;

namespace NLayer.API.Controllers
{
    //1:default
    //2:intern
    //3:admin
    //16:employee
    //17:manager

    public class ProductsController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IProductService _service;
        private readonly ICategoryService _categoryService;

        public ProductsController(IMapper mapper, IService<Product> service, IProductService productService, ICategoryService categoryService)
        {
            _mapper = mapper;
            _service = productService;
            _categoryService = categoryService;
        }


        //get products with their specific category
        [HttpGet("[action]")]
        public async Task<IActionResult> GetProductWithCategory()
        {
            return CreateActionResult(await _service.GetProductsWithCategory());

        }

        //get category id of a specific product
        [HttpGet("[action]")]
        public async Task<IActionResult> GetCategoryId(int id)
        {
            var categoryId = await _service.GetCategoryId(id);
            return CreateActionResult(CustomResponseDto<int>.Success(200, categoryId));
        }

        //get all products

        [HttpGet]
        public async Task<IActionResult> All()
        {

            var products = await _service.GetAllAsync();

            var productsDtos = _mapper.Map<List<ProductDto>>(products.ToList());
            return CreateActionResult(CustomResponseDto<List<ProductDto>>.Success(200, productsDtos));
        }

        //[ServiceFilter(typeof(NotFoundFilter<Product>))]


        //get product by its id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _service.GetByIdAsync(id);
            var productsDto = _mapper.Map<ProductDto>(product);

            return CreateActionResult(CustomResponseDto<ProductDto>.Success(200, productsDto));
        }

        //add a product
        [HttpPost]
        [Authorize(Roles = "3, 16, 17")] //admin, employee, manager
        public async Task<IActionResult> Save(ProductDto productDto)
        {
            var currentUser = GetCurrentUser();
            //try to get the category that user wants to set
            var category = await _categoryService.GetByIdAsync(productDto.CategoryId);

            //if there is no category with that id send error
            if (category == null)
            {
                return CreateActionResult(CustomResponseDto<ProductDto>.Fail(404, "Category Id does not exist"));
            }


            productDto.CreatedDate = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");


            var product = await _service.AddAsync(_mapper.Map<Product>(productDto));

            var productsDto = _mapper.Map<ProductDto>(product);


            return CreateActionResult(CustomResponseDto<ProductDto>.Success(201, productsDto));
        }


        //update product
        [HttpPut]
        [Authorize(Roles = "3, 16, 17")] //admin, employee, manager
        public async Task<IActionResult> Update(ProductDto productDto)
        {
            var currentUser = GetCurrentUser();

            productDto.UpdatedDate = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");
            await _service.UpdateAsync(_mapper.Map<Product>(productDto));
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(204));
        }

        //delete product
        [HttpDelete("{id}")]
        [Authorize(Roles = "3, 17")] //admin, manager
        public async Task<IActionResult> Remove(int id)
        {
            var currentUser = GetCurrentUser();
            var product = await _service.GetByIdAsync(id);
            await _service.RemoveAsync(product);

            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(204));
        }


        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                return new User
                {
                    Username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier).Value,
                };
            }

            return null;
        }


    }
}
