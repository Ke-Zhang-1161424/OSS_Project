using Microsoft.EntityFrameworkCore;
using OSS_Project.Entities;

namespace OSS_Project.Data
{
    // 这个类是我们的数据库上下文类，负责和数据库进行交互
    public class StoreContext : DbContext
    {
        // 其实DbContext是Entity Framework Core提供的一个类，我们通过继承它来创建自己的数据库上下文，
        // 我们通过构造函数传入DbContextOptions，这样我们就可以配置数据库连接字符串等信息
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        // 然后这里我们定义了两个 DbSet 属性，分别对应我们的实体类 Product 和 Basket
        public DbSet<Product> Products { get; set; }

        // DbSet 就相当于数据库中的一张表，我们可以通过它来查询和保存实体
        public DbSet<Basket> Baskets { get; set; }

        public DbSet<BasketItem> BasketItems { get; set; }
    }
}
