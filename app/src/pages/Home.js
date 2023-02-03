import React from "react";
import Products from "../components/Products";
import Filter from "../components/Filter";
import UseFetch from "../hooks/useFetch";

function Home() {
  const [data, isPending, error] = UseFetch("/products");
  return (
    <div>
      <Filter />
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <Products products={data} />}
    </div>
  );
}

export default Home;
