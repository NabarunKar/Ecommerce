import React from "react";
import { useCartContext } from "../contexts/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    total_item,
    total_amount,
    incrementQuantity,
    decrementQuantity,
  } = useCartContext();

  return (
    <>
      {cart.length == 0 && <h1>Your cart is empty!</h1>}
      {cart.length > 0 && (
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
            <tbody>
              {cart.map((ele) => (
                <tr key={ele.cartItemId}>
                  <td>
                    <img src={ele.thumbnail} alt="" height="50px" />
                  </td>
                  <td>{ele.title}</td>
                  <td>{ele.price}</td>
                  {ele.color && <td>{ele.color}</td>}
                  {ele.size && <td>{ele.size}</td>}
                  <td>
                    <button
                      disabled={ele.quantity == 1}
                      onClick={() => {
                        decrementQuantity(ele.cartItemId);
                      }}
                    >
                      -
                    </button>
                    {ele.quantity}
                    <button
                      disabled={ele.quantity == ele.stock}
                      onClick={() => {
                        incrementQuantity(ele.cartItemId);
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>{ele.quantity * ele.price}</td>
                  <td>
                    <button
                      onClick={() => {
                        removeFromCart(ele.cartItemId);
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
      )}
    </>
  );
}

export default Cart;
