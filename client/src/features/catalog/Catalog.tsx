import { useEffect, useState } from 'react';
import type { Product } from '../../app/models/product';
import ProductList from './ProductList';
import agent from '../../app/api/agent';

// ������������ʾ��ƷĿ¼
export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    // ʹ��useEffect���������ʱ��ȡ��Ʒ�б�
    useEffect(() => {
        agent.Catalog.list().then(products => setProducts(products))
    }, []);

    return <ProductList products={products} />;
}
