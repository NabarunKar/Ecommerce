import React from "react";
import { Link } from "react-router-dom";

function Products(props) {
  let products = props.products;
  return (
    <div>
      <h1>Total: {products.length}</h1>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <Link to={`/products/${p._id}`}>
              <h2>{p.title}</h2>
            </Link>
            <h3>Price: ${p.price}</h3>
            <img src={p.thumbnail} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
