using GroceryApp.DAL;
using GroceryApp.DAL.Migrations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroceryApp.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductFilteringController : Controller
    {
        private readonly GroceryAppDbContext _groceryAppDbContext;
        public ProductFilteringController(GroceryAppDbContext groceryAppDbContext)
        {
            _groceryAppDbContext = groceryAppDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetCategoryProduct(int categoryId)
        {
            var productList = await _groceryAppDbContext.products.Where(x => x.Category == categoryId).ToListAsync();
            return Ok(productList);
        }

        [HttpPost]

        public async Task<IActionResult> DeleteOrderedProducts()
        {
            DbSet<CartProducts> itemsToDelete = _groceryAppDbContext.Set<CartProducts>();
            itemsToDelete.RemoveRange(itemsToDelete);
            _groceryAppDbContext.SaveChanges();
            return Ok(itemsToDelete);
        }
    }
}
