import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  total_item: "",
  total_amount: "",
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { quantity, data } = action.payload;
      console.log(data);
      return {
        ...state,
        cart: [...state.cart, { ...data, quantity }],
      };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((p) => p._id !== action.payload._id),
      };
    case "CLEAR_ALL":
      return {
        ...state,
        cart: [],
      };
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
