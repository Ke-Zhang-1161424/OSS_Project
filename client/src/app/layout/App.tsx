import React, { useEffect, useState } from 'react';
import type { Product } from '../models/product';
import Catalog from '../../features/catalog/Catalog'; // 新增导入
import { Typography } from '@mui/material';


// 这是一个简单的 React 应用程序，使用 TypeScript 和 React Hooks
// useState 是 React 的一个 Hook，用于在函数组件中添加状态
function App() {
    const [products, setProducts] = useState<Product[]>([]);



    // useEffect 是 React 的一个 Hook，用于在组件渲染后执行副作用操作，这里传入空数组表示只在组件挂载时执行一次
    useEffect(() => {              
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data)) // 将获取到的数据设置到状态中
    }, []);  // []一定要有，不然会导致无限循环



    function addProduct() {
        setProducts(prevState => [...products, // ...是展开运算符，用于将现有数组的元素展开到新数组中
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
