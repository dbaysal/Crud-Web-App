using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NLayer.Core.Models;

namespace NLayer.Repository.Seeds
{
    internal class UserSeed : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasData(
                new User
                {
                    Id = 1,
                    Username = "dogukan1",
                    Password = "13241",
                    role = "stajyer",
                    //RoleId = {1,2,3}
                },
                new User
                {
                    Id = 2,
                    Username = "dogukan2",
                    Password = "12342",
                    role = "admin",
                    //RoleId = {1}
                }               
                );

        }
    }
}
