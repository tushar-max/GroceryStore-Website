using GroceryApp.BL;
using GroceryApp.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroceryApp.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly GroceryAppDbContext _groceryAppDbContext;
        private readonly ProductControllerBL _productControllerBL;

        public ProductController(GroceryAppDbContext groceryAppDbContext,ProductControllerBL productControllerBL)
        {
            _groceryAppDbContext = groceryAppDbContext;
            _productControllerBL = productControllerBL;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var productsList = await _productControllerBL.GetAllProductsBL();
            return Ok(productsList);
        }
        [HttpPost]

        public async Task<IActionResult> AddProduct([FromBody] Product productRequest)
        {
            productRequest.Id = Guid.NewGuid();
            await _groceryAppDbContext.products.AddAsync(productRequest);
            await _groceryAppDbContext.SaveChangesAsync();
            return Ok(productRequest);
        }
    }
}
