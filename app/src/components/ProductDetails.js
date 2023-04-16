import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UseFetch from "../hooks/useFetch";
import { useCartContext } from "../contexts/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [data, isPending, error] = UseFetch(`/api/products/${id}`);

  const [quantity, setQuantity] = useState(1);

  const { addToCart, cart, removeFromCart } = useCartContext();

  const decreaseQuantity = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const increaseQuantity = (stock) => {
    quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock);
  };

  const checkItemIfExistsInCart = (id) => {
    if (cart.find((p) => p._id === id)) return true;
    return false;
  };

  return (
    <div>
      <Link to="/">
        <button>Back</button>
      </Link>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <div>
          {data.stock > 0 && !checkItemIfExistsInCart(data._id) && (
            <>
              <button
                disabled={quantity == 1}
                onClick={() => decreaseQuantity()}
              >
                -
              </button>
              {quantity}
              <button
                disabled={quantity == data.stock}
                onClick={() => increaseQuantity(data.stock)}
              >
                +
              </button>
              <br />
              <button
                onClick={() => {
                  addToCart(quantity, data);
                }}
              >
                Add to cart
              </button>
            </>
          )}
          {checkItemIfExistsInCart(data._id) && (
            <button
              onClick={() => {
                removeFromCart(data);
              }}
            >
              Remove from cart
            </button>
          )}
          <br />
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
