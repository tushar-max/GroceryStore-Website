using GroceryApp.BL;
using GroceryApp.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace GroceryApp.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlacedOrderController : Controller
    {
        private readonly GroceryAppDbContext _groceryAppDbContext;
        private readonly ProductControllerBL _productController;

        public PlacedOrderController(GroceryAppDbContext groceryAppDbContext,ProductControllerBL productControllerBL)
        {
            _groceryAppDbContext = groceryAppDbContext;
            _productController = productControllerBL;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders(string email)
        {
            var orders = await _productController.GetOrdersBL(email);
            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> PushPlacedOrders([FromBody] OrdersPlaced ordersPlaced)
        {
            ordersPlaced.DateTime = DateTime.Today.ToString("MMM dd,yyyy");
            await _groceryAppDbContext.ordersPlaceds.AddAsync(ordersPlaced);
            await _groceryAppDbContext.SaveChangesAsync();
            return Ok(ordersPlaced);
        }
    }
}
