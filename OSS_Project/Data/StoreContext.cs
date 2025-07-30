using Microsoft.EntityFrameworkCore;
using OSS_Project.Entities;

namespace OSS_Project.Data
{
    public class StoreContext : DbContext
    {
        // 这是一个数据上下文类，继承自 DbContext，用于与数据库交互
        // 这里配置完要去appsettings.Development.json添加连接字符串
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
