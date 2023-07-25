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
    price: {
      max: 0,
      min: 0,
    },
  },
  maxPrice: 0,
  minPrice: 0,
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

// Find the max price
const getMaxPrice = (data) => {
  return Math.ceil(Math.max(...data.map((ele) => ele.price)));
};

// Find the min price
const getMinPrice = (data) => {
  return Math.floor(Math.min(...data.map((ele) => ele.price)));
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      let maxPriceValue = getMaxPrice(action.payload);
      let minPriceValue = getMinPrice(action.payload);
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
        filter: {
          categories: getUniqueDataFromArray(action.payload, "categories"),
          brands: getUniqueData(action.payload, "brand"),
          price: {
            max: maxPriceValue,
            min: minPriceValue,
          },
        },
        maxPrice: maxPriceValue,
        minPrice: minPriceValue,
      };
    case "SORT_OPTION":
      return {
        ...state,
        sortOption: action.payload,
      };
    case "SORT":
      console.log(state.sortOption);
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
      console.log("filter applied");
      return {
        ...state,
        filteredProducts: state.allProducts.filter(
          (ele) =>
            state.filter.brands[ele.brand] &&
            ele.categories.some((cat) => state.filter.categories[cat]) &&
            ele.price >= state.filter.price.min &&
            ele.price <= state.filter.price.max
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
    case "SET_ONE_CATEGORY":
      let newOneCategoryFilter = state.filter;
      Object.keys(state.filter.categories).forEach((ele) => {
        newOneCategoryFilter.categories[ele] = 0;
      });
      newOneCategoryFilter.categories[action.payload] = 1;
      return {
        ...state,
        filter: newOneCategoryFilter,
      };
    case "SET_BRAND_VALUE":
      let newBrandFilter = state.filter;
      newBrandFilter.brands[action.payload.brand] = action.payload.value;
      return {
        ...state,
        filter: newBrandFilter,
      };
    case "TOGGLE_ALL":
      let newFilter = state.filter;
      Object.keys(state.filter[action.payload.property]).forEach((ele) => {
        console.log(ele, newFilter[action.payload.property][ele]);
        newFilter[action.payload.property][ele] = action.payload.value;
      });
      return {
        ...state,
        filter: newFilter,
      };
    case "SET_PRICE_RANGE":
      let [minValue, maxValue] = action.payload;
      return {
        ...state,
        filter: {
          ...state.filter,
          price: {
            max: maxValue,
            min: minValue,
          },
        },
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
    dispatch({ type: "APPLY_FILTER" });
  };

  const setBrandValue = (value) => {
    dispatch({ type: "SET_BRAND_VALUE", payload: value });
    dispatch({ type: "APPLY_FILTER" });
  };

  const toggleAll = (value) => {
    dispatch({ type: "TOGGLE_ALL", payload: value });
    dispatch({ type: "APPLY_FILTER" });
  };

  const setPriceRange = (value) => {
    dispatch({ type: "SET_PRICE_RANGE", payload: value });
    dispatch({ type: "APPLY_FILTER" });
  };

  const showByCategory = (value) => {
    dispatch({ type: "INIT", payload: products || [] });
    dispatch({ type: "SET_ONE_CATEGORY", payload: value });
    dispatch({ type: "APPLY_FILTER" });
  };

  useEffect(() => {
    dispatch({ type: "INIT", payload: products || [] });
  }, [products]);

  useEffect(() => {
    dispatch({ type: "SORT", payload: state.sortOption });
  }, [state.sortOption]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        sort,
        setSearchValue,
        setCategoryValue,
        setBrandValue,
        toggleAll,
        setPriceRange,
        showByCategory,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
