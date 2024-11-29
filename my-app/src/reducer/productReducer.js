const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    // Start of async requests
    case 'FETCH_PRODUCTS_REQUEST':
    case 'CREATE_PRODUCT_REQUEST':
    case 'UPDATE_PRODUCT_REQUEST':
    case 'DELETE_PRODUCT_REQUEST':
    case 'FILTER_PRODUCTS_CATEGORY_REQUEST':
    case 'GET_PRODUCT_BY_ID_REQUEST':
      return { ...state, loading: true, error: null };

    // Handling failures
    case 'FETCH_PRODUCTS_FAILURE':
    case 'CREATE_PRODUCT_FAILURE':
    case 'UPDATE_PRODUCT_FAILURE':
    case 'DELETE_PRODUCT_FAILURE':
    case 'FILTER_PRODUCTS_CATEGORY_FAILURE':
    case 'GET_PRODUCT_BY_ID_FAILURE':
      return { ...state, loading: false, error: action.payload };

    // Handling success responses
    case 'FETCH_PRODUCTS_SUCCESS':
    case 'FILTER_PRODUCTS_CATEGORY_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: null };

    case 'CREATE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
        error: null,
      };

    case 'UPDATE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        error: null,
      };

    case 'DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        products: state.products.filter((product) => product.id !== action.payload),
        error: null,
      };

    case 'GET_PRODUCT_BY_ID_SUCCESS':
      return {
        ...state,
        loading: false,
        currentProduct: action.payload,
        error: null,
      };

    // Default state (no action match)
    default:
      return state;
  }
};

export default ProductReducer;
