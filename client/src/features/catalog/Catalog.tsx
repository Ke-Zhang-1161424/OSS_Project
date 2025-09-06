import { useEffect, useState } from 'react';
import type { Product } from '../../app/models/product';
import ProductList from './ProductList';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';

// 这个组件负责显示产品目录
export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);




    // 使用useEffect来在组件挂载时获取产品列表，并更新状态，比如.then, .catch, .finally都是Promise的方法，这些方法用于处理异步操作的结果
    useEffect(() => {
        agent.Catalog.list()
            .then(products => setProducts(products))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingComponent message='Loading Products...'/>

    return (
        <>
            <ProductList products={products} />;
        </>
    )
}
