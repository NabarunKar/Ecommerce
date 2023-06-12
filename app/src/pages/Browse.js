import React from "react";
import Products from "../components/Products";
import Filter from "../components/Filter";
import { useProductContext } from "../contexts/ProductContext";

function Browse() {
  const { isLoading, error, products } = useProductContext();
  return (
    <div>
      <Filter />
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {products && <Products products={products} />}
    </div>
  );
}

export default Browse;
