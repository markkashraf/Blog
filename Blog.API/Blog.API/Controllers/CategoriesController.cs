using System.ComponentModel;
using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    // https://localhost:xxxx/api/categories
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }


        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
        {
            // Map DTO to Domain Model
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            await categoryRepository.CreateAsync(category);

            // Domain model to DTO
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
        }

        // GET: https://localhost:7226/api/Categories
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            IEnumerable<Category> categories = await categoryRepository.GetAllAsync();
            List<CategoryDto> response = new List<CategoryDto>();


            foreach(var c in categories)
            {
                response.Add(c.ConvertToDTO());
            }

            return Ok(response);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(Guid id)
        {  
            var ans = await categoryRepository.GetById(id);

            if (ans == null) return NotFound();

         return Ok(ans);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoryById(UpdateCategoryRequestDto request)
        {
            var category = await categoryRepository.UpdateById(request.ToCategory());
            if(category==null)
            {
                return NotFound();
            }
            else
            {
             return  Ok(category.ConvertToDTO());
            }
        }
    }
}
