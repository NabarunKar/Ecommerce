import React from "react";
import Products from "../components/Products";
import Filter from "../components/Filter";
import UseFetch from "../hooks/useFetch";

function Home() {
  const [products, isPending, error] = UseFetch("/products");
  return (
    <div>
      <Filter />
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {products && <Products products={products} />}
    </div>
  );
}

export default Home;
