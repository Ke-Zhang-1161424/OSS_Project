using OSS_Project.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace OSS_Project.Entities
{
    [Table("BasketItems") ]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }


        // navigation properties
        public int ProductId { get; set; } 
        public Product Product { get; set; }


        // Basket
        public int BasketId { get; set; }
        public Basket Basket { get; set; } = null;
    }
}