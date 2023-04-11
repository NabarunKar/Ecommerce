import React from "react";
import { Link, useParams } from "react-router-dom";
import UseFetch from "../hooks/useFetch";

function ProductDetails() {
  const { id } = useParams();
  const [data, isPending, error] = UseFetch(`/api/products/${id}`);
  return (
    <div>
      <Link to="/">
        <button>Back</button>
      </Link>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <div>
          <img src={data.thumbnail} alt="" />
          <h1>{data.title}</h1>
          <h3>Price: ${data.price}</h3>
          {data.stock > 0 ? <button>Buy</button> : <h2>Out of stock</h2>}
          <p>{data.description}</p>
          {data.images.map((e, id) => (
            <li key={id}>
              <img src={e} alt="" />
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
