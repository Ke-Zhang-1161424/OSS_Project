//import { Fragment } from 'react';
import type { Product } from '../../app/models/product';
import ProductList from './ProductList';
import { useEffect, useState } from 'react';





// 这里是一个简单的 React 函数组件，接收产品列表和添加产品的函数作为属性，并渲染产品列表和添加按钮
export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);



    // useEffect 是 React 的一个 Hook，用于在组件渲染后执行副作用操作，这里传入空数组表示只在组件挂载时执行一次
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data)) // 将获取到的数据设置到状态中
    }, []);  // []一定要有，不然会导致无限循环


    return (
        <>
            <ProductList products={ products } />
        </>
    )
}