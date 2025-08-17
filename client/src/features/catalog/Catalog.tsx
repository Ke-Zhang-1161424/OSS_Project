//import { Fragment } from 'react';
import type { Product } from '../../app/models/product';
import { Button } from '@mui/material';
import ProductList from './ProductList';


// ���ﶨ����һ�� Props �ӿڣ�����ָ���������������
interface Props {
    products: Product[];
    addProduct: () => void;
}


// ������һ���򵥵� React ������������ղ�Ʒ�б����Ӳ�Ʒ�ĺ�����Ϊ���ԣ�����Ⱦ��Ʒ�б����Ӱ�ť
export default function Catalog({products,addProduct}: Props) {
    return (
        <>
            <ProductList products={ products } />
            <Button variant = 'contained' onClick={addProduct}>Add product</Button>
        </>
    )
}