using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext dbContext;

        public CategoryRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Category> CreateAsync(Category category)
        {
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();

            return category;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await dbContext.Categories.ToListAsync();
        }

        public async Task<Category?> GetById(Guid id)
        {

            Category? ans = dbContext.Categories.Find(id);
            return ans;
        }

        public async Task<Category?> UpdateById(Category category)
        {
            Category? result = dbContext.Categories.Find(category.Id);
            if(result == null) return null;
            else
            {
                result.Name = category.Name;
                result.UrlHandle = category.UrlHandle;
                await dbContext.SaveChangesAsync();
            }
            return result;
        }
    }
}
