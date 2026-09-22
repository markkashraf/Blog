using CodePulse.API.Models.Domain;

namespace CodePulse.API.Models.DTO
{
    public class UpdateCategoryRequestDto
    {
        public Guid id {get; set;}
        public string Name { get; set; }
        public string UrlHandle { get; set; }



        public Category ToCategory()
        {
            return new Category{Id = this.id, Name = this.Name, UrlHandle = this.UrlHandle};
        }
    }
}
