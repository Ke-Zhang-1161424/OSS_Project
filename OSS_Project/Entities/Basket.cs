using System.Collections.Generic;
using OSS_Project.Entities;

namespace OSS_Project.Entities
{
    // �����ǹ��ﳵʵ����
    public class Basket
    {
        // Ȼ��������Ҫһ�� Id ����ʶ������ﳵ
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new (); // ��ʼ��һ���յ��б�

        public void AddItem(Product product, int quantity) // ����AddItem�������������Ʒ�����ﳵ
        {
            if (Items.All(item => item.ProductId != product.Id)) //Ȼ��������ﳵ��û�������Ʒ
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity }); //�ʹ���һ���µ� BasketItem ����ӵ� Items �б���
            }

            // ������ﳵ���Ѿ��������Ʒ�ˣ����Ǿ��ҵ�������������
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity = existingItem.Quantity + quantity; // ��������ֱ�Ӱ���������ȥ��Ҳ����existingItem.Quantity += quantity��
        }

        public void RemoveItem(int productId, int quantity) // ����RemoveItem���������ӹ��ﳵ�Ƴ���Ʒ
        { 
            var item = Items.FirstOrDefault(item => item.ProductId == productId); // ���ҵ�Ҫ�Ƴ�����Ʒ
            if (item == null) return; // ���û�ҵ���ֱ�ӷ���
            item.Quantity = item.Quantity - quantity; // �������� ��Ҳ����item.Quantity -= quantity��
            if (item.Quantity == 0) Items.Remove(item); // ����������0�ˣ��Ͱ������Ʒ�ӹ��ﳵ���Ƴ�
        }
    }
}