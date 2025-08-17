//import { Fragment } from 'react';
import type { Product } from '../../app/models/product';
import { Button } from '@mui/material';
import ProductList from './ProductList';


// 这里定义了一个 Props 接口，用于指定组件的属性类型
interface Props {
    products: Product[];
    addProduct: () => void;
}


// 这里是一个简单的 React 函数组件，接收产品列表和添加产品的函数作为属性，并渲染产品列表和添加按钮
export default function Catalog({products,addProduct}: Props) {
    return (
        <>
            <ProductList products={ products } />
            <Button variant = 'contained' onClick={addProduct}>Add product</Button>
        </>
    )
}