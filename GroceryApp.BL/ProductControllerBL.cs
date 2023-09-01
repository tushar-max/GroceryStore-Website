using GroceryApp.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.BL
{
    public class ProductControllerBL
    {
        private readonly GroceryAppDbContext _groceryAppDbContext;

        public ProductControllerBL(GroceryAppDbContext context)
        {
            _groceryAppDbContext = context;
        }

        public List<CartProducts> GetAllCartItemsBL()
        {
            return _groceryAppDbContext.cartProducts.ToList();
        }

        public Product GetCartProductsBL(string id)
        {
            return _groceryAppDbContext.products.Where(x => x.Id.ToString() == id).FirstOrDefault();
        }
        public async Task<List<OrdersPlaced>> GetOrdersBL(string email)
        {
            return await _groceryAppDbContext.ordersPlaceds.Where(x => x.email == email).ToListAsync();
        }
        public async Task<Product> EditRecordBL(Product product)
        {
            var data = await _groceryAppDbContext.products.SingleOrDefaultAsync(x => x.Id.ToString() == product.Id.ToString());
            data.ProductName = product.ProductName;
            data.Description = product.Description;
            data.Price = product.Price;
            data.Image = product.Image;
            _groceryAppDbContext.Update(data);
            await _groceryAppDbContext.SaveChangesAsync();
            return data;
        }
        public async Task<Product> DeleteRecordBL(string id)
        {
            var data = await _groceryAppDbContext.products.SingleOrDefaultAsync(x => x.Id.ToString() == id);
            _groceryAppDbContext.products.Remove(data);
            await _groceryAppDbContext.SaveChangesAsync();
            return data;
        }
        public async Task<List<Product>> GetAllProductsBL()
        {
            var productsList = await _groceryAppDbContext.products.ToListAsync();
            return productsList;
        }
        public async Task<List<Product>> GetCategoryProductBL(int categoryId)
        {
            var productList = await _groceryAppDbContext.products.Where(x => x.Category == categoryId).ToListAsync();
            return productList;
        }
    }
}
