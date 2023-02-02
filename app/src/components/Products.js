import React, { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([{}]);
  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [products]);
  return (
    <div>
      <h1>Total: {products.length}</h1>
      <ul>
        {products.map((p, id) => (
          <li key={id}>
            <h2>{p.title}</h2>
            <h3>Price: ${p.price}</h3>
            <img src={p.thumbnail} alt="" />
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
