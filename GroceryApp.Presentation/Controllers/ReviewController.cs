using GroceryApp.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroceryApp.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : Controller
    {
        private readonly GroceryAppDbContext _groceryAppDbContext;

        public ReviewController(GroceryAppDbContext groceryAppDbContext)
        {
            _groceryAppDbContext = groceryAppDbContext;
        }
        [HttpGet]

        public async Task<IActionResult> GetReviews(string Id)
        {
            var reviewsList = await _groceryAppDbContext.productReview.Where(x=>x.Product == Id).ToListAsync();
            return Ok(reviewsList);
        }

        [HttpPost]
        public async Task<IActionResult> PostReviews([FromBody] ProductReview reviews)
        {
            await _groceryAppDbContext.productReview.AddAsync(reviews);
            await _groceryAppDbContext.SaveChangesAsync();
            return Ok(reviews);
        }
        
    }
}
