namespace OSS_Project.Entities
{
    public class Product
    {
        // 这是一个产品实体类，包含了产品的基本信息，如果出现黄色下划线不是错误，.NET 项目开启了 Nullable 检查
        // 提醒我这些 string 可能为 null，如果不想看见可以在 API.csproj 改成 <Nullable>disable>

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public long Price { get; set; }

        public string ImageUrl { get; set; }

        public string Type { get; set; }

        public string Brand { get; set; }

        public int QuantityInStock { get; set; }

    }
}
