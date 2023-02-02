import React, { useState, useEffect } from "react";
import Products from "../components/Products";
import Slider from "../components/Slider";

function Home() {
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
      <Slider />
      <Products products={products} />
    </div>
  );
}

export default Home;
