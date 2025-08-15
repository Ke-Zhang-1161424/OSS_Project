import React, { useEffect, useState } from 'react';
import type { Product } from '../models/product';
import Catalog from '../../features/catalog/Catalog'; // ��������
import { Typography } from '@mui/material';


// ����һ���򵥵� React Ӧ�ó���ʹ�� TypeScript �� React Hooks
// useState �� React ��һ�� Hook�������ں�����������״̬
function App() {
    const [products, setProducts] = useState<Product[]>([]);



    // useEffect �� React ��һ�� Hook�������������Ⱦ��ִ�и����ò��������ﴫ��������ʾֻ���������ʱִ��һ��
    useEffect(() => {              
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data)) // ����ȡ�����������õ�״̬��
    }, []);  // []һ��Ҫ�У���Ȼ�ᵼ������ѭ��



    function addProduct() {
        setProducts(prevState => [...products, // ...��չ������������ڽ����������Ԫ��չ������������
            {
                id: prevState.length + 101,
                name: 'product' + (prevState.length + 1),
                price: (prevState.length * 100) + 100,
                brand: 'some brand',
                description: 'some description',
                imageUrl: 'https://via.placeholder.com/150',


            }]) 
    }



  return (
    <div>
          <Typography variant = 'h1'>Re-Store</Typography>
          <Catalog products={products} addProduct={addProduct} />
    </div>
  )
}

export default App;
