namespace NLayer.Core.DTOs
{
    public class CategoryWithProductsDto : Category
    {
        public List<ProductDto> Products { get; set; }
    }
}
