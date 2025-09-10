using OSS_Project.Data;
using OSS_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OSS_Project.DTOs;

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
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound(); // 如果没有找到购物车，就返回 404
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    ImageUrl = item.Product.ImageUrl,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Quantity = item.Quantity
                }).ToList()
            };
        }


        // 这里我们用 HttpPost 来添加商品到购物车
        // api/basket?productId=1&quantity=3
        [HttpPost]
        public async Task<ActionResult> AddItemToBasket([FromQuery]int productId, [FromQuery]int quantity)
        {
            // 1. get Basket
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket(); // 如果没有找到购物车，就创建一个新的购物车

            // 2. get product
            var product = await _context.Products.FindAsync(productId); // FindAsync是一个异步方法，这里我们通过productId从数据库中查找对应的产品
            if (product == null) return NotFound();

            // 3. add item
            basket.AddItem(product, quantity); // 调用购物车的AddItem方法把商品添加到购物车
            var result = await _context.SaveChangesAsync() > 0; // SaveChangesAsync是一个异步方法，这里我们把对数据库的更改保存下来，返回受影响的行数，如果大于0表示成功
            
            // 4. save changes
            if (result) return StatusCode(201); // 201表示创建成功
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" }); // 如果保存失败，就返回 400 和错误信息
        }

        // 这里我们用 HttpDelete 来从购物车移除商品
        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket([FromQuery] int productId, [FromQuery] int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound(); // 如果没有找到购物车，就返回 404
            basket.RemoveItem(productId, quantity); // 调用购物车的RemoveItem方法把商品从购物车移除
            var result = await _context.SaveChangesAsync() > 0; // SaveChangesAsync是一个异步方法，这里我们把对数据库的更改保存下来，返回受影响的行数，如果大于0表示成功
            if (result) return Ok(); // 如果保存成功，就返回 200
            return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" }); // 如果保存失败，就返回 400 和错误信息
            // remove item or reduce quantity
            // save changes
        }

        // 这个方法用来根据 buyerId 从数据库中获取购物车，RetrieveBasket是一个私有方法，用来封装获取购物车的逻辑
        private async Task<Basket> RetrieveBasket() // 这里我们通过 buyerId 来查找购物车
        {
            return await _context.Baskets // await是异步等待的意思，表示这个操作可能需要一些时间，我们不想阻塞线程
                .Include(i => i.Items) // Include用来包含相关的实体，这样我们就可以一次性加载购物车和它的商品项，i=> i.Items表示我们要包含购物车的Items属性
                .ThenInclude(p => p.Product) // ThenInclude用来包含更深层次的相关实体，这里我们包含每个商品项对应的Product实体，p => p.Product表示我们要包含BasketItem的Product属性
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]); // FirstOrDefaultAsync用来异步地获取第一个符合条件的实体，如果没有找到就返回null，x => x.BuyerId == Request.Cookies["buyerId"]表示我们要查找的购物车的BuyerId要和浏览器Cookie中的buyerId匹配
        }


        // 这个方法用来创建一个新的购物车，并把 buyerId 存储在浏览器的 Cookie 中，其中 CreateBasket 是一个私有方法，用来封装创建购物车的逻辑
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}