import { useProductContext } from "./ProductContext";

const { createContext, useContext, useReducer, useEffect } = require("react");

const FilterContext = createContext();

const initialState = {
  filteredProducts: null,
  allProducts: null,
  sortOption: "asc",
  searchValue: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
      };
    case "SORT_OPTION":
      return {
        ...state,
        sortOption: action.payload,
      };
    case "SORT":
      let sortedProducts = [...state.filteredProducts];
      switch (action.payload) {
        case "asc":
          sortedProducts = sortedProducts.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          break;
        case "desc":
          sortedProducts = sortedProducts.sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          break;
        case "pAsc":
          sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case "pDesc":
          sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
          break;

        case "tDesc":
          sortedProducts = sortedProducts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
      }
      return {
        ...state,
        filteredProducts: sortedProducts,
      };
    case "SET_SEARCH_VALUE":
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return state;
  }
};

export const FilterProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // Sort products function
  const sort = (value) => {
    dispatch({ type: "SORT_OPTION", payload: value });
  };

  const setSearchValue = (value) => {
    dispatch({ type: "SET_SEARCH_VALUE", payload: value });
  };

  useEffect(() => {
    dispatch({ type: "INIT", payload: products || [] });
  }, [products]);

  useEffect(() => {
    dispatch({ type: "SORT", payload: state.sortOption });
  }, [state.sortOption]);

  return (
    <FilterContext.Provider value={{ ...state, sort, setSearchValue }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
