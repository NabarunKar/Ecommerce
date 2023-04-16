import React, { useEffect } from "react";
import { useCartContext } from "../contexts/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCartContext();

  return (
    <div>
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
            <th>Action</th>
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
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
