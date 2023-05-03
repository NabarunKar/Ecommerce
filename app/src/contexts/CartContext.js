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
      let remItem = state.cart.find((p) => p._id === action.payload.id);
      if (remItem) {
        let new_total_item = state.total_item - remItem.quantity;
        let new_total_amount =
          state.total_amount - remItem.price * remItem.quantity;
        return {
          ...state,
          cart: state.cart.filter((p) => p._id !== action.payload.id),
          total_item: new_total_item,
          total_amount: new_total_amount,
        };
      }
      return state;
    case "INC":
      let incItem = state.cart.find((p) => p._id === action.payload.id);
      if (incItem) {
        return {
          ...state,
          cart: state.cart.map((p) => {
            if (p._id === action.payload.id) p.quantity += 1;
            return p;
          }),
          total_item: state.total_item + 1,
          total_amount: state.total_amount + incItem.price,
        };
      }
      return state;
    case "DEC":
      let decItem = state.cart.find((p) => p._id === action.payload.id);
      if (decItem) {
        return {
          ...state,
          cart: state.cart.map((p) => {
            if (p._id === action.payload.id) p.quantity -= 1;
            return p;
          }),
          total_item: state.total_item - 1,
          total_amount: state.total_amount - decItem.price,
        };
      }
      return state;
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

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  const incrementQuantity = (id) => {
    dispatch({ type: "INC", payload: { id } });
  };

  const decrementQuantity = (id) => {
    dispatch({ type: "DEC", payload: { id } });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
