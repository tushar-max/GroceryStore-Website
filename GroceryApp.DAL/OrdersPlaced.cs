using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryApp.DAL
{
    public class OrdersPlaced
    {
        public int Id { get; set; }
        public string email {  get; set; }
        public string name { get; set; }
        public int count { get; set; }
        public string DateTime { get; set; }
        public string image { get; set; }
    }
}
