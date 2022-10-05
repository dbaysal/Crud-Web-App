using FluentValidation;
using NLayer.Core.DTOs;

namespace NLayer.Service.Validation
{
    public class CategoryDtoValidator : AbstractValidator<CategoryDto>
    {
        public CategoryDtoValidator()
        {
            RuleFor(x => x.Name).NotNull().WithMessage("{PropertyName} is required");

        }

    }
}
