using GroceryApp.BL;
using GroceryApp.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroceryApp.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        private readonly ProductControllerBL _productController;
        private readonly GroceryAppDbContext _groceryAppDbContext;
        public CartController(GroceryAppDbContext groceryAppDbContext,ProductControllerBL productControllerBL)
        {
            _groceryAppDbContext= groceryAppDbContext;
            _productController= productControllerBL;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCartItems()
        {
            var productsList = _productController.GetAllCartItemsBL();
            return Ok(productsList);
        }
        [HttpPost]
        public async Task<IActionResult> ManageCartItems([FromBody] CartProductQty cartProductQty)
        {
            var product = _productController.GetCartProductsBL(cartProductQty.Id);
            CartProducts cart = new CartProducts();
            cart.Id = cartProductQty.Id;
            cart.ProductName = product.ProductName;
            cart.Image = product.Image;
            cart.Category = product.Category;
            cart.Price = product.Price;
            cart.Description = product.Description;
            cart.Discount = product.Discount;
            cart.Count = cartProductQty.Count;
            await _groceryAppDbContext.cartProducts.AddAsync(cart);
            await _groceryAppDbContext.SaveChangesAsync();
            return Ok(cart);
        }
    }
}
