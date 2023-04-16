import React, { useEffect } from "react";
import { useCartContext } from "../contexts/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart, total_item, total_amount } =
    useCartContext();

  return (
    cart.length > 0 && (
      <div>
        <h1>Total {total_item} items in cart</h1>
        <button
          onClick={() => {
            clearCart();
          }}
        >
          Clear all
        </button>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((p) => (
              <tr key={p._id}>
                <td>
                  <img src={p.thumbnail} alt="" height="50px" />
                </td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>
                  <button>-</button>
                  {p.quantity}
                  <button>+</button>
                </td>
                <td>{p.quantity * p.price}</td>
                <td>
                  <button
                    onClick={() => {
                      removeFromCart(p);
                    }}
                  >
                    Remove
                  </button>
                </td>
                <td>
                  <button>Buy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <h1>
          Total amount : {total_amount} <button>Buy all</button>
        </h1>
      </div>
    )
  );
}

export default Cart;
