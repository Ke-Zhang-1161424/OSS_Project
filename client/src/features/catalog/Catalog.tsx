import { useEffect, useState } from 'react';
import type { Product } from '../../app/models/product';
import ProductList from './ProductList';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';

// ������������ʾ��ƷĿ¼
export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);




    // ʹ��useEffect�����������ʱ��ȡ��Ʒ�б�������״̬������.then, .catch, .finally����Promise�ķ�������Щ�������ڴ����첽�����Ľ��
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
