using GroceryApp.DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.BL
{
    public class AccountControllerBL
    {
        private readonly GroceryAppDbContext _groceryAppDbContext;

        public AccountControllerBL(GroceryAppDbContext groceryAppDbContext)
        {
            _groceryAppDbContext = groceryAppDbContext;
        }

        public async Task<bool> RegisterUserBL(RegisterUser registerUser)
        {
            var duplicateUsername = await _groceryAppDbContext.registerUsers.Where(x => x.Email == registerUser.Email).FirstOrDefaultAsync();
            if (duplicateUsername == null)
            {
                await _groceryAppDbContext.registerUsers.AddAsync(registerUser);
                await _groceryAppDbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<LoginStatus> LoginUserBL(Login loginUser)
        {
            var validateLogin = await _groceryAppDbContext.registerUsers.
                Where(x => x.Email == loginUser.Email && x.Password == loginUser.Password).FirstOrDefaultAsync();
            LoginStatus loginStatus = new LoginStatus();
            if (validateLogin == null)
            {
                loginStatus.UserName = "";
                loginStatus.Email = "";
                loginStatus.LoggedIn = false;
                loginStatus.IsAdmin = false;
            }
            else
            {
                loginStatus.UserName = validateLogin.UserName;
                loginStatus.Email = validateLogin.Email;
                loginStatus.LoggedIn = true;
                loginStatus.IsAdmin = validateLogin.IsAdmin;
            }
            return loginStatus;
        }
    }
}
