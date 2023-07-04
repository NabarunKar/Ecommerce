import { useProductContext } from "./ProductContext";

const { createContext, useContext, useReducer, useEffect } = require("react");

const FilterContext = createContext();

const initialState = {
  filteredProducts: null,
  allProducts: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
      };
    default:
      return state;
  }
};

export const FilterProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "INIT", payload: products || [] });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
