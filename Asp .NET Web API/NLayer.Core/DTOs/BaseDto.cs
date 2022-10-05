namespace NLayer.Core.DTOs
{
    public abstract class BaseDto
    {
        public int Id { get; set; }
        public string? CreatedDate { get; set; }
        public string? UpdatedDate { get; set; }
    }
}
