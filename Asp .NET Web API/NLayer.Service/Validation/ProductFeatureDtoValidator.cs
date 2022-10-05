using FluentValidation;
using NLayer.Core.DTOs;

namespace NLayer.Service.Validation
{
    public class ProductFeatureDtoValidator : AbstractValidator<ProductFeatureDto>
    {
        public ProductFeatureDtoValidator()
        {
            RuleFor(x => x.Color).NotNull().WithMessage("{PropertyName} is required").MinimumLength(20).WithMessage("{PropertyName} can't be longer than 50 characters");
            RuleFor(x => x.Height).NotEmpty().WithMessage("{PropertyName} is required").InclusiveBetween(1, int.MaxValue).WithMessage("{PropertyName} must be greater than zero");
            RuleFor(x => x.Width).NotEmpty().WithMessage("{PropertyName} is required").InclusiveBetween(1, int.MaxValue).WithMessage("{PropertyName} must be greater than zero");
            RuleFor(x => x.ProductId).NotEmpty().WithMessage("{PropertyName} is required").InclusiveBetween(1, int.MaxValue).WithMessage("{PropertyName} must be greater than zero");
        }
    }
}
