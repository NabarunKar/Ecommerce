import React from "react";
import { useFilterContext } from "../contexts/FilterContext";

function Filter() {
  const { filteredProducts } = useFilterContext();
  return <div>{JSON.stringify(filteredProducts)}</div>;
}

export default Filter;
