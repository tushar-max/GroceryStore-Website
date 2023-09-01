using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.DAL
{
    public class GroceryAppDbContext : DbContext
    {
        public GroceryAppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> products { get; set; }

        public DbSet<CartProducts> cartProducts { get; set; }
        public DbSet<RegisterUser> registerUsers { get; set; }
        public DbSet<OrdersPlaced> ordersPlaceds { get; set; }
        public DbSet<Reviews> Reviews { get; set; }
        public DbSet<ProductReviews> productReviews { get; set; }

        public DbSet<ProductReview> productReview { get; set; }
    }
}
