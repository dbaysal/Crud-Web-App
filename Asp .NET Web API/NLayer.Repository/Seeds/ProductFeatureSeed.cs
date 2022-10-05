using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NLayer.Core;

namespace NLayer.Repository.Seeds
{
    internal class ProductFeatureSeed : IEntityTypeConfiguration<ProductFeature>
    {
        public void Configure(EntityTypeBuilder<ProductFeature> builder)
        {
            builder.HasData(
               new ProductFeature
               {
                   Id = 1,
                   Color = "Kırmızı",
                   Height = 100,
                   Width = 200,
                   ProductId = 1
               },
               new ProductFeature
               {
                   Id = 2,
                   Color = "Mavi",
                   Height = 150,
                   Width = 300,
                   ProductId = 1
               },
               new ProductFeature
               {
                   Id = 3,
                   Color = "Mor",
                   Height = 100,
                   Width = 200,
                   ProductId = 2
               });
        }
    }
}
