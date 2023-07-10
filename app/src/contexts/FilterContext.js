import { useProductContext } from "./ProductContext";

const { createContext, useContext, useReducer, useEffect } = require("react");

const FilterContext = createContext();

const initialState = {
  filteredProducts: null,
  allProducts: null,
  sortOption: "asc",
  searchValue: "",
  filter: {
    categories: {},
    brands: {},
  },
};

// For brands
const getUniqueData = (data, property) => {
  let values = data.map((ele) => ele[property]);
  let obj = {};
  [...new Set(values)].forEach((ele) => (obj[ele] = true));
  return obj;
};

// For category
const getUniqueDataFromArray = (data, property) => {
  let values = data.reduce((acc, ele) => [...acc, ...ele[property]], []);
  let obj = {};
  [...new Set(values)].forEach((ele) => (obj[ele] = true));
  return obj;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
        filter: {
          categories: getUniqueDataFromArray(action.payload, "categories"),
          brands: getUniqueData(action.payload, "brand"),
        },
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
    case "APPLY_FILTER":
      return {
        ...state,
        filteredProducts: state.allProducts.filter(
          (ele) =>
            state.filter.brands[ele.brand] &&
            ele.categories.some((cat) => state.filter.categories[cat])
        ),
      };
    case "SET_CATEGORY_VALUE":
      let newCategoryFilter = state.filter;
      newCategoryFilter.categories[action.payload.category] =
        action.payload.value;
      return {
        ...state,
        filter: newCategoryFilter,
      };
    case "SET_BRAND_VALUE":
      let newBrandFilter = state.filter;
      newBrandFilter.brands[action.payload.brand] = action.payload.value;
      return {
        ...state,
        filter: newBrandFilter,
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

  const setCategoryValue = (value) => {
    dispatch({ type: "SET_CATEGORY_VALUE", payload: value });
  };

  const setBrandValue = (value) => {
    dispatch({ type: "SET_BRAND_VALUE", payload: value });
  };

  useEffect(() => {
    dispatch({ type: "INIT", payload: products || [] });
  }, [products]);

  useEffect(() => {
    dispatch({ type: "SORT", payload: state.sortOption });
  }, [state.sortOption]);

  useEffect(() => {
    dispatch({ type: "APPLY_FILTER" });
  }, [
    Object.values(state.filter.categories),
    Object.values(state.filter.brands),
  ]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        sort,
        setSearchValue,
        setCategoryValue,
        setBrandValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
