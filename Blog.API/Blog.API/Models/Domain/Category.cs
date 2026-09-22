using CodePulse.API.Models.DTO;

namespace CodePulse.API.Models.Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string UrlHandle { get; set; }


        public CategoryDto ConvertToDTO()
        {
            CategoryDto categoryDto = new()
            {
                Name = this.Name,
                UrlHandle = this.UrlHandle,
                Id = Id

            };
            return categoryDto;

        }
    }
}
