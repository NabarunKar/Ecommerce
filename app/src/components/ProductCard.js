import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
  let data = props.data;
  return (
    <div>
      <Link to={`/products/${data._id}`}>
        <h2>{data.title}</h2>
      </Link>
      <h3>Price: ${data.price}</h3>
      <img src={data.thumbnail} alt="" />
    </div>
  );
}

export default ProductCard;
