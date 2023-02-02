import React, { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([{}]);
  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return <div>{JSON.stringify(products)}</div>;
}

export default Products;
