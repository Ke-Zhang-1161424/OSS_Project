import React, { useState } from 'react';


// 这是一个简单的 React 应用程序，使用 TypeScript 和 React Hooks
function App() {
    const [products, setProducts] = useState([  // useState 是 React 的一个 Hook，用于在函数组件中添加状态
        { name: 'product1', price: 100.00 },
        { name: 'product2', price: 200.00 },
    ]);

    function addProduct() {
        setProducts(prevState => [...products,
        { name: 'product' + (prevState.length + 1), price: (prevState.length * 100) + 100 }]) // ...是展开运算符，用于将现有数组的元素展开到新数组中
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
