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
            if (basket == null) return NotFound(); // ���û���ҵ����ﳵ���ͷ��� 404
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


        // ���������� HttpPost �������Ʒ�����ﳵ
        // api/basket?productId=1&quantity=3
        [HttpPost]
        public async Task<ActionResult> AddItemToBasket([FromQuery]int productId, [FromQuery]int quantity)
        {
            // 1. get Basket
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket(); // ���û���ҵ����ﳵ���ʹ���һ���µĹ��ﳵ

            // 2. get product
            var product = await _context.Products.FindAsync(productId); // FindAsync��һ���첽��������������ͨ��productId�����ݿ��в��Ҷ�Ӧ�Ĳ�Ʒ
            if (product == null) return NotFound();

            // 3. add item
            basket.AddItem(product, quantity); // ���ù��ﳵ��AddItem��������Ʒ��ӵ����ﳵ
            var result = await _context.SaveChangesAsync() > 0; // SaveChangesAsync��һ���첽�������������ǰѶ����ݿ�ĸ��ı���������������Ӱ����������������0��ʾ�ɹ�
            
            // 4. save changes
            if (result) return StatusCode(201); // 201��ʾ�����ɹ�
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" }); // �������ʧ�ܣ��ͷ��� 400 �ʹ�����Ϣ
        }

        // ���������� HttpDelete ���ӹ��ﳵ�Ƴ���Ʒ
        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket([FromQuery] int productId, [FromQuery] int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound(); // ���û���ҵ����ﳵ���ͷ��� 404
            basket.RemoveItem(productId, quantity); // ���ù��ﳵ��RemoveItem��������Ʒ�ӹ��ﳵ�Ƴ�
            var result = await _context.SaveChangesAsync() > 0; // SaveChangesAsync��һ���첽�������������ǰѶ����ݿ�ĸ��ı���������������Ӱ����������������0��ʾ�ɹ�
            if (result) return Ok(); // �������ɹ����ͷ��� 200
            return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" }); // �������ʧ�ܣ��ͷ��� 400 �ʹ�����Ϣ
            // remove item or reduce quantity
            // save changes
        }

        // ��������������� buyerId �����ݿ��л�ȡ���ﳵ��RetrieveBasket��һ��˽�з�����������װ��ȡ���ﳵ���߼�
        private async Task<Basket> RetrieveBasket() // ��������ͨ�� buyerId �����ҹ��ﳵ
        {
            return await _context.Baskets // await���첽�ȴ�����˼����ʾ�������������ҪһЩʱ�䣬���ǲ��������߳�
                .Include(i => i.Items) // Include����������ص�ʵ�壬�������ǾͿ���һ���Լ��ع��ﳵ��������Ʒ�i=> i.Items��ʾ����Ҫ�������ﳵ��Items����
                .ThenInclude(p => p.Product) // ThenInclude�������������ε����ʵ�壬�������ǰ���ÿ����Ʒ���Ӧ��Productʵ�壬p => p.Product��ʾ����Ҫ����BasketItem��Product����
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]); // FirstOrDefaultAsync�����첽�ػ�ȡ��һ������������ʵ�壬���û���ҵ��ͷ���null��x => x.BuyerId == Request.Cookies["buyerId"]��ʾ����Ҫ���ҵĹ��ﳵ��BuyerIdҪ�������Cookie�е�buyerIdƥ��
        }


        // ���������������һ���µĹ��ﳵ������ buyerId �洢��������� Cookie �У����� CreateBasket ��һ��˽�з�����������װ�������ﳵ���߼�
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