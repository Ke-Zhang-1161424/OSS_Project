import { useEffect, useState } from 'react';
import type { Product } from '../../app/models/product';
import ProductList from './ProductList';
import agent from '../../app/api/agent';

// 这个组件负责显示产品目录
export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    // 使用useEffect在组件挂载时获取产品列表
    useEffect(() => {
        agent.Catalog.list().then(products => setProducts(products))
    }, []);

    return <ProductList products={products} />;
}
