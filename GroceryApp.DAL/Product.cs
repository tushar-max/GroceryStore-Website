using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.DAL
{
    public class Product
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }

        public string Image { get; set; }

        public int Category { get; set; }
        public int Discount { get; set; }
    }
}
