using OSS_Project.Data;
using OSS_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace OSS_Project.Entities
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]); // 这里我们简单地获取第一个购物车
            if (basket == null) return NotFound(); // 如果没有找到购物车，就返回 404
            return basket; // 如果找到了，就返回购物车
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            // 1. get Basket
            // create basket
            // 2. get product
            // 3. add item
            // 4. save changes
            return StausCode(201);
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
        {
            // get basket
            // remove item or reduce quantity
            // save changes

            return Ok();
        }
    }
}