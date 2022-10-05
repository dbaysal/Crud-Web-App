using Microsoft.EntityFrameworkCore;
using NLayer.Core;
using NLayer.Core.Models;
using NLayer.Core.Repositories;

namespace NLayer.Repository.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<int> GetCategoryId(int id)
        {
            var product = await _dbSet.FindAsync(id);
            return product.CategoryId;

        }

        public async Task<List<Product>> GetProductsWithCategory()
        {
            return await _context.Products.Include(x => x.Category).ToListAsync();
        }
        
    }
}
