using GroceryApp.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroceryApp.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductDetailController : Controller
    {
        private readonly GroceryAppDbContext _groceryAppDbContext;

        public ProductDetailController(GroceryAppDbContext groceryAppDbContext)
        {
            _groceryAppDbContext = groceryAppDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetProduct(string productId)
        {
            var product = await _groceryAppDbContext.products.Where(x => x.Id.ToString() == productId).FirstOrDefaultAsync();
            return Ok(product);
        }
    }
}
