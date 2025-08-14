import React, { useState } from 'react';


// ����һ���򵥵� React Ӧ�ó���ʹ�� TypeScript �� React Hooks
function App() {
    const [products, setProducts] = useState([  // useState �� React ��һ�� Hook�������ں�����������״̬
        { name: 'product1', price: 100.00 },
        { name: 'product2', price: 200.00 },
    ]);

    function addProduct() {
        setProducts(prevState => [...products,
        { name: 'product' + (prevState.length + 1), price: (prevState.length * 100) + 100 }]) // ...��չ������������ڽ����������Ԫ��չ������������
    }

  return (
    <div>
          <h1 style={{ color: 'red' }}>Re-Store</h1>
          <ul>
              {products.map((item,index) => (
                  <li key={index}>{item.name}-{ item.price}</li> 
              ))}
          </ul>
          <button onClick={addProduct}>Add product</button>
    </div>
  )
}

export default App
