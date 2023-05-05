import React, { useState } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import UseFetch from "../hooks/useFetch";
import { useCartContext } from "../contexts/CartContext";
import Reviews from "./Reviews";
import { useAuthContext } from "../hooks/useAuthContext";
import ReviewForm from "./ReviewForm";

function Product() {
  const { id } = useParams();
  const { path, url } = useRouteMatch();

  const { user } = useAuthContext();

  const [data, isPending, error] = UseFetch(`/api/products/${id}`);
  const [reviewData, reviewIsPending, reviewDataError] = UseFetch(
    `/api/products/reviews/${id}`
  );

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
        <>
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
                  removeFromCart(data._id);
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
          <div>{user && <ReviewForm />}</div>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to={`${url}/all-reviews`}>
                    All Reviews ({reviewData && reviewData.length})
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link to={`${url}/my-reviews`}>
                      My Reviews (
                      {reviewData &&
                        user &&
                        reviewData.filter((e) => e.userId === user._id).length}
                      )
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            {/* Nested routes for reviews */}
            {reviewDataError && <div>{reviewDataError}</div>}
            {reviewIsPending && <div>Loading...</div>}
            {reviewData && (
              <Switch>
                <Route path={`${path}/all-reviews`}>
                  <Reviews data={reviewData} />
                </Route>
                <Route path={`${path}/my-reviews`}>
                  {user && (
                    <Reviews
                      data={reviewData.filter((e) => e.userId === user._id)}
                    />
                  )}
                </Route>
                <Route>
                  <Reviews data={reviewData} />
                </Route>
              </Switch>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
