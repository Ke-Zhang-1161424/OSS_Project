using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OSS_Project.Data;
using OSS_Project.Entities;

namespace OSS_Project.Controllers
{
    // 继承自 BaseApiController，表示这是一个 API 控制器
    public class ProductsController : BaseApiController
    {

        private readonly StoreContext _context; // StoreContext 是数据上下文类，用于与数据库交互

        // 这里可以添加产品相关的 API 方法，例如获取产品列表、添加新产品等
        public ProductsController(StoreContext context)
        {
            _context = context;
            //this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts() // async这里是为了支持异步操作，用户可以多个请求同时进行 async Task<>
        { 
            return await _context.Products.ToListAsync(); // 从数据库中获取所有产品

        }

        [HttpGet("{id}")] // 获取指定 ID 的产品
        public async Task<ActionResult<Product>> GetProduct(int id)
        { 
            return await _context.Products.FindAsync(id); // 在数据库中查找指定 ID 的产品
        }
    }
}
