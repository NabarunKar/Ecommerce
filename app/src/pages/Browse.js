import React from "react";
import Filter from "../components/Filter";
import { useProductContext } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import BackButton from "../components/BackButton";

function Browse() {
  const { isLoading, error, products } = useProductContext();
  return (
    <div>
      <BackButton />
      <Filter />
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {products && (
        <div>
          <h1>Total: {products.length}</h1>
          <ul>
            {products.map((p) => (
              <li key={p._id}>
                <ProductCard data={p}></ProductCard>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Browse;
