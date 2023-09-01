using GroceryApp.BL;
using GroceryApp.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GroceryApp.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly GroceryAppDbContext _groceryAppDbContext;
        private readonly AccountControllerBL _accountControllerBL = null;

        public LoginController(GroceryAppDbContext groceryAppDbContext,AccountControllerBL accountControllerBL)
        {
            _groceryAppDbContext = groceryAppDbContext;
            _accountControllerBL = accountControllerBL;
        }

        [HttpPost]

        public async Task<IActionResult> LoginUser([FromBody] Login loginUser)
        {
            LoginStatus loginStatus = await _accountControllerBL.LoginUserBL(loginUser);
            /*
            if (validateLogin != null)
            {
                loginStatus.UserName = validateLogin.UserName;
                loginStatus.Email = validateLogin.Email;
                loginStatus.LoggedIn = "true";
                loginStatus.IsAdmin = validateLogin.IsAdmin.ToString();
            }


            string key = "pma_secret_2019_2020pma_secret_2019_2020";
            string duration = "60";
            var symmetrickey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials=new SigningCredentials(symmetrickey,SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("userName",loginStatus.UserName),
                new Claim("email",loginStatus.Email),
                new Claim("loggedIn",loginStatus.LoggedIn),
                new Claim("isAdmin", loginStatus.IsAdmin)
            };

            var jwtToken = new JwtSecurityToken(
                issuer: "localhost",
                audience: "localhost",
                claims: claims,
                expires: DateTime.Now.AddMinutes(Int32.Parse(duration)),
                signingCredentials: credentials);
            var token= new JwtSecurityTokenHandler().WriteToken(jwtToken);
            if (token=="")
            {
                token = "invalid";
            }
            return Ok(token);
            */

            return Ok(loginStatus);
        }
    }
}
