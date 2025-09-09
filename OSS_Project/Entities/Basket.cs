using System.Collections.Generic;
using OSS_Project.Entities;

namespace OSS_Project.Entities
{
    // 这里是购物车实体类
    public class Basket
    {
        // 然后我们需要一个 Id 来标识这个购物车
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new (); // 初始化一个空的列表

        public void AddItem(Product product, int quantity) // 这里AddItem方法用来添加商品到购物车
        {
            if (Items.All(item => item.ProductId != product.Id)) //然后如果购物车里没有这个商品
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity }); //就创建一个新的 BasketItem 并添加到 Items 列表中
            }

            // 如果购物车里已经有这个商品了，我们就找到它并增加数量
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity = existingItem.Quantity + quantity; // 这里我们直接把数量加上去（也可以existingItem.Quantity += quantity）
        }

        public void RemoveItem(int productId, int quantity) // 这里RemoveItem方法用来从购物车移除商品
        { 
            var item = Items.FirstOrDefault(item => item.ProductId == productId); // 先找到要移除的商品
            if (item == null) return; // 如果没找到就直接返回
            item.Quantity = item.Quantity - quantity; // 减少数量 （也可以item.Quantity -= quantity）
            if (item.Quantity == 0) Items.Remove(item); // 如果数量变成0了，就把这个商品从购物车里移除
        }
    }
}