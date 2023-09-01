using GroceryApp.DAL;
using GroceryApp.BL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroceryApp.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly AccountControllerBL _accountControllerBL = null;
        private readonly GroceryAppDbContext _groceryAppDbContext;
        public AccountController(GroceryAppDbContext groceryAppDbContext,AccountControllerBL accountControllerBL)
        {
            _groceryAppDbContext = groceryAppDbContext;
            _accountControllerBL = accountControllerBL;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUser registerUser)
        {
            /*
            var duplicateUsername = _accountControllerBL.RegisterUserBL(registerUser);
            if (duplicateUsername == null)
            {
                await _groceryAppDbContext.registerUsers.AddAsync(registerUser);
                await _groceryAppDbContext.SaveChangesAsync();
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
            */
            bool res = await _accountControllerBL.RegisterUserBL(registerUser);
            return Ok(res);
        }
    }
}
