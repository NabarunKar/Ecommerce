import React from "react";

function ProductItem(props) {
  const data = props.data;
  return <div>{JSON.stringify(data)}</div>;
}

export default ProductItem;
