using NLayer.Core.DTOs;

namespace NLayer.Core.Services
{
    public interface IProductService : IService<Product>
    {
        Task<CustomResponseDto<List<ProductWithCategoryDto>>> GetProductsWithCategory();
        Task<int> GetCategoryId(int id);

    }
}
