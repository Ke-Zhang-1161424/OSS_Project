//import { Fragment } from 'react';
import type { Product } from '../../app/models/product';
import ProductList from './ProductList';
import { useEffect, useState } from 'react';





// ������һ���򵥵� React ������������ղ�Ʒ�б����Ӳ�Ʒ�ĺ�����Ϊ���ԣ�����Ⱦ��Ʒ�б����Ӱ�ť
export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);



    // useEffect �� React ��һ�� Hook�������������Ⱦ��ִ�и����ò��������ﴫ��������ʾֻ���������ʱִ��һ��
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data)) // ����ȡ�����������õ�״̬��
    }, []);  // []һ��Ҫ�У���Ȼ�ᵼ������ѭ��


    return (
        <>
            <ProductList products={ products } />
        </>
    )
}