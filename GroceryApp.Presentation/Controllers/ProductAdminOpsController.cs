using GroceryApp.BL;
using GroceryApp.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroceryApp.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductAdminOpsController : Controller
    {
        private readonly GroceryAppDbContext _groceryAppDbContext;
        private readonly ProductControllerBL _productControllerBL;
        public ProductAdminOpsController(GroceryAppDbContext groceryAppDbContext, ProductControllerBL productControllerBL)
        {
            _groceryAppDbContext = groceryAppDbContext;
            _productControllerBL = productControllerBL;
        }

        [HttpGet]
        public async Task<IActionResult> DeleteRecord(string id)
        {
            var data = await _productControllerBL.DeleteRecordBL(id);
            return Ok(data);
        }

        [HttpPost]

        public async Task<IActionResult> EditRecord([FromBody] Product product)
        {
            var data = await _productControllerBL.EditRecordBL(product);
            return Ok(data);
        }
    }
}
