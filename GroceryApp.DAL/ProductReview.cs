using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.DAL
{
    public class ProductReview
    {
        public int Id { get; set; }
        public string Product { get; set; }
        public string ProductName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
