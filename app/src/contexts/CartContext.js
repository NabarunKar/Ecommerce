import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  total_item: 0,
  total_amount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { quantity, data } = action.payload;
      console.log(data);
      return {
        ...state,
        cart: [...state.cart, { ...data, quantity }],
        total_item: state.total_item + quantity,
        total_amount: state.total_amount + data.price * quantity,
      };
    case "REMOVE":
      let new_total_item = state.total_item - action.payload.quantity;
      let new_total_amount =
        state.total_amount - action.payload.price * action.payload.quantity;
      return {
        ...state,
        cart: state.cart.filter((p) => p._id !== action.payload._id),
        total_item: new_total_item < 0 ? 0 : new_total_item,
        total_amount: new_total_amount < 0 ? 0 : new_total_amount,
      };
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (quantity, data) => {
    dispatch({ type: "ADD_TO_CART", payload: { quantity, data } });
  };

  const removeFromCart = (data) => {
    dispatch({ type: "REMOVE", payload: data });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
