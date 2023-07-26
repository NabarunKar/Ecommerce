import { createContext, useContext, useEffect, useReducer } from "react";
import { usePost } from "../hooks/usePost";

const CartContext = createContext();

const initialState = {
  cart: [],
  total_item: 0,
  total_amount: 0,
  open: false,
};

const cartReducer = (state, action) => {
  /**
   * cart item format
   * {
   *  cartItemId: productId + color + size,
   *  productId: 2r79hf297918fh,
   *  title: LG 258MPQ 24 Inch Monitor
   *  thumbnail: "http://image.png"
   *  price: 44.45,
   *  quantity: 3,
   *  color: #fff,
   *  size: XL
   * }
   */
  switch (action.type) {
    case "ADD_TO_CART":
      let data = action.payload;
      let cartItemId =
        (data.productId || "") + (data.color || "") + (data.size || "");

      // handle if cart element already exists
      let item = state.cart.find((ele) => ele.cartItemId === cartItemId);
      if (item) {
        item.quantity += data.quantity;
        return {
          ...state,
          cart: state.cart.map((ele) => {
            if (ele.cartItemId === cartItemId) {
              return item;
            }
            return ele;
          }),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...data, cartItemId: cartItemId }],
      };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((ele) => ele.cartItemId !== action.payload.id),
      };
    case "INC":
      return {
        ...state,
        cart: state.cart.map((ele) => {
          if (ele.cartItemId === action.payload.id) ele.quantity += 1;
          return ele;
        }),
      };

    case "DEC":
      return {
        ...state,
        cart: state.cart.map((ele) => {
          if (ele.cartItemId === action.payload.id) ele.quantity -= 1;
          return ele;
        }),
      };

    case "SYNC":
      return {
        ...state,
        total_amount: state.cart.reduce(
          (acc, ele) => acc + ele.quantity * ele.price,
          0
        ),
        total_item: state.cart.reduce((acc, ele) => acc + ele.quantity, 0),
      };
    case "CLEAR_ALL":
      return { ...initialState, open: true };
    case "OPEN":
      return {
        ...state,
        open: true,
      };
    case "CLOSE":
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    JSON.parse(localStorage.getItem("cart")) || initialState
  );

  const addToCart = (data) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...data } });
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

  const openCart = () => {
    dispatch({ type: "OPEN" });
    console.log("cart opened");
    console.log(state.open);
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE" });
    console.log("cart closed");
    console.log(state.open);
  };

  const [post, isCheckoutPending, checkoutError] = usePost(
    "/api/stripe/create-checkout-session"
  );

  const handleCheckout = async (userId, token, items) => {
    const checkoutData = {
      userId: userId,
      items: items,
    };

    window.location.href = (await post(checkoutData, token)).url;
  };

  useEffect(() => {
    dispatch({ type: "SYNC" });

    // localStorage save cart here
    localStorage.setItem("cart", JSON.stringify({ ...state, open: false }));

    console.log("cart updated");

    console.log(state.total_amount);
    console.log(state.total_item);
    console.table(state.cart);
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
        openCart,
        closeCart,
        handleCheckout,
        isCheckoutPending,
        checkoutError,
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
