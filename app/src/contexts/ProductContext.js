const { createContext, useContext, useEffect, useReducer } = require("react");

const initialState = {
  isLoading: false,
  error: false,
  products: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...initialState, isLoading: true };
    case "LOAD_FAILED":
      return { ...initialState, error: action.payload };
    case "LOAD_SUCCESS":
      return { ...initialState, products: action.payload };
    default:
      return state;
  }
};

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const url = "/api/products";

  const getProducts = (url) => {
    dispatch({ type: "LOADING" });

    fetch(`${process.env.REACT_APP_PROXY}${url}`)
      .then((res) => {
        if (!res.ok) {
          // useReducer -> set error
          dispatch({
            type: "LOAD_FAILED",
            payload: `Load failed from url ${url}`,
          });
        }
        return res.json();
      })
      .then((data) => {
        // useReducer -> set data
        dispatch({ type: "LOAD_SUCCESS", payload: data });
      });
  };

  useEffect(() => {
    getProducts(url);
  }, []);

  return (
    <ProductContext.Provider value={{ ...state }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductProvider, ProductContext, useProductContext };
