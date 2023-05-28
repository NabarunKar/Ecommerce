import React from "react";
import Products from "../components/Products";
import Filter from "../components/Filter";
import UseFetch from "../hooks/useFetch";

function Browse() {
  const [data, isPending, error] = UseFetch("/api/products");
  return (
    <div>
      <Filter />
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <Products products={data} />}
    </div>
  );
}

export default Browse;